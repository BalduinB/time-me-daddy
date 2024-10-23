export function projectLink(): string;
export function projectLink(pId: string, sub?: string): string;
export function projectLink(pId: string, sub: string): string;
export function projectLink(pId?: string, sub?: string) {
    if (!pId) return "/home";
    return `/p/${pId}${!!sub ? `/${sub}` : ""}`;
}
