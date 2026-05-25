interface Props {
  title: string;
  description?: string;
  tags?: string[];
  href?: string;
}

export default function CheatsheetCard({
  title,
  description,
  tags = [],
  href = "#",
}: Props) {
  return (
    <a
      href={href}
      className="group block bg-white border border-border rounded-xl p-5 cursor-pointer no-underline text-inherit transition-all duration-200 hover:border-border hover:shadow-lg hover:-translate-y-0.5"
    >
      <h3 className="typo-card-title text-foreground mb-2 line-clamp-2">
        {title}
      </h3>
      {description && (
        <p className="typo-body-sm text-muted line-clamp-2 mb-0">
          {description}
        </p>
      )}
      {tags.length > 0 && (
        <div className="flex gap-1.5 flex-wrap mt-3">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="typo-tag bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}