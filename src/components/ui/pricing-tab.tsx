
import * as React from "react"
import { cn } from "@/lib/utils"

interface TabProps {
  text: string
  selected: boolean
  setSelected: (value: string) => void
  discount?: boolean
}

export function Tab({ text, selected, setSelected, discount }: TabProps) {
  return (
    <button
      className={cn(
        "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
        selected
          ? "bg-background text-foreground"
          : "hover:bg-background/10 text-muted-foreground"
      )}
      onClick={() => setSelected(text)}
    >
      {text}
      {discount && (
        <span className="absolute -right-1 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          $
        </span>
      )}
    </button>
  )
}
