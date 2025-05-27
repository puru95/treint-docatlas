import React from 'react';
import { MdCancel } from 'react-icons/md';

interface UpgradeConfirmationModalProps {
    // Define the props for the component here
    onClose: () => void;
    onConfirm: () => void;
}

const UpgradeConfirmationModal: React.FC<UpgradeConfirmationModalProps> = ({ onClose, onConfirm }) => {
    // Implement the component logic here

    return (
        // JSX code for the component's UI goes here
        <div className='md:h-full'>
            <div className=' flex items-center justify-between'>
                <p className='text-[16px] md:text-[20px] font-bold'>Are you sure you want to upgrade plan?</p>
            </div>
            <div className='grid grid-cols-2 gap-4 mt-6'>
                <div className='bg-blue-400 rounded-lg text-center py-2 cursor-pointer' onClick={onConfirm}>Yes</div>
                <div className='rounded-lg text-center py-2 border cursor-pointer' onClick={onClose}>No</div>
            </div>
        </div>
    );
};

export default UpgradeConfirmationModal;
