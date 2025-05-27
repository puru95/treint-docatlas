// import { Paginator } from 'primereact/paginator';
import React, { useEffect, useRef, useState } from 'react';
// import { NUMBERS } from '../../../../../common/treintConstants';
// import { fetchMedicineList } from '../../../utils/doc-marine.utils';
import { Paginator } from 'primereact/paginator';
import { IS_MOBILE, NUMBERS } from '../../constants';
import { fetchMedicineList } from '../utils/utils';

const MedicineList = ({ data, handleClick, medicineListTotalCount, setSelectedOptions, tab, id, fromMarketer }: any) => {
    const [pageInfo, setPageInfo] = useState({
        currentPage: 0,
        pageSize: IS_MOBILE ? 50 : 10
    })
    const [isLoading, setIsLoading] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [hasMoreData, setHasMoreData] = useState(true);
    const lastElementRef = useRef<HTMLDivElement>(null);
    const handlePageChange = (e: any) => {
        setPageInfo({
            currentPage: e.page,
            pageSize: e.rows
        })
    }


    const getData = async () => {
        if (isLoading || !hasMoreData) return;
        setIsLoading(true);
        const pagination: {
            start_from: number,
            page_size: number
        } = {
            start_from: (pageInfo.currentPage) * pageInfo.pageSize,
            page_size: pageInfo.pageSize
        }
        const medicineData = await fetchMedicineList(id, fromMarketer, () => { }, pagination);
        if (IS_MOBILE) {
            if (medicineData.length === 0) {
                setHasMoreData(false); // Stop further calls if no more data
            } else {
                setSelectedOptions((prevData: any) => [...prevData, ...medicineData]);
            }
        } else {
            setSelectedOptions(medicineData);
        }
        setIsLoading(false);
    }
    useEffect(() => {
        // if (lastElement) {
        getData();
        // }
    }, [pageInfo])


    useEffect(() => {
        if (isLoading || !lastElementRef.current || !hasMoreData) return;

        if (observerRef.current) observerRef.current.disconnect();

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPageInfo((prev) => ({
                        ...prev,
                        currentPage: prev.currentPage + 1
                    }));
                }
            },
            { threshold: 1 }
        );

        observer.observe(lastElementRef.current);
        observerRef.current = observer;

        return () => observer.disconnect();
    }, [isLoading, hasMoreData]);

    return (
        <div>
            <div className='w-full'>
                {data?.length > 0 && data?.map((d: any, index: number) => {
                    return (
                        <div className='w-full'>
                            <div key={index} className='text-xs font-normal mt-2 flex items-center justify-between'>
                                <p className='text-[#00A3FF] cursor-pointer' onClick={() => handleClick({ tab: 'MEDICINE', id: d?.id })}>{d?.name}</p>
                            </div>
                            {index !== data?.length - 1 && <div className='border-dashed border-b-[1px] border-[#808080] mt-2'></div>}

                        </div>
                    )
                })}
                {IS_MOBILE ?
                    <>
                        <div ref={lastElementRef} />
                        {isLoading && <div>Loading more...</div>}
                        {!hasMoreData && <div>No more data available</div>}
                    </>
                    : medicineListTotalCount > 0 && <div className="pagination" >
                        <Paginator first={(pageInfo.currentPage) * NUMBERS.TEN} rows={NUMBERS.TEN} totalRecords={medicineListTotalCount} onPageChange={handlePageChange} style={{ background: "none" }} />
                    </div>
                }


            </div>
        </div>
    );
};

export default MedicineList;
