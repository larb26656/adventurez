export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  href: string;
  comingSoon?: boolean;
  color: string;
}

export interface GameCartridgeProps {
  course: Course;
  isActive?: boolean;
}

export interface GameCartridgeGridProps {
  courses: Course[];
}