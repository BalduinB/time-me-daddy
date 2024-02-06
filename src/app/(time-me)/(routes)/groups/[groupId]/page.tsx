import { H2 } from "@/components/typography/heading";
import { api } from "@/trpc/server";
import { SubjectOverview } from "./_components/subject-overview";

export default async function GroupsPage({ params }: { params: { groupId: string } }) {
    const categories = await api.category.overview.query();

    return (
        <>
            <H2>Übersicht aller Kategorien</H2>
            <SubjectOverview categories={categories} />
        </>
    );
}
