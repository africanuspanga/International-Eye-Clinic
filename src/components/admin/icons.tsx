import {
  BookOpen,
  CircleHelp,
  Clapperboard,
  FileText,
  Heart,
  HeartPulse,
  Images,
  Inbox,
  LayoutDashboard,
  LayoutGrid,
  Newspaper,
  Quote,
  Settings,
  Stethoscope,
  Eye,
  GalleryHorizontal,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  BookOpen,
  HelpCircle: CircleHelp,
  Clapperboard,
  FileText,
  Heart,
  HeartPulse,
  Images,
  Inbox,
  LayoutDashboard,
  LayoutGrid,
  Newspaper,
  Quote,
  Settings,
  Stethoscope,
  Eye,
  GalleryHorizontal,
};

export function AdminIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = ICONS[name] ?? FileText;
  return <Icon {...props} />;
}
