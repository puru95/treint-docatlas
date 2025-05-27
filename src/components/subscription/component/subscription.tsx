import React, { useState } from 'react';
import GreenTick from '../../../assets/greenTick.svg';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { MdCancel } from "react-icons/md";
import SubscriptionView from '../../info/views/subscription-view';
import { getCheckSubscription } from '../../../utils/auth.utils';
import { useSubscriptionState } from '../../context/subscriptionProvider';
interface SubscriptionProps {
    // Define your component props here
}
const list = [
    'All-in-One Search: Get instant answers on meds, tests, and treatments—fast and easy!',
    'Smart AI, Smarter Care: Let AI find the perfect solution, cutting your search time in half.',
    'Always Up-to-Date: Stay ahead with the latest in medical treatments and breakthroughs.'
]

const Subscription: React.FC<SubscriptionProps> = () => {
    const navigate = useNavigate();
    const { isSubscribed, freeTrialDate } = useSubscriptionState();

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleBackNavigation = () => {
        navigate(ROUTES.HOME);
    };

    const handleWhatYouGet = () => {
        setIsPopupOpen(true); // Open the popup
    };

    const closePopup = () => {
        setIsPopupOpen(false); // Close the popup
    };

    const checkSubscription = getCheckSubscription();

    return (
        <div className='relative md:mt-11 max-w-[1024px] h-[98vh]'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 px-5 justify-center md:px-4 my-auto'>
                <div className='md:hidden flex items-center justify-between gap-5 mb-2 '>
                    <div className='flex gap-2'>
                        <div className="md:hidden">
                            {(
                                !checkSubscription && <div className="">
                                    <span onClick={handleBackNavigation} className=" cursor-pointer">
                                        <IoChevronBack size={25} />
                                    </span>
                                </div>
                            )}
                        </div>
                        <p className='text-base font-semibold'>Plans</p>
                    </div>
                    <div className='border border-white rounded-[5px] px-2 py-1'>
                        <p className=' text-[10px] font-semibold' onClick={handleWhatYouGet}>What you get</p>
                    </div>
                </div>
                <div className='col-span-2  text-xs mx-auto'>
                    {
                        !isSubscribed && parseInt(freeTrialDate) <= 0 &&
                        <div className='bg-red-400 inline-block px-5 py-2 rounded-md text-center font-medium'>
                            Your subscription has ended. Please subscribe to continue using DocAtlas.
                        </div>
                    }
                </div>

                <div className='hidden md:block bg-[#1F222E] p-10 rounded-[14px]'>
                    <span className='text-[58px] font-extrabold'>Doc</span><span className='text-[58px] font-extrabold text-[#00A3FF]'>Atlas</span>
                    <p className='text-[22px] font-bold'>Make Confident Decisions, Deliver Faster Care</p>
                    <p className='opacity-60 text-base mt-2'>Access a comprehensive database of medical information with DocAtlas. From medications to lab tests and diseases, our extensive repository supports informed decision-making and improves clinical outcomes.</p>
                    <div>
                        {list.map((item, index) => (
                            <div key={index} className='flex gap-2 mt-4'>
                                <img
                                    loading="lazy"
                                    src={GreenTick}
                                    className=" overflow-hidden cursor-pointer"
                                    alt='Brain DocMarine'
                                />
                                <p className='opacity-60 text-sm'>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='md:bg-[#1F222E] rounded-[14px] md:py-10 md:px-6'>
                    <SubscriptionView />
                </div>
                {isPopupOpen && (
                    <div
                        className={`fixed inset-0 z-50 bg-[#1D252DE5] flex items-end h-[100vh] justify-center overflow-scroll transition-transform duration-300 ${isPopupOpen ? 'translate-y-0' : 'translate-y-full'
                            }`}
                        onClick={closePopup} // Close when clicking outside
                    >
                        <div
                            className="bg-[#10131F] w-full h-[280px] rounded-t-[20px] p-5 shadow-lg"
                            onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing when clicking inside
                        >
                            <div className="flex items-center w-full">
                                <MdCancel onClick={closePopup} size={25} />
                                <div className='flex justify-center w-full'>
                                    <p className="text-base font-bold mr-3">What you get</p>
                                </div>
                            </div>
                            <div className="mt-4 border-b border-[#1F222E]"></div>
                            <div>
                                {list.map((item, index) => (
                                    <div key={index} className='flex items-start gap-2 mt-4'>
                                        <img
                                            loading="lazy"
                                            src={GreenTick}
                                            className="w-[15px] h-[15px] overflow-hidden cursor-pointer"
                                            alt='Brain DocMarine'
                                        />
                                        <p className=' text-xs leading-5'>{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Subscription;
