interface Props {
  title: string;
  tag?: string;
  thumbnail?: string;
  href: string;
  level?: string;
  duration?: string;
  rating?: string;
  price?: string;
}

export default function CourseCard({
  title,
  tag = "Adventure",
  thumbnail,
  href,
  level = "Beginner",
  duration = "3 hrs",
  price = "Free",
}: Props) {
  return (
    <a className="course-card" href={href}>
      <div className="course-thumb">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="course-thumbnail-img" />
        ) : (
          <div className="pixel-art">
            ░░██░░
            ░░██░░
            ████░░
            ░░██░░
            ░░██░░
          </div>
        )}
      </div>
      <div className="course-body">
        <div className="course-tag">{tag}</div>
        <div className="course-title">{title}</div>
        <div className="course-meta">
          <span>{level}</span>
          <span>{duration}</span>
        </div>
        <div className="course-footer">
          <div className="course-free">{price}</div>
          <button className="course-btn">Start</button>
        </div>
      </div>
    </a>
  );
}