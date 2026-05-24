import type { Course } from "../data/courses";

interface Props {
  title: string;
  description?: string;
  tags?: string[];
  thumbnail?: string;
  href?: string;
  level?: string;
  comingSoon?: boolean;
}

export default function CourseCard({
  title,
  description,
  tags = [],
  thumbnail,
  href = "#",
  level = "Beginner",
  comingSoon = false,
}: Props) {
  return (
    <a
      href={href}
      className="group block border border-border rounded-xl overflow-hidden cursor-pointer no-underline text-inherit transition-all duration-200 hover:border-border hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="aspect-video border-b border-border relative overflow-hidden">
        {
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        }
        {comingSoon && (
          <div className="absolute top-3 left-3 bg-foreground/80 text-primary-foreground typo-badge px-2.5 py-1 rounded-full backdrop-blur-sm">
            Coming Soon
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-1.5 flex-wrap">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="typo-tag bg-primary/90 text-primary-foreground px-2 py-0.5 rounded-full backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="typo-badge text-primary mb-2">
          {level}
        </div>
        <h3 className="typo-card-title text-foreground mb-3 line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="typo-body-sm text-muted line-clamp-2 mb-0">{description}</p>
        )}
      </div>
    </a>
  );
}
