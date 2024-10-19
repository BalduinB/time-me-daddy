import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/navigation";

type PlatformLayoutProps = { children: React.ReactNode };
export default function PlatformLayout(props: PlatformLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{props.children}</SidebarInset>
    </SidebarProvider>
  );
}
