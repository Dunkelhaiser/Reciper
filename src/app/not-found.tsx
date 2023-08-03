const NotFound = () => {
    return (
        <section className="flex h-full flex-grow flex-col items-center justify-center">
            <h1 className="mb-4 text-5xl">Not Found</h1>
            <p className="text-center text-lg text-stone-600 dark:text-stone-300">
                Looks like the page you were looking for doesn&apos;t exist.
            </p>
        </section>
    );
};
export default NotFound;
