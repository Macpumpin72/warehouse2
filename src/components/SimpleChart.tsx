import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SimpleChartProps {
  title: string
  data: Array<{ name: string; value: number }>
  className?: string
}

export function SimpleChart({ title, data, className }: SimpleChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-medium">{item.value}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}