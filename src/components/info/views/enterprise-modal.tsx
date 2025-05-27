import React, { useState } from 'react';
import { MdCancel } from 'react-icons/md';
import InputField from '../../common/inputField';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { postEnterprise } from '../../services/subscription.services';
import { getUserIdFromCookie } from '../../../utils/auth.utils';
import { ToastContainer, toast } from 'react-toastify';

interface EnterpriseModalProps {
    // Define the props for the component here
    onClose: () => void;
}

const EnterpriseModal: React.FC<EnterpriseModalProps> = ({ onClose }) => {
    // Implement the component logic here
    const navigate = useNavigate();
    const userId = getUserIdFromCookie();
    const [values, setValues] = useState<any>({
        name: '',
        mobile_number: '',
        email: '',
        description: '',
    })
    const isFormIncomplete = Object.values(values).some(value => !value);

    const handleSubmit = async () => {
        const submitData = {
            title: 'ENTERPRISE_PLAN',
            descrption: `${values?.name}\n${values?.mobile_number}\n${values?.email}\n${values?.description}`,
            user_entity_id: userId,
            user_entity_type: 'MEDIASSIST_USER',
            category: 'MEDIASSIST',
            sub_category: 'ENTERPRISE_PLAN_QUERY'
        }
        const response = postEnterprise(submitData).then((response: any) => {
            toast('Successfully submitted', { type: 'success' });
            setTimeout(() => {
                navigate(ROUTES.SUBSCRIPTION);
            }, 1000);
            onClose();

        }).catch((err: Error) => {
            toast('Something went wrong', { type: 'error' });
        });
    }

    return (
        <div className='h-[85vh] md:h-full'>
            <div className='hidden md:flex items-center justify-between'>
                <p className='text-[22px] font-extrabold'>Enterprise Plan</p>
                <MdCancel size={25} onClick={onClose} className='cursor-pointer' />
            </div>
            <div>
                <p className='text-sm font-semibold mt-6'>A member of our team will be in touch soon.</p>
            </div>
            <div className=' mt-6 w-full'>
                <label className='text-sm font-semibold'>Name</label>
                <InputField
                    label="Name"
                    value={values?.name}
                    placeholder="Name"
                    onChange={(e) => {
                        setValues({ ...values, name: e.target.value })
                    }}
                    className='text-xs mt-2 md:w-[320px]'
                    inputClassName="px-4 bg-[#1F222E] rounded-[10px] h-[45px] w-full"
                />
            </div>
            <div className='md:flex items-center gap-5'>
                <div className=' mt-6 w-full'>
                    <label className='text-sm font-semibold'>Mobile Number</label>
                    <InputField
                        label="Mobile Number"
                        value={values?.mobile_number}
                        placeholder="Mobile Number"
                        onChange={(e) => {
                            let inputValue = e.target.value;
                            // Format input as per the desired pattern
                            inputValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
                            inputValue = inputValue.slice(0, 10); // Ensure maximum length
                            setValues({ ...values, mobile_number: inputValue })
                        }}
                        className='text-xs mt-2 md:w-[320px]'
                        inputClassName="px-4 bg-[#1F222E] rounded-[10px] h-[45px] w-full"
                    />
                </div>
                <div className=' mt-6 w-full'>
                    <label className='text-sm font-semibold'>Email Id</label>
                    <InputField
                        label="Email Id"
                        value={values?.email}
                        placeholder="Email Id"
                        onChange={(e) => {
                            setValues({ ...values, email: e.target.value })
                        }}
                        className='text-xs mt-2 md:w-[320px]'
                        inputClassName="px-4 bg-[#1F222E] rounded-[10px] h-[45px] w-full"
                    />
                </div>
            </div>

            <div className=' mt-6 md:w-full'>
                <label className='text-sm font-semibold'>Description</label>
                <InputField
                    label="Description"
                    value={values?.description}
                    placeholder="Description"
                    onChange={(e) => {
                        setValues({ ...values, description: e.target.value })
                    }}
                    className='text-xs mt-2'
                    inputClassName="px-4 bg-[#1F222E] rounded-[10px] h-[45px] w-full"
                />
            </div>
            <div className='absolute bottom-0 w-[90%] md:w-full md:relative flex  items-center md:justify-end gap-5 mt-8'>
                <button className='hidden md:block h-10 w-[145px] border border-[#00A3FF]  text-[#00A3FF] text-sm font-medium px-4 py-2 rounded-lg' onClick={onClose}>Cancel</button>

                <button className={`w-full h-10 my-auto md:w-[145px] ${isFormIncomplete ? "bg-[#999999] cursor-not-allowed" : "bg-[#00A3FF]"}  text-white text-sm font-medium px-4 py-2 rounded-lg`} onClick={() => !isFormIncomplete && handleSubmit()}>Save</button>
            </div>
            <ToastContainer />
        </div >
    );
};

export default EnterpriseModal;
