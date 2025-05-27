import React, { useEffect, useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { BiEditAlt } from "react-icons/bi";
import { IoMdShare } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { logout } from '../../services/info.services';
import { useNavigate } from 'react-router-dom';
import { getUserIdFromCookie, removeCookies } from '../../../utils/auth.utils';
import { IMAGE_URL, ROUTES } from '../../constants';
import { getProfileData } from '../../profile/services/profile.service';
import Loader from '../../common/loader';
import defaultProfile from '../../../assets/default-profile-setting-page.svg';
import TermsAndConditionImage from '../../../assets/terms-conditions.svg';
import PrivacyPolicyImage from '../../../assets/privacy-policy.svg';
import SubscribePlan from '../../../assets/subscribe-image.svg';
import LogoutImage from '../../../assets/logout-icon.svg';
import { useUserState } from '../../context/userProvider';
import PersonalDetails from '../../../assets/personal-details-image.svg';
import { LoaderIcon } from 'react-hot-toast';
import { useSubscriptionState } from '../../context/subscriptionProvider';
import { differenceInBusinessDays, format } from 'date-fns';

interface SettingProps {
    // Define your component props here
}

const Setting: React.FC<SettingProps> = () => {
    // Implement your component logic here
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState<any>(null);
    const { contextUserData } = useUserState();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { subscriptionEndDate, isSubscribed } = useSubscriptionState();
    const isValid = contextUserData?.isSubscribed;

    const isMobileWeb = () => {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';

        // Detect if running in Flutter WebView (by checking for "Flutter" in userAgent)
        const isFlutterApp = /Flutter/.test(userAgent);

        // Detect WebViews (in-app browsers)
        const isInWebView = (window as any).webkit?.messageHandlers || /(wv|.0.0.0)/.test(userAgent);

        // If it's Flutter WebView or any other in-app WebView, return false
        if (isFlutterApp || isInWebView) {
            return false;
        }

        // Check for Android mobile browser
        if (/android/i.test(userAgent) && !isInWebView) {
            return true; // True for Android mobile browser
        }

        // Check for iOS mobile browser (Safari, Chrome, etc.)
        if (/iPhone|iPad|iPod/.test(userAgent) && !(window as any).MSStream) {
            return true; // True for iOS mobile browser
        }

        // Fallback for desktop browsers
        return true;
    };

    const handleBackNavigation = () => {
        navigate(ROUTES.HOME)
    }
    const userId = getUserIdFromCookie();
    const getUserDetails = () => {
        if (userId) {
            setIsLoading(true);
            const response = getProfileData(userId).then((response: any) => {
                setProfileData(response?.data);
            }).catch((err: Error) => {

            });
            setTimeout(() => {
                setIsLoading(false)
            }, 100)
        }
    }

    useEffect(() => {
        if (!profileData) {
            getUserDetails();
        }
    }, [userId])

    const handleLogout = () => {
        try {
            logout().then((response: any) => {
                if (response.data.status === true) {
                    removeCookies();
                    navigate('/');
                }

            }).catch((err: any) => {
                console.log("API Erro", err);
            });

        } catch (error: any) {
            console.log("Error:::", error);
        }
    }

    const handleEditProfile = () => {
        navigate(ROUTES.PROFILE, { state: { profileData } });
    }

    const handleMyPlans = () => {
        isValid ? navigate(ROUTES.MY_PLAN) : navigate(ROUTES.SUBSCRIPTION);
    }

    const sendMessageToApp = () => {
        // @ts-ignore
        WebChannel.postMessage('Share App');
    };
    const sendRateMessageToApp = () => {
        // @ts-ignore
        WebChannel.postMessage('Rate App');
    };

    const handleShare = () => {
        if (isMobileWeb()) {
            // Functionality for mobile web
            if (navigator.share) {
                navigator.share({
                    title: 'Check out our app!',
                    text: 'I found this amazing app, check it out!',
                    url: 'https://play.google.com/store/apps/details?id=com.treint_holding_inc.treint&hl=en', // Replace with your app's Play Store URL
                })
                    .then(() => console.log('App shared successfully!'))
                    .catch((error) => console.log('Error sharing app:', error));
            } else {
                // Fallback for unsupported browsers
                alert('Sharing is not supported on this browser');
            }
            console.log('Share from mobile web');
            // sendMessageToWebApp(); // Your mobile web share function
        } else {
            // Functionality for app
            sendMessageToApp(); // Your app share function
        }
    };

    const handleRate = () => {
        console.log(isMobileWeb())
        if (isMobileWeb()) {
            // Functionality for mobile web
            console.log('Rate from mobile web');
            const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.treint_holding_inc.treint&hl=en';
            window.open(playStoreUrl, '_blank');
            // sendRateMessageToWeb(); // Your mobile web rate function
        } else {
            // Functionality for app
            sendRateMessageToApp(); // Your app rate function
        }
    };
    const diff = differenceInBusinessDays(new Date(), subscriptionEndDate)

    return (
        <>
            {isLoading ?
                <div className="flex justify-center items-center h-[450px]">
                    <LoaderIcon style={{ color: '#2D53EB' }} className="text-blue-500" />
                </div> :
                <div className='relative h-full'>
                    <div className='flex items-center gap-5 px-5'>
                        <div className="md:hidden">
                            {(
                                <div className="">
                                    <span onClick={handleBackNavigation} className=" cursor-pointer">
                                        <IoChevronBack size={25} />
                                    </span>
                                </div>
                            )}
                        </div>
                        <p className='text-base font-semibold'>Settings</p>
                    </div>
                    <div className='flex justify-between items-center mt-8 px-5'>
                        <div className='flex  items-center gap-4 w-full'>
                            {profileData?.document?.doc_url ?
                                <img loading="lazy" srcSet={profileData?.document?.doc_url?.replace(IMAGE_URL.GET_URL, IMAGE_URL.UPDATE_URL)}
                                    className="w-full aspect-square max-w-[100px] border-gray-50 rounded-full object-cover" alt='department list' />
                                :
                                <img
                                    loading="lazy"
                                    src={defaultProfile}
                                    className="aspect-square overflow-hidden shrink-0 max-w-full rounded-[50%] "
                                />}


                            <div className='w-full'>
                                <p className='text-base font-extrabold'>Hi {profileData?.name ? profileData?.name : 'User'}</p>
                                <p className='text-xs font-semibold opacity-50 mt-1'>+91 {profileData?.mobileNumber}</p>
                            </div>
                        </div>
                        <BiEditAlt size={20} onClick={handleEditProfile} />
                    </div>
                    <div className='mt-6'>
                        <div className='bg-[#1F222E] rounded-[10px] p-5 text-xs font-semibold flex items-center gap-3 mt-2' onClick={handleEditProfile}>
                            <img
                                loading="lazy"
                                src={PersonalDetails}
                                className="aspect-square overflow-hidden shrink-0 "
                            />
                            <p>Personal Details</p>
                        </div>
                        <div className='bg-[#1F222E] rounded-[10px] w-full p-5 text-xs font-semibold flex items-center gap-3 mt-2' onClick={handleMyPlans}>
                            <img
                                loading="lazy"
                                src={SubscribePlan}
                                className="aspect-square overflow-hidden shrink-0"
                            />
                            <div className='w-full flex justify-between'>
                                <p>
                                    {isValid ? 'My Plans' : 'Subscribe'}
                                </p>
                                <p>
                                    {isValid && !isSubscribed && <span className='text-xs font-normal opacity-50'> {diff} days left</span>}
                                </p>
                            </div>
                        </div>
                        <div className='bg-[#1F222E] rounded-[10px] p-5 text-xs font-semibold flex items-center gap-3 mt-2' onClick={() => handleShare()}>
                            <IoMdShare size={25} />
                            <p>Share Our App</p>
                        </div>
                        <div className='bg-[#1F222E] rounded-[10px] p-5 text-xs font-semibold flex items-center gap-3 mt-2' onClick={() => handleRate()}>
                            <IoStar size={25} />
                            <p>Rate Our App</p>
                        </div>
                        <div className='bg-[#1F222E] rounded-[10px] p-5 text-xs font-semibold flex items-center gap-3 mt-2' onClick={() => navigate(ROUTES.TERMS_OF_SERVICES)}>
                            <img
                                loading="lazy"
                                src={TermsAndConditionImage}
                                className="aspect-square overflow-hidden shrink-0 "
                            />
                            <p>Terms & Conditions</p>
                        </div>
                        <div className='bg-[#1F222E] rounded-[10px] p-5 text-xs font-semibold flex items-center gap-3 mt-2' onClick={() => navigate(ROUTES.PRIVACY_POLICY)}>
                            <img
                                loading="lazy"
                                src={PrivacyPolicyImage}
                                className="aspect-square overflow-hidden shrink-0  "
                            />
                            <p>Privacy Policy</p>
                        </div>
                        <div className='bg-[#1F222E] rounded-[10px] p-5 text-xs font-semibold flex items-center gap-3 mt-2' onClick={handleLogout}>
                            <img
                                loading="lazy"
                                src={LogoutImage}
                                className="aspect-square overflow-hidden shrink-0 "
                            />
                            <p>Logout</p>
                        </div>
                    </div>
                </div>
            }
        </>

    );
};

export default Setting;
