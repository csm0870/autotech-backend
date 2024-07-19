import { useState } from "react";
import './password-input.css';

type PasswordInputProps = {
    defaultValue?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

export const PasswordInput = ({ defaultValue, placeholder, error, onChange, required, disabled }: PasswordInputProps) => {

    const [value, setValue] = useState(defaultValue ?? '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if(onChange !== undefined) onChange(e.target.value);
    };

    return (
        <>
            <input
                className="password-input"
                type="password"
                value={value}
                placeholder={required ? `*${placeholder}` : placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                required={required}
                disabled={disabled}
            />
            {
                error !== undefined && (
                    <div className="password-input-control-error">
                        {error}
                    </div>
                )
            }
        </>
    );
};