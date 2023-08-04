import { getServerSession } from "next-auth";
import { authOptions } from "@auth";
import Hero from "@components/Hero";

export default async function Home() {
    const session = await getServerSession(authOptions);

    return !session?.user && <Hero />;
}
