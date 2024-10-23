import { Header } from "@/features/landingpage/components/header";
import { HydrateClient } from "@/trpc/server";

export default function Home() {
    return (
        <HydrateClient>
            <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
                <Header />
                <main></main>
                <footer>sd</footer>
            </div>
        </HydrateClient>
    );
}
