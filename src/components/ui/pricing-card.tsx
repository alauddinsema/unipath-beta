
import { Check, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface PricingTier {
  id: string
  name: string
  description: string
  price: {
    monthly: string | number
    yearly?: string | number
  }
  features: Array<{ name: string, included: boolean }> | string[]
  cta: string
  popular?: boolean
  highlighted?: boolean
  onClick?: () => void
}

export interface PricingCardProps {
  tier: PricingTier
  paymentFrequency: string
}

export function PricingCard({ tier, paymentFrequency }: PricingCardProps) {
  const price =
    tier.price[paymentFrequency as keyof typeof tier.price] || tier.price.monthly

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border-border shadow transition-all duration-200",
        tier.popular && "border-primary",
        tier.highlighted && 
          "bg-gradient-to-b from-primary/10 to-background border-primary/50"
      )}
    >
      {tier.popular && (
        <div className="flex items-center justify-center bg-primary p-2 text-xs font-bold text-primary-foreground">
          <Star className="mr-1 h-3.5 w-3.5" />
          MOST POPULAR
        </div>
      )}
      <CardContent className="flex grow flex-col p-6">
        <div className="space-y-2">
          <h3 className="font-bold">{tier.name}</h3>
          <p className="text-sm text-muted-foreground">{tier.description}</p>
        </div>
        <div className="mt-6 flex items-baseline gap-1">
          {typeof price === "number" ? (
            <>
              <span className="text-3xl font-bold">${price}</span>
              <span className="text-sm font-medium text-muted-foreground">
                /{paymentFrequency === "monthly" ? "mo" : "yr"}
              </span>
            </>
          ) : (
            <span className="text-3xl font-bold">{price}</span>
          )}
        </div>

        <div className="mt-6 space-y-2">
          {Array.isArray(tier.features) && tier.features.length > 0 && 
            typeof tier.features[0] === 'string' ? (
            // Handle string array features (backward compatibility)
            tier.features.map((feature) => (
              <div key={feature as string} className="flex gap-2">
                <Check className="h-5 w-5 shrink-0 text-green-500" />
                <span className="text-sm">{feature}</span>
              </div>
            ))
          ) : (
            // Handle object features with included flag
            Array.isArray(tier.features) && tier.features.map((feature: any) => (
              <div key={feature.name} className="flex gap-2">
                {feature.included ? (
                  <Check className="h-5 w-5 shrink-0 text-green-500" />
                ) : (
                  <X className="h-5 w-5 shrink-0 text-red-500" />
                )}
                <span className="text-sm">{feature.name}</span>
              </div>
            ))
          )}
        </div>

        <div className="mt-auto pt-6">
          <Button
            variant={tier.popular || tier.highlighted ? "default" : "outline"}
            className="w-full"
            onClick={tier.onClick}
          >
            {tier.cta}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
