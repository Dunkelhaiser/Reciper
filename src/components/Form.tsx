interface Props {
    label: string;
    onSubmit: () => void;
    children: React.ReactNode;
}

const Form = ({ label, children, onSubmit }: Props) => {
    return (
        <form className="m-auto w-full max-w-lg rounded-lg bg-white px-10 py-12 shadow dark:bg-stone-900 md:px-20" onSubmit={onSubmit}>
            <h1 className="mb-4 text-4xl font-bold">{label}</h1>
            {children}
        </form>
    );
};
export default Form;
