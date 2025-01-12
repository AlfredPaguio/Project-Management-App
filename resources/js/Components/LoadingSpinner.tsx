import { cn } from "@/utils/cn";
import { forwardRef } from "react";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}
// VariantProps<typeof loadingSpinnerVariants> {}
const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-accent rounded-full",
        className
      )}
      role="status"
      {...props}
    />
  )
);
LoadingSpinner.displayName = "Loading Spinner";

export default LoadingSpinner;
export type { LoadingSpinnerProps };
