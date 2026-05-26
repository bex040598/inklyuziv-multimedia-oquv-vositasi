import { EmptyState } from "@/components/ui/empty-state";

export function HumanEmptyState(props: {
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return <EmptyState {...props} />;
}
