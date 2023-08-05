import Button from "@ui/Button";

const NewComment = () => {
    return (
        <div className="flex max-w-2xl flex-col items-start rounded-xl bg-white px-6 py-4 shadow sm:px-8">
            <h3 className="mb-4 text-xl font-bold">Write a comment</h3>
            <textarea
                rows={5}
                className="resize-none self-stretch rounded-lg bg-stone-100 px-4 py-2 text-stone-700 outline-none ring-orange-200 ring-offset-2 transition focus:ring-2"
            />
            <Button className="mt-3">Comment</Button>
        </div>
    );
};
export default NewComment;
