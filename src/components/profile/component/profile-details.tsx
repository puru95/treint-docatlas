import React, { useEffect, useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import PhotoUpload from '../../common/photoUpload';
import InputField from '../../common/inputField';
import { IMAGE_URL, IS_MOBILE, PROFILE_ROLES, ROUTES, YES_NO } from '../../constants';
import { saveProfile } from '../services/profile.service';
import { getUserIdFromCookie } from '../../../utils/auth.utils';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../common/loader';
import { toast } from 'react-hot-toast';
interface ProfileDetailsProps {
    // Define your props here
}

const ProfileDetails: React.FC<ProfileDetailsProps> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const location = useLocation();
    const passedData = location.state?.profileData;
    const navigate = useNavigate();
    const [values, setValues] = useState<any>({
        full_name: passedData?.name ?? "",
        role: passedData?.userType ?? "",
        isOwnClinic: passedData?.clinicName ? 'YES' : '',
        clinicName: passedData?.clinicName ?? "",
        imageId: ""
    })

    const userId = getUserIdFromCookie();

    const handleBackNavigation = () => {
        IS_MOBILE ? navigate(ROUTES.SETTING) : window.history.back();
    }

    const handleSubmit = async () => {
        const submitData = {
            name: values?.full_name,
            userType: values?.role,
            clinicName: values?.isOwnClinic === 'YES' ? values?.clinicName : undefined,
            profileImage: values?.imageId ? values?.imageId : undefined
        }

        if (userId) {
            setIsLoading(true);
            const response = saveProfile(submitData, userId).then((response: any) => {
                toast.success('Successfully submitted')
                handleBackNavigation();
            }).catch((err: Error) => {

            });
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading ? <Loader /> :
                <div className='max-w-[900px] mx-auto'>
                    <div className='flex items-center justify-between gap-5 px-5'>
                        <div className='flex gap-2'>
                            <div className="md:hidden">
                                {(
                                    <div className="">
                                        <span onClick={handleBackNavigation} className="cursor-pointer">
                                            <IoChevronBack size={25} />
                                        </span>
                                    </div>
                                )}
                            </div>
                            <p className='text-base md:text-xl font-semibold'>Personal Details</p>
                        </div>
                        <p className='text-[#00A3FF] text-base font-semibold md:hidden' onClick={handleSubmit}>Save</p>
                    </div>
                    <div className='mt-8 max-w-[100px] max-h-[100px] mx-auto md:mx-5'>
                        <PhotoUpload
                            label="imageId"
                            name="image_id"
                            onChange={(file: any) => setValues({ ...values, imageId: file })}
                            preValue={passedData?.document ? passedData?.document?.doc_url?.replace(IMAGE_URL.GET_URL, IMAGE_URL.UPDATE_URL) : null}
                        />
                    </div>
                    <div className='px-5'>
                        <div className=' mt-6 w-full'>
                            <label className='text-base font-semibold'>Full Name</label>
                            <InputField
                                label="Name"
                                value={values?.full_name}
                                placeholder="Please enter your full name"
                                onChange={(e) => {
                                    setValues({ ...values, full_name: e.target.value })
                                }}
                                className='text-xs mt-2 md:w-[320px]'
                                inputClassName="px-4  bg-[#1F222E] rounded-[10px] h-[45px] w-full"
                            />
                        </div>
                        <div className='mt-7'>
                            <p className='text-base font-semibold'>
                                Which of these best describes your
                                role?
                            </p>
                            <div className='mt-4 md:flex md:w-full md:gap-4'>
                                {PROFILE_ROLES?.map((role: any, index: number) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`${values?.role === role?.id ? "border border-white" : ""} md:w-full flex items-center gap-3 mt-2 bg-[#1F222E] py-4 justify-center font-medium rounded-[10px]`}
                                            onClick={() => setValues({ ...values, role: role?.id })}
                                        >
                                            <p className='text-xs'>{role?.name}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {values?.role === 'DOCTOR' &&
                            <div className='mt-7'>
                                <label className='text-base font-semibold'>Do you own a Clinic?</label>
                                <div className='grid grid-cols-2 gap-2 md:w-[320px]'>
                                    {YES_NO?.map((option: any, index: number) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`${values?.isOwnClinic === option?.id ? "border border-white" : ""} flex items-center gap-3 mt-2 bg-[#1F222E] py-4 justify-center font-medium rounded-[10px]`}
                                                onClick={() => setValues({ ...values, isOwnClinic: option?.id })}
                                            >
                                                <p className='text-xs'>{option?.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        }
                        {values?.role === 'DOCTOR' && values?.isOwnClinic === 'YES' && <div className='mt-2'>
                            <InputField
                                label="clinicName"
                                value={values?.clinicName}
                                placeholder="Name of the Clinic"
                                onChange={(e) => {
                                    setValues({ ...values, clinicName: e.target.value })
                                }}
                                className='text-xs mt-2 md:w-[320px]'
                                inputClassName="px-4 bg-[#1F222E] rounded-[10px] h-[45px] w-full"
                            />
                        </div>
                        }
                    </div>
                    <div className='px-5 flex items-center gap-5 mt-9'>
                        <button className='hidden md:block h-10 w-[145px] border border-[#00A3FF]  text-[#00A3FF] text-sm font-medium px-4 py-2 rounded-lg' onClick={() => handleBackNavigation()}>Cancel</button>

                        {!IS_MOBILE && <button className={`w-full h-10 my-auto md:w-[145px] bg-[#00A3FF] text-white text-sm font-medium px-4 py-2 rounded-lg`} onClick={handleSubmit}>Save</button>}
                    </div>
                </div >
            }
        </>
    );
};

export default ProfileDetails;
