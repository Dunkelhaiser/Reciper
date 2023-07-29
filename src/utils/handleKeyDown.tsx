export const handleKeyDown = <T extends HTMLElement>(e: React.KeyboardEvent<T>, onClick?: () => void) => {
    if ((e.key === "Enter" || e.key === " ") && onClick) {
        e.preventDefault();
        onClick();
    }
};
