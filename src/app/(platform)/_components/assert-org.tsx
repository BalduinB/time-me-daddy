import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function EnshureOrg() {
  const router = useRouter();
  const { organization, memberships, isLoaded } = useOrganization();
  const { setActive } = useOrganizationList();
  useEffect(() => {
    if (organization) return;
    if (!isLoaded) return;
    if (memberships?.data.length === 0) {
      return router.push("/create-org");
    }
    const firstOrgId = memberships?.data[0]?.organization.id;
    if (!setActive || !firstOrgId) return;
    void setActive({ organization: firstOrgId });
  }, [isLoaded, memberships, organization, router, setActive]);
  return null;
}
