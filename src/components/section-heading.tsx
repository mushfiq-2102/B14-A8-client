import { cn } from "cn";

export function SectionHeading({
  title,
  subtitle,
  className,
  as: Tag = "h2",
}: {
  title: string;
  subtitle?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Tag className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </Tag>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
