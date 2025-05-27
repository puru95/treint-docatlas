import React, { useEffect, useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

interface InputSearchDropdownProps {
    items: any[];
    placeholder?: string;
    onChange: (value: string) => void;
    onSelect: (item: any) => void;
    disabled?: boolean;
    subName: string;
    initialValue?: string;
    debounceTime?: number;
    className?: string;
    inputClassName?: string;
    dropdownClassName?: string;
    searchIconColor?: string;
    setSearchInput: (val: any) => void;
    searchInput?: string;
    isSearchLoading?: boolean
}

declare global {
    interface Window {
        webkitSpeechRecognition: any;
    }
}

const InputSearchDropdown: React.FC<InputSearchDropdownProps> = ({
    items,
    placeholder = '',
    onChange,
    onSelect,
    disabled = false,
    subName,
    initialValue = '',
    debounceTime = 500,
    className = '',
    inputClassName = '',
    dropdownClassName = '',
    searchIconColor = '#10131F',
    setSearchInput,
    searchInput,
    isSearchLoading
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        if (items?.length > 0) {
            setIsOpen(!isOpen);
        }
    };

    useEffect(() => {
        if (items?.length > 0) {
            setIsOpen(true);
        } else {
            setIsOpen(false)
        }
    }, [items]);

    useEffect(() => {
        if (searchInput !== undefined) {
            inputRef.current!.value = searchInput;
        }

        if(searchInput === 'ooooppp') {
            alert(1);
            inputRef.current!.value = '';
        }
    }, [searchInput]);

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current?.focus();
            toggleDropdown()
        }
    }

    return (
        <div ref={dropdownRef} className={`relative text-left ${disabled ? 'bg-gray-100' : ''} rounded-[10px] md:rounded-md md:border  flex ${className}`}>

            { isSearchLoading ? <img src="/bouncing-circles.svg" alt="loader" className='w-8 mr-2' /> : <CiSearch className="self-center w-8 cursor-pointer mr-2" size={15} color={searchIconColor} onClick={focusInput} />}
            
            <input
                onClick={toggleDropdown}
                onChange={(e) => { onChange(e.target.value) }}
                placeholder={placeholder}
                type="text"
                className={`outline-none flex-grow rounded-md ${inputClassName}`}
                ref={inputRef}
                disabled={disabled}
                style={{
                    touchAction: 'manipulation', // Prevent zooming on input focus
                    WebkitTextSizeAdjust: 'none', // Disable font-size adjustment on iOS
                }}
            />
            {isOpen && (
                <div className={`z-10 origin-top-right absolute right-0 mt-8 p-4 w-full max-h-[25vh] overflow-scroll rounded-md shadow-lg ring-1 ring-gray-400 ring-opacity-5 ${dropdownClassName}`}>
                    <div className="py-1 w-full">
                        {items?.length > 0 ? items?.map((item: any) => (
                            <button
                                key={item?.id}
                                onClick={() => {
                                    setSearchInput(item[subName]);
                                    setIsOpen(false);
                                    onSelect(item);
                                }}
                                className="text-left text-wrap block w-full px-4 py-2 text-xs hover:bg-gray-600 hover:rounded-lg"
                            >
                                {item[subName]}
                            </button>
                        )) : <div className="text-xs font-normal">No data found</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputSearchDropdown;
