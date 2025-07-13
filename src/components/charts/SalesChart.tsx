import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign } from "lucide-react"

interface SalesData {
  date: string
  sales: number
  revenue: number
  day: string
}

const salesData: SalesData[] = [
  { date: "Mar 1", sales: 45000, revenue: 450000, day: "Mon" },
  { date: "Mar 2", sales: 52000, revenue: 520000, day: "Tue" },
  { date: "Mar 3", sales: 38000, revenue: 380000, day: "Wed" },
  { date: "Mar 4", sales: 61000, revenue: 610000, day: "Thu" },
  { date: "Mar 5", sales: 48000, revenue: 480000, day: "Fri" },
  { date: "Mar 6", sales: 55000, revenue: 550000, day: "Sat" },
  { date: "Mar 7", sales: 43000, revenue: 430000, day: "Sun" }
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

const formatCompactCurrency = (value: number) => {
  if (value >= 1000000) {
    return `₦${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `₦${(value / 1000).toFixed(0)}K`
  }
  return `₦${value}`
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">
              {entry.dataKey === 'sales' ? 'Sales: ' : 'Revenue: '}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {entry.dataKey === 'sales' 
                ? formatCompactCurrency(entry.value)
                : formatCurrency(entry.value)
              }
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function SalesChart() {
  const totalSales = salesData.reduce((sum, item) => sum + item.revenue, 0)
  const avgDailySales = totalSales / salesData.length
  const growth = ((salesData[salesData.length - 1].revenue - salesData[0].revenue) / salesData[0].revenue) * 100

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Sales summary
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Last 7 days
          </Badge>
          {growth > 0 && (
            <Badge className="bg-success/10 text-success border-success/20 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +{growth.toFixed(1)}%
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3 md:p-6">
        <div className="space-y-4">
          {/* Total Sales Display */}
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Total sales</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">
            {formatCurrency(totalSales)}
          </p>
          
          {/* Chart Container */}
          <div className="h-48 md:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 10,
                }}
              >
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217 100% 34%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(217 100% 34%)" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="hsl(var(--border))" 
                  opacity={0.3}
                />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fontSize: 12, 
                    fill: 'hsl(var(--muted-foreground))' 
                  }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fontSize: 12, 
                    fill: 'hsl(var(--muted-foreground))' 
                  }}
                  tickFormatter={formatCompactCurrency}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(217 100% 34%)"
                  strokeWidth={3}
                  fill="url(#salesGradient)"
                  dot={{ 
                    fill: 'hsl(217 100% 34%)', 
                    strokeWidth: 2, 
                    stroke: 'white',
                    r: 4
                  }}
                  activeDot={{ 
                    r: 6, 
                    fill: 'hsl(217 100% 34%)',
                    stroke: 'white',
                    strokeWidth: 2
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Avg Daily</p>
              <p className="text-sm font-semibold text-foreground">
                {formatCompactCurrency(avgDailySales)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Peak Day</p>
              <p className="text-sm font-semibold text-foreground">
                {formatCompactCurrency(Math.max(...salesData.map(d => d.revenue)))}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}