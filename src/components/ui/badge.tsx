import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E75B6] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
        success:
          "border-transparent bg-emerald-50 text-[#2E7D32] dark:bg-emerald-950/40 dark:text-emerald-300",
        warning:
          "border-transparent bg-amber-50 text-[#E65100] dark:bg-amber-950/40 dark:text-amber-300",
        danger: "border-transparent bg-red-50 text-[#C62828] dark:bg-red-950/40 dark:text-red-300",
        ai: "border-transparent bg-purple-50 text-[#6A1B9A] dark:bg-purple-950/40 dark:text-purple-300",
        outline: "text-slate-950 dark:text-slate-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
