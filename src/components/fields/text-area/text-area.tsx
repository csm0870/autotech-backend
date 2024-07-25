import { useState } from "react";
import './text-area.css';

type TextAreaProps = {
    defaultValue?: string | null;
    placeholder?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

export const Textarea = ({ defaultValue, placeholder, error, onChange, required, disabled }: TextAreaProps) => {

    const [value, setValue] = useState(defaultValue ?? '');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        if(onChange !== undefined) onChange(e.target.value);
    };

    const hasError = (error === undefined || error === '') ? false : true;

    return (
        <>
            <textarea
                className="textarea"
                value={value}
                placeholder={required ? `*${placeholder}` : placeholder}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e)}
                required={required}
                disabled={disabled}
            ></textarea>
            {
                hasError && (
                    <div className="textarea-control-error">
                        {error}
                    </div>
                )
            }
        </>
    );
};