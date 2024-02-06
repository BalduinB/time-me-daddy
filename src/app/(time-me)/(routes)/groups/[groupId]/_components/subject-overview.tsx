import type { CategoryRouterOutputs } from "@/server/api/routers/categories";
import { NoSubjects } from "./no-subjects";

type Categorie = CategoryRouterOutputs["overview"][number];
type Props = {
    categories: Array<Categorie>;
};
export function SubjectOverview({ categories }: Props) {
    return (
        <div>
            {categories.map((c) => (
                <>{c.name}</>
            ))}
            <NoSubjects />
        </div>
    );
}
