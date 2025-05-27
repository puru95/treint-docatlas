import React, { useEffect, useState } from 'react';
import { getSubscriptionModuleData, postGetStarted, postUpgradePlan, postVerifyPayment } from '../../services/subscription.services';
import { getUserIdFromCookie } from '../../../utils/auth.utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { IS_MOBILE, ROUTES, handelCycle } from '../../constants';
import { useUserState } from '../../context/userProvider';
import EnterpriseModal from './enterprise-modal';
import toast from 'react-hot-toast';
import UpgradeConfirmationModal from './upgrade-confirmation-modal';

interface SubscriptionViewProps {
    // Define your component props here
}

const SubscriptionView: React.FC<SubscriptionViewProps> = (props) => {
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [subscriptionData, setSubscriptionData] = useState<any>([]);
    const [paymentState, setPaymentState] = useState<any>("");
    const [isUpgradeModal, setIsUpgradeModal] = useState<boolean>(false);
    const [isGetStarted, setIsGetStarted] = useState<boolean>(false);

    const { contextUserData } = useUserState();
    const location = useLocation();
    const myPlans = location?.state;
    const planType = myPlans?.subscriptions_plan?.cycle ? myPlans?.subscriptions_plan?.cycle : "";
    const navigate = useNavigate();

    const userId = getUserIdFromCookie();

    const getSubscriptionModal = () => {
        const response = getSubscriptionModuleData('MEDIASSIST').then((response: any) => {
            const sortedData = response.data.search_response.sort((a: any, b: any) => a.amount - b.amount);
            setSubscriptionData(sortedData)
            setSelectedPlan(myPlans?.subscriptions_plan?.cycle === 'MONTHLY' ? response?.data?.search_response[1] : response?.data?.search_response[0])
        }).catch((err: Error) => {

        });
    }

    useEffect(() => {
        getSubscriptionModal();
    }, []);

    const handleVerifyPayment = async (res: any) => {
        const submitData = {
            razorpay_payment_id: res?.razorpay_payment_id,
            razorpay_subscription_id: res?.razorpay_subscription_id,
            razorpay_signature: res?.razorpay_signature
        }
        const response = postVerifyPayment(submitData).then((response: any) => {
            if (response?.data?.data?.payment_status === "AUTHORIZED") {
                toast.success('Payment Successfully submitted')
                IS_MOBILE ? navigate(ROUTES.HOME) : navigate(ROUTES.INFO);
            } else if (response?.data?.data?.payment_status === "INITIATED") {
                setPaymentState("Can't process payment right now. Please try again later. Any debited amount will be refunded.")
            } else if (response?.data?.data?.payment_status === "PAYMENT_FAILED") {
                setPaymentState("Payment failed. Please try again.")
            } else {
                navigate(ROUTES.MY_PLAN);
            }

        }).catch((err: Error) => {

        });
    }

    const handlePayment = async (subId: string) => {

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Replace with your Razorpay key
            name: 'Treint Business',
            description: 'Payment for DocAtlas',
            subscription_id: subId,
            handler: function (response: any) {
                handleVerifyPayment(response);
            },
            modal: {
                ondismiss: function () {
                    // alert("Payment failed or was canceled.");
                },
                backdrop: false,
            },
            prefill: {
                name: contextUserData?.name,
                contact: contextUserData?.mobileNumber,
            },
        };
        window.scrollTo(0, 0);

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response: any) {
            // Payment failed scenario (more detailed than modal.ondismiss)
            console.log({ response })
        });
        rzp1.open();
        setIsGetStarted(false);
    };

    const handleGetStarted = async () => {
        if (!isGetStarted) {
            setIsGetStarted(true);
            if (myPlans) {
                setIsUpgradeModal(true);
                setIsGetStarted(false);
            } else {

                const submitData = {
                    entity_type: 'MEDIASSIST_USER',
                    entity_id: userId,
                    plan_id: selectedPlan?.id
                }
                const response = postGetStarted(submitData).then((response: any) => {
                    if (response?.data?.data?.gateway_subscription_id) {
                        handlePayment(response?.data?.data?.gateway_subscription_id);
                    }
                }).catch((err: Error) => {
                    setIsGetStarted(false);
                });
            }
        }
    }

    const handleUpgradeConfirmation = () => {
        const submitData = {
            plan_id: selectedPlan?.id,
            gateway_id: 1
        }
        const response = postUpgradePlan(submitData, userId).then((response: any) => {
            console.log({ response })
        }).catch((err: Error) => {

        });
    }

    return (
        <div>
            <p className='text-[20px] md:text-[24px] font-bold bg-gradient-to-r from-[#33BBBA]  to-[#2D53EB] bg-clip-text text-transparent'>Choose the plan that fits your needs.</p>
            <div>
                {subscriptionData.map((item: any, index: number) => {
                    const amountDiff = item?.display_amount - item?.amount;
                    return (
                        <div
                            key={index}
                            className={`${selectedPlan?.id === item?.id ? " border-[2px] border-[#1FA2FF]" : "border border-[#545454]"} px-3 py-1 md:px-4 md:py-1 rounded-[14px] mt-4 cursor-pointer`}
                            onClick={() => myPlans?.subscriptions_plan?.cycle !== item?.cycle && setSelectedPlan(item)}
                        >
                            <div className='relative bg-transparent'>
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <span className='text-[22px] md:text-[34px] font-bold'>₹{item?.amount}</span>

                                        {amountDiff > 0 && <span className='text-[14px] md:text-[24px] font-medium text-[#506D85] line-through ml-1'>₹{item?.display_amount}</span>}
                                        <span className='text-[14px] md:text-[16px] font-medium ml-1'>/ {handelCycle(item?.cycle)}</span>
                                    </div>
                                    <div>
                                        {amountDiff > 0 && <span className='ml-1 text-[#09B285] text-xs md:text-base font-medium'>{` ₹${item?.display_amount - item?.amount} Saved`}</span>}
                                    </div>
                                    <div>
                                        {planType === item?.cycle && <span className='ml-1 text-[#00A3FF] text-xs md:text-base font-medium'>Current Plan</span>}
                                    </div>
                                </div>
                                <p className='text-xs md:text-[14px] font-medium opacity-60 mb-2'>{item.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div
                className={`${selectedPlan?.id === "ENTERPRISE" ? " border-[2px] border-[#1FA2FF]" : "border border-[#545454]"} px-3 py-1 md:px-4 md:py-1 rounded-[14px] mt-4 cursor-pointer`}
                onClick={() => IS_MOBILE ? navigate(ROUTES.ENTERPRISE) : setSelectedPlan({ id: 'ENTERPRISE' })}
            >
                <div className='relative bg-transparent'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <span className='text-[20px] md:text-[24px] font-bold'>Enterprise Plan</span>
                        </div>
                        <div>
                            {<span className='ml-1 text-[#00A3FF] text-xs md:text-base font-medium'>Contact Us</span>}
                        </div>
                    </div>
                    <p className='text-xs mt-2 md:text-[14px] font-medium opacity-60 mb-2'>Tailored solutions for corporate and educational institutions.</p>
                </div>
            </div>
            {subscriptionData?.length > 0 &&
                <div className={`bg-[#00A3FF] mt-4 rounded-[10px] text-center text-white py-4 md:py-2 ${isGetStarted ? "" : "cursor-pointer"}`} onClick={handleGetStarted}>
                    <p className='text-[16px] md:text-[20px] font-bold'>{myPlans ? "Upgrade Plan" : "Get Started"}</p>
                    {!myPlans && <p className='hidden md:block opacity-50 text-xs font-normal uppercase text-white'>{subscriptionData[0]?.free_trial_days} days free trial</p>}
                </div>
            }
            {subscriptionData?.length > 0 && !myPlans &&
                <div className='md:hidden text-center mt-2 uppercase text-[10px]'>
                    {subscriptionData[0]?.free_trial_days} days free trial
                </div>
            }
            {paymentState && <div className='text-yellow-500 text-center mt-4'>{paymentState}</div>}
            {
                selectedPlan?.id === 'ENTERPRISE' ?
                    IS_MOBILE ?
                        <EnterpriseModal onClose={() => setSelectedPlan(subscriptionData?.length > 0 ? subscriptionData[0] : null)} />
                        :
                        <div className="fixed flex-wrap inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-start  z-10 overflow-scroll">
                            <div className="flex flex-col max-w-[720px] gap-4 p-6 rounded-xl bg-black mt-20">
                                <EnterpriseModal onClose={() => setSelectedPlan(subscriptionData?.length > 0 ? subscriptionData[0] : null)} />
                            </div>
                        </div>
                    :
                    null
            }
            {isUpgradeModal && <div className="fixed flex-wrap inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-start  z-10 overflow-scroll">
                <div className="flex flex-col max-w-[720px] border border-gray-500 gap-4 p-6 rounded-xl bg-black mt-20 px-4">
                    <UpgradeConfirmationModal onClose={() => setIsUpgradeModal(false)} onConfirm={handleUpgradeConfirmation} />
                </div>
            </div>}
        </div>
    );
};

export default SubscriptionView;
