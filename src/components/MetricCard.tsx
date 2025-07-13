import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    label: string
  }
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
  className?: string
}

export function MetricCard({ title, value, change, icon: Icon, trend = "neutral", className }: MetricCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "bg-success/10 text-success border-success/20"
      case "down":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className={`transition-all duration-200 hover:shadow-soft ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6">
        <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground truncate flex-1 min-w-0">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground flex-shrink-0" />
      </CardHeader>
      <CardContent className="p-3 md:p-6 pt-0">
        <div className="space-y-1 md:space-y-2">
          <div className="text-lg md:text-2xl font-bold text-foreground truncate">{value}</div>
          {change && (
            <Badge variant="outline" className={`${getTrendColor()} text-xs`}>
              {change.value > 0 ? "+" : ""}{change.value}% <span className="hidden sm:inline">{change.label}</span>
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}