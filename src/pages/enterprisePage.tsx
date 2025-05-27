import React from 'react';
import EnterpriseModal from '../components/info/views/enterprise-modal';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../components/constants';

const EnterprisePage: React.FC = () => {

    const navigate = useNavigate();

    const handleBackNavigation = () => {
        navigate(ROUTES.SUBSCRIPTION);
    }
    return (
        <div className='py-4 px-5 '>
            {/* Your content goes here */}
            <div className="flex md:hidden items-center gap-3">

                <span className=" cursor-pointer">
                    <IoChevronBack size={25} onClick={handleBackNavigation} />
                </span>
                <p className='text-base font-semibold'>Enterprise Plan</p>
            </div>
            <EnterpriseModal onClose={() => console.log('onclose')} />
        </div>
    );
};

export default EnterprisePage;
