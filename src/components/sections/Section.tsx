interface Props {
    children: React.ReactNode;
    title: string;
}

const Section = ({ children, title }: Props) => {
    return (
        <section>
            <h2 className="mb-4 text-2xl font-bold">{title}</h2>
            {children}
        </section>
    );
};
export default Section;
