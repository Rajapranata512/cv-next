import { RouteTransition } from "@/components/ui/RouteTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <RouteTransition>{children}</RouteTransition>;
}
