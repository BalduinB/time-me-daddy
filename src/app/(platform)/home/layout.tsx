import { AppBreadcrumbs } from "@/components/navigation";

type HomeProps = { children: React.ReactNode };
export default function HomeLayout(props: HomeProps) {
    return (
        <>
            <AppBreadcrumbs items={[{ href: "/home", title: "Übersicht" }]} />
            {props.children}
        </>
    );
}
