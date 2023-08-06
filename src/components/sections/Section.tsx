import { cn } from "@utils/cn";

interface Props {
    children: React.ReactNode;
    title: string;
    className?: string;
    titleClassName?: string;
}

const Section = ({ children, title, className, titleClassName }: Props) => {
    return (
        <section className={cn(className)}>
            <h2 className={cn("mb-4 text-2xl font-bold", titleClassName)}>{title}</h2>
            {children}
        </section>
    );
};
export default Section;
