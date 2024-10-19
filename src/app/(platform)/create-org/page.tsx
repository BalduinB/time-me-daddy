import { CreateOrganization } from "@clerk/nextjs";
import { AppBreadcrumbs } from "../_components/navigation";

export default function CreateNewOrgPage() {
  return (
    <>
      <AppBreadcrumbs items={[{ title: "Erstellen", href: "/create-org" }]} />
      <div className="flex h-full items-center justify-center">
        <CreateOrganization />
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold">🏗</div>
            <div className="text-3xl font-bold">Organisation erstellen</div>
          </div>
          <div className="text-center text-muted-foreground">
            Erstelle eine neue Organisation, um mit deinem Team zu arbeiten.
          </div>
          <button className="btn btn-primary">Organisation erstellen</button>
        </div>
      </div>
    </>
  );
}
