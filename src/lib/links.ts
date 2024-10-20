export function projectLink(): string;
export function projectLink(pId: string, sub?: string): string;
export function projectLink(pId: string, sub: string): string;
export function projectLink(pId?: string, sub?: string) {
    if (!pId) return "/p/all";
    return `/p/${pId}${!!sub ? `/${sub}` : ""}`;
}
