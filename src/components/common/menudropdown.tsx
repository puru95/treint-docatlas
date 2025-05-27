/**
 * Author: Kunal Kumar
 * Date: 2024-01-14
 * Company: Treint Business
 * File Path: /Users/kunalkumar/Work/treint/treint-business-web/apps/treint-business-web/src/common/components/menuDropDown.tsx
 * File Name: menuDropDown.tsx
 * File Description: Default functional component for a menu dropdown.
 */

// Dropdown.tsx
import React, { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from "react-icons/fa";

interface MenuDropdownOption {
    iconUrl?: any;
    label: string;
    onClick: any;
}

interface MenuDropdownProps {
    options: MenuDropdownOption[];
    className?: any;
    data?: any;
    handleClick?: any;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ options, className, data, handleClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            closeDropdown();
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (onClick: (data?: any) => void) => {
        handleClick();
        onClick(data);
        closeDropdown();
    };

    return (
        <div className=" mb-auto" ref={dropdownRef}>


            {(
                <div className="absolute right-0 top-8 mt-2 w-48 bg-[#10131f] rounded-md shadow-[0px_4px_64px_0px_rgba(111,125,154,0.25)]">
                    {options.map((option, index) => (
                        <div key={index} className="cursor-pointer py-3 flex items-center p-4 border-b border-[#E4EBF6] hover:bg-gray-700" role="menuitem" onClick={(e) => { e.stopPropagation(); handleOptionClick(option.onClick) }}>
                            {option?.iconUrl}
                            <button className="w-full ml-3 text-left text-white font-semibold text-sm  focus:outline-none ">
                                {option.label}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuDropdown;
