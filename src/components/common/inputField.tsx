import React, { FC } from 'react';

interface InputFieldProps {
    label?: string;
    type?: string;
    value: string;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    disabled?: boolean;
    className?: string;
    inputClassName?: string
}

const InputField: FC<InputFieldProps> = ({
    label,
    type = 'text', // default type is text
    value,
    placeholder,
    onChange,
    name,
    disabled = false,
    className = '',
    inputClassName = ''
}) => {
    return (
        <div className={`input-field ${className}`}>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                disabled={disabled}
                className={inputClassName}
            />
        </div>
    );
};

export default InputField;
