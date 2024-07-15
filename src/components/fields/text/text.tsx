import { useState } from "react";
import './text.css';

type TextProps = {
    defaultValue: string;
    placeholder: string;
    error: string;
    required: boolean;
    onInput?: (value: string) => void;
}

export const Text = ({ defaultValue, placeholder, error, onInput, required }: TextProps) => {

    const [value, setValue] = useState(defaultValue);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if(onInput !== undefined) onInput(e.target.value);
    };

    return (
        <>
            <input className="text-input" type="text" value={value} placeholder={required ? `*${placeholder}` : placeholder} onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)} />
            <div className="control-error">
                {error}
            </div>
        </>
    );
};