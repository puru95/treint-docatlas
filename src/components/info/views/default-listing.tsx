import React, { useEffect } from 'react';
import { fetchDiseasesList, fetchLabList, fetchMedicalProcedureList, fetchMedicineList, fetchRadiologyList, fetchSaltList } from '../utils/utils';
import { DEFAULT_VIEW } from '../../constants';
import GreenTick from '../../../assets/greenTick.svg';
interface Props {
    // Define your component's props here
    mobile_tab: string;
    handleClick: any;
}

const DefaultListing: React.FC<Props> = ({ mobile_tab, handleClick }) => {
    const [displayData, setDisplayData] = React.useState<any>([]);

    const fetchListing = async () => {
        let data;
        let res;
        switch (mobile_tab) {
            case 'MEDICINE':
                data = await fetchMedicineList("");
                res = data?.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    type: "MEDICINE",
                }))
                break;
            case 'SALT':
                data = await fetchSaltList("");
                res = data?.map((item: any) => ({
                    id: item.id,
                    name: item.salt_name,
                    type: "SALT",
                }))
                break;
            case 'LAB':
                data = await fetchLabList("");
                res = data?.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    type: "LAB",
                }))
                break;
            case 'RADIOLOGY':
                data = await fetchRadiologyList("");
                res = data?.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    type: "RADIOLOGY",
                }))
                break;
            case 'MEDICAL_PROCEDURE':
                data = await fetchMedicalProcedureList("");
                res = data?.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    type: "MEDICAL_PROCEDURE",
                }))
                break;
            case 'DISEASES':
                data = await fetchDiseasesList("");
                res = data?.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    type: "DISEASES",
                }))
                break;
            default:
                // fetch default listing
                break
        }
        setDisplayData(res);
    }
    useEffect(() => {
        fetchListing();
    }, [mobile_tab]);
    const VIEW = DEFAULT_VIEW.filter((item: any) => item?.id === mobile_tab);
    return (
        <div className='mt-11 px-5 flex justify-center'>
            <div className='bg-[#1F222E] max-w-[360px] rounded-[10px]'>
                {VIEW.map((item: any, index: number) => {
                    return (
                        <div
                            key={index}
                            className={` px-5 py-5 rounded-[14px] mt-4 `}
                        >
                            <div className='flex justify-center'>{item.icon}</div>
                            <p className='text-[18px] md:text-[20px] font-bold text-center mt-2'>{item?.name}</p>
                            <div>
                                {item?.pointers?.map((point: any, index: number) => (
                                    <div
                                        key={index}
                                        className='gap-3 font-medium rounded-[10px] mt-8'
                                    >
                                        <div className='flex items-start gap-3'>
                                            <img
                                                loading="lazy"
                                                src={GreenTick}
                                                className=" overflow-hidden mt-1"
                                                alt='Brain DocMarine'
                                            />
                                            <div>
                                                <p className='text-base font-bold'>{point?.title}</p>
                                                <p className='text-sm opacity-60'>{point.desc}</p>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default DefaultListing;
