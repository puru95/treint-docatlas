import React, { useEffect, useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { getSubscriptionAuthorization, getSubscriptionModuleData } from '../../services/subscription.services';
import { getUserIdFromCookie } from '../../../utils/auth.utils';
import { ROUTES, handelCycle } from '../../constants';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../common/loader';

interface MyPlanProps {
    // Define your component props here
}

const MyPlan: React.FC<MyPlanProps> = (props) => {
    // Add your component logic here
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [myPlans, setMyPlans] = useState<any>([]);
    const navigate = useNavigate();
    const userId = getUserIdFromCookie();
    const [subscriptionData, setSubscriptionData] = useState<any>([]);
    let intervalId: any;

    const handleBackNavigation = () => {
        window.history.back();
    }

    const getSubscriptionModal = () => {
        const response = getSubscriptionModuleData('MEDIASSIST').then((response: any) => {
            const sortedData = response.data.search_response.sort((a: any, b: any) => a.amount - b.amount);

            setSubscriptionData(sortedData)
        }).catch((err: Error) => {

        });
    }

    useEffect(() => {
        getSubscriptionModal();
    }, []);

    const getPlans = () => {
        if (userId) {
            setIsLoading(true);
            getSubscriptionAuthorization(userId)
                .then((response: any) => {
                    const planData = response?.data?.data;
                    setMyPlans(planData);

                    const paymentStatus = planData?.subscriptions?.payment_status;
                    if (paymentStatus === 'ACTIVATED' || paymentStatus === 'COMPLETED') {
                        // Stop the polling if status is 'AUTHORIZED' or 'COMPLETED'
                        setIsLoading(false);
                        clearInterval(intervalId);
                    } else if (paymentStatus === 'PAYMENT_FAILED') {
                        // Redirect to subscription page if payment failed
                        setIsLoading(false);
                        toast.error('Payment Failed. Please try again.');
                        clearInterval(intervalId);
                        navigate(ROUTES.SUBSCRIPTION); // Redirecting to the subscription page
                    } else if (paymentStatus !== "PAYMENT_IN_PROGRESS") {
                        setIsLoading(false);
                        clearInterval(intervalId);
                        navigate(ROUTES.SUBSCRIPTION); // Redirecting to the subscription page
                    }
                })
                .catch((err: Error) => {
                    console.error('Error fetching plans:', err);
                    setIsLoading(false);
                    clearInterval(intervalId);
                    // navigate(ROUTES.SUBSCRIPTION)
                });
        }
    };

    useEffect(() => {
        getPlans();
        // Call getPlans every 5 seconds
        if (userId) {
            intervalId = setInterval(getPlans, 5000);
        }

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, [userId]);
    const filterYearly = subscriptionData.filter((item: any) => item.cycle === 'YEARLY');


    const savedAmount = () => {
        switch (myPlans?.subscriptions_plan?.cycle) {
            case 'MONTHLY':
                return filterYearly[0]?.amount - (myPlans?.subscriptions_plan?.amount * 12);
            case 'QUARTERLY':
                return filterYearly[0]?.amount - (myPlans?.subscriptions_plan?.amount * 4);
            case 'HALF_YEARLY':
                return filterYearly[0]?.amount - (myPlans?.subscriptions_plan?.amount * 2);
            case 'YEARLY':
                return 0;
        }
    }
    const onUpgradePlan = () => {
        navigate(ROUTES.SUBSCRIPTION, { state: myPlans });
    }

    return (

        <div className='w-[1024px] h-[95vh] md:h-[85vh]'>
            {isLoading ? <Loader /> :
                <>
                    <div className='flex items-center gap-5 px-5 md:mt-6'>
                        <div className="">
                            {(
                                <div className="">
                                    <span onClick={handleBackNavigation} className=" cursor-pointer">
                                        <IoChevronBack size={25} />
                                    </span>
                                </div>
                            )}
                        </div>
                        <p className='text-base md:text-[28px] font-semibold'>My Plans</p>
                    </div>
                    <div className='px-5 w-[320px]'>
                        <div className='mt-8'>
                            <p className='bg-gradient-to-r from-[#33BBBA]  to-[#2D53EB] bg-clip-text text-transparent text-[20px] font-bold'>Current Plan</p>
                        </div>
                        <div className='mt-4 border border-[#1FA2FF] rounded-[12px] p-3'>
                            <span className='text-[22px] font-bold'>₹{myPlans?.subscriptions_plan?.amount}</span><span className='text-sm font-medium'> / {handelCycle(myPlans?.subscriptions_plan?.cycle)}</span>
                        </div>
                    </div>
                    {myPlans?.subscriptions_plan?.cycle !== 'YEARLY' && <div className=' px-5 absolute bottom-20 mx-auto w-full cursor-pointer'>
                        <div
                            className="flex justify-center md:justify-start text-center mt-6 w-[320px] h-12 bg-[#00A3FF] text-sm font-semibold text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                            onClick={onUpgradePlan}
                        >
                            <div className='w-full text-center'>Upgrade</div>
                        </div>

                    </div>
                    }
                    {myPlans?.subscriptions_plan?.cycle !== 'YEARLY' && <p className='px-5 text-sm font-bold mt-2'>
                        Upgrade to the annual plan and <span className='text-[#09B285]'>save ₹{savedAmount()}.</span>
                    </p>}
                </>
            }
        </div>
    );
};

export default MyPlan;
