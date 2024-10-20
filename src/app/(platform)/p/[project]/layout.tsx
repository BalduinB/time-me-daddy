type ProjectLayoutProps = {
    children: React.ReactNode;
    searchParams: { project: string };
};
export default function ProjectLayoutLayout(props: ProjectLayoutProps) {
    return <>{props.children}</>;
}
