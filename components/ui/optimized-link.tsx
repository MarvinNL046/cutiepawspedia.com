/**
 * OptimizedLink - Link component with disabled prefetching
 *
 * Use this for components with many links (Footer, InternalLinksSection)
 * to prevent 300+ RSC prefetch requests that slow down page loads.
 *
 * Standard Next.js Link prefetches on viewport entry, which causes
 * massive request floods when pages have 100+ links visible.
 */

import Link, { LinkProps } from "next/link";
import { forwardRef, ReactNode } from "react";

interface OptimizedLinkProps extends Omit<LinkProps, "prefetch"> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

/**
 * Link without automatic prefetching
 * Prefetch only happens on hover, reducing initial page load requests significantly
 */
export const OptimizedLink = forwardRef<HTMLAnchorElement, OptimizedLinkProps>(
  ({ children, className, onClick, "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        prefetch={false}
        className={className}
        onClick={onClick}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

OptimizedLink.displayName = "OptimizedLink";

export default OptimizedLink;
