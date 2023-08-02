interface Props {
    label: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    ariaLabel?: string;
}

const Button = ({ label, type = "button", onClick, className, disabled, ariaLabel }: Props) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${className} rounded-lg bg-orange-300 px-4 py-2 font-medium text-stone-50 transition
            hover:bg-orange-200 focus-visible:bg-orange-200 active:bg-orange-400 disabled:bg-stone-300`}
            aria-label={ariaLabel}
            aria-disabled={disabled}
        >
            {label}
        </button>
    );
};
export default Button;
