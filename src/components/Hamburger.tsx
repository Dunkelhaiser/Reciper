import { handleKeyDown } from "@/utils/handleKeyDown";

interface Props {
    expanded: boolean;
    className?: string;
    onClick: () => void;
}

const Hamburger = ({ expanded, className, onClick }: Props) => {
    return (
        <div
            className={`flex h-[26px] w-8 flex-col justify-between ${className}`}
            aria-expanded={expanded}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => handleKeyDown(e, onClick)}
        >
            <span
                className={`h-1 rounded-[10px] bg-stone-700 ${
                    expanded && "rotate-45"
                } origin-[0%_0%] transition-transform duration-[0.4s] ease-in-out`}
            />
            <span
                className={`h-1 rounded-[10px] bg-stone-700 ${expanded && "scale-y-0"} transition-transform duration-[0.2s] ease-in-out`}
            />
            <span
                className={`h-1 rounded-[10px] bg-stone-700 ${
                    expanded && "-rotate-45"
                } origin-[0%_100%] transition-transform duration-[0.4s] ease-in-out`}
            />
        </div>
    );
};

export default Hamburger;
