/* eslint-disable react/jsx-props-no-spreading */
import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
    name?: string;
    placeholder?: string;
    value?: string;
    type?: "text" | "email" | "password" | "color" | "date" | "file" | "number" | "radio" | "range" | "tel";
    min?: number;
    max?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: UseFormRegister<any>;
    errors?: FieldError;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ name, type = "text", placeholder, value, register, errors, onKeyUp, max, min }) => {
    const isRegistered = register !== undefined && name !== undefined;

    return (
        <div className="relative flex w-full flex-col gap-2">
            <input
                type={type}
                value={value}
                max={max}
                min={min}
                placeholder={placeholder}
                {...(isRegistered ? register(name) : null)}
                className={`w-full border-b bg-transparent p-2 text-inherit outline-none placeholder:text-stone-400
                ${errors ? "border-red-400" : "border-stone-700"}`}
                onKeyUp={onKeyUp || undefined}
                aria-invalid={errors ? "true" : "false"}
            />
            {errors && <span className="text-xs font-medium text-red-400">{errors.message}</span>}
        </div>
    );
};

export default Input;
