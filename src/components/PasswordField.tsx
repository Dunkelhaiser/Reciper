"use client";

import { FieldError, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useToggle from "@/hooks/useToggle";
import Input from "./Input";

interface Props {
    name?: string;
    placeholder?: string;
    value?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    errors?: FieldError | string | undefined | null;
}

const PasswordField: React.FC<Props> = ({ name, placeholder, value, register, errors }) => {
    const [showPsd, setShowPsd] = useToggle();

    const eyeIcon = (
        <button
            className="absolute right-[5%] top-[1.275rem] -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPsd()}
            type="button"
            aria-label={showPsd ? "Hide Password" : "Show Password"}
        >
            {showPsd ? <FaEye /> : <FaEyeSlash />}
        </button>
    );
    return (
        <div className="relative w-full">
            <Input
                type={showPsd ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                value={value}
                register={register}
                errors={errors}
            />
            {eyeIcon}
        </div>
    );
};
export default PasswordField;
