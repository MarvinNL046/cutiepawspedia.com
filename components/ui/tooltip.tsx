"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProviderProps {
  children: React.ReactNode
  delayDuration?: number
  skipDelayDuration?: number
}

interface TooltipContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
  delayDuration: number
}

const TooltipContext = React.createContext<TooltipContextValue | undefined>(
  undefined
)

function useTooltipContext() {
  const context = React.useContext(TooltipContext)
  if (!context) {
    throw new Error("Tooltip components must be used within a TooltipProvider")
  }
  return context
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({
  children,
  delayDuration = 400,
}) => {
  return <>{children}</>
}
TooltipProvider.displayName = "TooltipProvider"

interface TooltipProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  delayDuration?: number
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delayDuration = 400,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const triggerRef = React.useRef<HTMLElement>(null)

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = React.useCallback(
    (value: boolean) => {
      setUncontrolledOpen(value)
      onOpenChange?.(value)
    },
    [onOpenChange]
  )

  return (
    <TooltipContext.Provider value={{ open, setOpen, triggerRef, delayDuration }}>
      {children}
    </TooltipContext.Provider>
  )
}
Tooltip.displayName = "Tooltip"

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const { setOpen, delayDuration } = useTooltipContext()
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    const handleMouseEnter = () => {
      timeoutRef.current = setTimeout(() => {
        setOpen(true)
      }, delayDuration)
    }

    const handleMouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setOpen(false)
    }

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [])

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: () => setOpen(true),
        onBlur: () => setOpen(false),
      })
    }

    return (
      <button
        ref={ref}
        type="button"
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number
  side?: "top" | "right" | "bottom" | "left"
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, sideOffset = 4, children, ...props }, ref) => {
    const { open } = useTooltipContext()

    if (!open) return null

    return (
      <div
        ref={ref}
        role="tooltip"
        className={cn(
          "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        style={{ marginTop: sideOffset }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
