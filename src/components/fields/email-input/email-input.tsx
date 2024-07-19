import { useState } from "react";
import './email-input.css';

type EmailInputProps = {
    defaultValue?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

export const EmailInput = ({ defaultValue, placeholder, error, onChange, required, disabled }: EmailInputProps) => {

    const [value, setValue] = useState(defaultValue ?? '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if(onChange !== undefined) onChange(e.target.value);
    };

    const hasError = (error === undefined || error === '') ? false : true;

    return (
        <>
            <input
                className="email-input"
                type="email"
                value={value}
                placeholder={required ? `*${placeholder}` : placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                required={required}
                disabled={disabled}
            />
            {
                hasError && (
                    <div className="email-input-control-error">
                        {error}
                    </div>
                )
            }
        </>
    );
};