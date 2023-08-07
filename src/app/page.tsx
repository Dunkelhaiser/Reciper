import { getServerSession } from "next-auth";
import { authOptions } from "@auth";
import Hero from "@components/Hero";
import Trending from "@components/sections/Trending";
import CreateButton from "@components/CreateButton";

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <>
            {!session?.user && <Hero />}
            <Trending />
            <CreateButton />
        </>
    );
}
