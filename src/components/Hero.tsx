import Image from "next/image";

const Hero = () => {
    return (
        <section className="mx-auto grid max-w-7xl gap-4 md:min-h-[calc(100vh_-_64px-_4rem)] md:grid-cols-2 md:items-center md:gap-8 xl:gap-20">
            <div>
                <h1 className="block text-3xl font-bold text-stone-800 sm:text-4xl lg:text-6xl lg:leading-tight">
                    Start your food journey with <span className="text-orange-400">Reciper</span>
                </h1>
                <p className="mt-3 text-lg text-stone-600">Discover, create, and share delicious recipes.</p>
            </div>
            <Image className="rounded-xl" src="/hero.webp" width={2400} height={2400} alt="Cutting board with products" />
        </section>
    );
};
export default Hero;
