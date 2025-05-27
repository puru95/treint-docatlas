import { useEffect, useRef, useState } from 'react';
import BrainDocMarine from '../../../assets/Docpedia-logo.png';
import GlobalSearchDropdown from './globalDropdown';
import MenuDropdown from '../../common/menudropdown';
import { IoIosLogOut } from "react-icons/io";
import DefaultProfile from '../../../assets/default-profile.svg';
import { logout } from '../../services/info.services';
import { getUserIdFromCookie, removeCookies } from '../../../utils/auth.utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from '../../common/debounce';
import { fetchGlobalSearch } from '../utils/utils';
import { useUserState } from '../../context/userProvider';
import { IMAGE_URL, IS_MOBILE, ROUTES } from '../../constants';
import { getProfileData } from '../../profile/services/profile.service';
import { FaAngleDown } from 'react-icons/fa';
import { ReactComponent as PersonalDetailsImage } from '../../../assets/personal-details-image.svg';
import { ReactComponent as SubscribeImage } from '../../../assets/subscribe-image.svg';
import { useSubscriptionState } from '../../context/subscriptionProvider';

const Header = ({ handleClick }: any) => {
    const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
    const [dropdownOptions, setDropdownOptions] = useState<any>([]);
    const [profileData, setProfileData] = useState<any>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { contextUserData } = useUserState();
    const { freeTrialDate, subscriptionEndDate } = useSubscriptionState();
    const location = useLocation();
    const navigate = useNavigate();
    const userId = getUserIdFromCookie();
    const getUserDetails = () => {
        if (userId) {
            const response = getProfileData(userId).then((response: any) => {
                setProfileData(response?.data?.data);

            }).catch((err: Error) => {

            });
        }
    }

    useEffect(() => {
        if (!profileData) {
            getUserDetails();
        }
    }, [userId])

    const isValid = profileData?.isSubscribed;
    useEffect(() => {
        // Close the dropdown when the URL changes
        setIsDropdownOpen(false);
    }, [location]);

    const getMenuOptions = () => {
        const options = [];
        options.push({
            iconUrl: <PersonalDetailsImage />, label: 'Profile', onClick: () => handleProfile()
        });
        options.push({
            iconUrl: <SubscribeImage />, label: isValid ? "My Plan" : "Subscription", onClick: () => handleSubscription()
        });
        options.push({
            iconUrl: <IoIosLogOut size={25} />, label: 'Logout', onClick: () => handleLogout()
        });
        return options;
    };
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

    const handleProfile = () => {
        navigate(ROUTES.PROFILE, { state: { profileData } });
    }

    const handleSubscription = () => {
        isValid ? navigate(ROUTES.MY_PLAN) : navigate(ROUTES.SUBSCRIPTION);
    }

    const handleListItemClick = debounce(async (searchValue: any) => {
        if (!searchValue) { return }
        try {

            const data = await fetchGlobalSearch(searchValue);
            setDropdownOptions(data);

        } catch (error) {
            console.error(`Error fetching list :`, error);
        }
    }, 500);

    const handleSelectedItem = (selectedItem: any) => {
        const isLabOrRadiologyOrMedicalProcedure = selectedItem?.type === 'LAB' || selectedItem?.type === 'RADIOLOGY' || selectedItem?.type === 'MEDICAL_PROCEDURE' ? true : false

        // handleClick({ tab: selectedItem?.type, id: selectedItem?.id, searchFromId: selectedItem?.type === 'SALT' ? true : false, searchLabOrRadiologyById: isLabOrRadiologyOrMedicalProcedure });
        navigate(`/info?tab=${selectedItem?.type}&id=` + selectedItem?.id);
    }

    const handleLogoClick = () => {
        IS_MOBILE ? navigate(ROUTES.HOME) : navigate(ROUTES.INFO);
    }

    return (
        <div className="flex items-center justify-between gap-4 pt-6 mb-8 max-w-[1024px] mx-auto">
            <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
                <img
                    loading="lazy"
                    src={BrainDocMarine}
                    className=" w-[58px] h-[58px] overflow-hidden cursor-pointer"
                    alt='Brain DocMarine'
                />
                <div className='ml-6'>
                    <h1 className="font-extrabold text-[28px]"><span className="text-[#00A3FF]">Doc</span>Atlas</h1>
                    <p className="text-sm">Navigating the Future of Healthcare on the High Seas.</p>
                </div>

            </div>
            {parseInt(freeTrialDate) > 0 && <div className=''>
                <GlobalSearchDropdown
                    items={dropdownOptions}
                    placeholder={"Search DocAtlas"}
                    onChange={(value) => handleListItemClick(value)}
                    onSelect={(selectedItem) => handleSelectedItem(selectedItem)}
                    subName="name" // or whatever property you want to display from the items
                    disabled={false} // or true if you want to disable the input
                    className={` text-[#62646D] text-sm font-semibold px-2 py-2 w-[333px] bg-[#1F222E] h-[52px] rounded-[10px]`} // custom styles for the wrapper
                    inputClassName=" bg-[#1F222E] text-[#62646D]" // custom styles for the input
                    dropdownClassName="bg-gray-800 text-white" // custom styles for the dropdown
                    searchIconColor="white" // color of the search icon
                    setSearchInput={setSearchInput}
                    searchInput={searchInput}
                />
            </div>}

            <div className='flex gap-2 bg-[#1F222E] rounded-[10px] p-2' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div className="my-auto w-8 h-8 border  flex items-center justify-center text-white text-2xl font-bold rounded-full">
                    {profileData?.document?.doc_url ? <img loading="lazy" srcSet={profileData?.document?.doc_url?.replace(IMAGE_URL.GET_URL, IMAGE_URL.UPDATE_URL)}
                        className="w-full aspect-square max-w-[100px] border-gray-50 rounded-full object-cover" alt='department list' />
                        : <img
                            loading="lazy"
                            src={DefaultProfile}
                            className=" min-w-[40px] min-h-[40px] overflow-hidden cursor-pointer"
                            alt='Brain DocMarine'
                        />
                    }

                </div>
                <div className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
                    <span className="relative text-left flex justify-between gap-2 items-start cursor-pointer" >
                        <span className="text-xs font-semibold truncate w-32 text-white">
                            Hi {profileData?.name ? profileData?.name : 'User'}
                            <div className="mt-1 text-xs font-semibold text-gray-400 lowercase first-letter:capitalize">+91 {profileData?.mobileNumber ?? ""}</div>
                        </span>
                        <div className='flex items-start z-10 item-center'>
                            <button
                                type="button"
                                className={` justify-center  ${'inline-flex items-center'}  w-6 h-7  text-gray-500 rounded-md hover:bg-gray-700 focus:outline-none mb-auto`}
                            >
                                <FaAngleDown color='white' size={20} />
                            </button>
                            {isDropdownOpen && <MenuDropdown options={getMenuOptions()} className={"flex mt-1 items-center"} handleClick={() => setIsDropdownOpen(false)} />}
                        </div>
                    </span>
                </div>
            </div>
        </div >
    )
}

export default Header;