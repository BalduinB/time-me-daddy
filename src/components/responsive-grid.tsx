export function ResponsiveGrid({
    minWidth,
    ...props
}: {
    minWidth: number;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
            }}
            {...props}
        />
    );
}
