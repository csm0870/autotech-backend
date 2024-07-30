import { useState } from "react";
import './file-input.css';

type EmailInputProps = {
    id: string;
    defaultValue?: FileList | null;
    placeholder?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    label?: string;
    multiple?: boolean;
    accept?: string;
    onChange?: (files: FileList | null) => void;
}

export const FileInput = ({ id, label, defaultValue, placeholder, accept, error, onChange, required, disabled, multiple }: EmailInputProps) => {

    const [files, setFiles] = useState(defaultValue);

    let names: string[] = [];

    if (files) {
        for (const file of files) {
            names.push(file.name);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
        if(onChange !== undefined) onChange(e.target.files);
    };

    const hasError = (error === undefined || error === '') ? false : true;

    return (
        <>
            <label htmlFor={id} className="file-input-label">{(required ? '*' : '') + label}</label>
            {
                names.length > 0 && <div className="current-files">Jelenlegi fájl(ok): {names.join(', ')}</div>
            }
            <input
                id={id}
                className="file-input"
                type="file"
                placeholder={required ? `*${placeholder}` : placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                required={required}
                disabled={disabled}
                multiple={multiple}
                accept={accept}
            />
            {
                hasError && (
                    <div className="file-input-control-error">
                        {error}
                    </div>
                )
            }
        </>
    );
};