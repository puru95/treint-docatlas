import React, { useEffect, useState } from 'react';
import { IMAGE_URL, MOBILE_VIEW_TABS } from '../constants';
import Info from '../info/info';
import { useNavigate } from 'react-router-dom';
import GlobalSearchDropdown from '../info/views/globalDropdown';
import DefaultProfile from '../../assets/default-profile.svg';
import { debounce } from '../common/debounce';
import { fetchGlobalSearch } from '../info/utils/utils';
import { MdCancel } from 'react-icons/md';
import SubscriptionView from '../info/views/subscription-view';
import { FiClock } from "react-icons/fi";
import { useUserState } from '../context/userProvider';
import { useSubscriptionState } from '../context/subscriptionProvider';
import { format } from "date-fns";

interface Props {
    // Define your component's props here
}

const Home: React.FC<Props> = () => {
    const [searchInput, setSearchInput] = useState<string | undefined>('');
    const [dropdownOptions, setDropdownOptions] = useState<any>([]);
    const { freeTrialDate, isSubscribed, expiryDate } = useSubscriptionState();
    const [isPopupOpen, setIsPopupOpen] = useState(freeTrialDate && !isSubscribed ? true : false);
    const navigate = useNavigate();
    const handleClickTab = (id: string) => {
        navigate('/info', { state: { mobile_tab: id } })
    }

    const { contextUserData } = useUserState();

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
        switch (selectedItem?.type) {
            case 'SALT':
                navigate('/info', { state: { mobile_tab: selectedItem?.type, searchFromId: true, searchLabOrRadiologyById: false, passedId: selectedItem?.id } });
                break;
            case 'LAB':
            case 'RADIOLOGY':
            case 'MEDICAL_PROCEDURE':
                navigate('/info', { state: { mobile_tab: selectedItem?.type, searchFromId: false, searchLabOrRadiologyById: true, passedId: selectedItem?.id } });
                break;
            default:
                navigate('/info', { state: { mobile_tab: selectedItem?.type, searchFromId: false, searchLabOrRadiologyById: false, passedId: selectedItem?.id } });
                break;
        }
        // handleClick({ tab: selectedItem?.type, id: selectedItem?.id, searchFromId: selectedItem?.type === 'SALT' ? true : false, searchLabOrRadiologyById: selectedItem?.type === 'LAB' || selectedItem?.type === 'RADIOLOGY' ? true : false });
    }

    const closePopup = () => {
        setIsPopupOpen(false);
    };
    return (
        <>
            <div className='mt-4 px-6'>
                <div className='flex gap-4 justify-between items-center'>
                    <div className='w-full'>
                        <GlobalSearchDropdown
                            items={dropdownOptions}
                            placeholder={"Search DocAtlas"}
                            onChange={(value) => handleListItemClick(value)}
                            onSelect={(selectedItem) => handleSelectedItem(selectedItem)}
                            subName="name" // or whatever property you want to display from the items
                            disabled={false} // or true if you want to disable the input
                            className={` text-white text-sm font-semibold px-2 py-2 bg-[#1F222E] w-full h-[52px] rounded-[10px]`} // custom styles for the wrapper
                            inputClassName=" bg-[#1F222E]" // custom styles for the input
                            dropdownClassName="bg-gray-800 text-white" // custom styles for the dropdown
                            searchIconColor="white" // color of the search icon
                            setSearchInput={setSearchInput}
                            searchInput={searchInput}
                        />
                    </div>
                    {contextUserData?.document?.doc_url ?
                        <img loading="lazy" srcSet={contextUserData?.document?.doc_url?.replace(IMAGE_URL.GET_URL, IMAGE_URL.UPDATE_URL)}
                            className="w-full aspect-square max-w-[40px] border-gray-50 rounded-full object-cover" alt='department list' onClick={() => navigate('/setting')}
                        />
                        : <img
                            loading="lazy"
                            src={DefaultProfile}
                            className=" min-w-[40px] min-h-[40px] overflow-hidden cursor-pointer"
                            alt='Brain DocMarine'
                            onClick={() => navigate('/setting')}
                        />}
                </div>
                <div className='grid grid-cols-2 gap-3 mt-10'>

                    {MOBILE_VIEW_TABS.map((tab, index) => (
                        <div key={index} className='bg-[#1F222E] rounded-[10px] p-3 cursor-pointer' onClick={() => handleClickTab(tab?.id)}>
                            <div className=''>
                                {tab.icon}
                            </div>
                            <div className='mt-3'>
                                <h2 className='text-sm font-bold'>{tab.name}</h2>
                                <p className='text-xs font-normal'>{tab.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {
                    freeTrialDate && !isSubscribed && <div className='flex items-center justify-between bg-[#1F222E] mt-4 px-3 py-4 rounded-[10px] '>
                        <div className='flex gap-3 uppercase'>
                            <FiClock />
                            <p className='text-[10px]'>{freeTrialDate} days left </p>
                        </div>
                        <p className='text-[10px] opacity-50 '>Expiring {format(expiryDate, "dd MMM yyyy")}</p>
                    </div>
                }
            </div>
            {isPopupOpen && (
                <div
                    className={`fixed inset-0 z-50 bg-[#1D252DE5] h-[100vh] flex items-end justify-center transition-transform duration-300 ${isPopupOpen ? 'translate-y-0' : 'translate-y-full'
                        }`}
                    onClick={closePopup} // Close when clicking outside
                >
                    <div
                        className="bg-[#10131F] w-full max-h-[96vh] h-auto overflow-y-auto rounded-t-[20px] p-5 shadow-lg"
                        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing when clicking inside
                    >
                        <div className="flex items-center w-full">
                            <MdCancel onClick={closePopup} size={25} />
                            <div className='flex justify-center w-full'>
                                <p className="text-base font-bold mr-3">Subscription plans</p>

                            </div>
                        </div>
                        <div className="mt-4 border-b border-[#1F222E]"></div>

                        <div className='mt-5'>
                            <SubscriptionView />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
