import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/MetricCard"
import { SimpleChart } from "@/components/SimpleChart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useModal } from "@/components/modals/ModalManager"
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Package,
  ShoppingCart,
  Truck,
  RotateCcw,
  DollarSign,
  Target
} from "lucide-react"

const performanceData = [
  { name: "Jan", orders: 450, revenue: 85000, fulfillment: 94 },
  { name: "Feb", orders: 520, revenue: 92000, fulfillment: 96 },
  { name: "Mar", orders: 480, revenue: 88000, fulfillment: 91 },
  { name: "Apr", orders: 610, revenue: 110000, fulfillment: 97 },
  { name: "May", orders: 590, revenue: 105000, fulfillment: 95 },
  { name: "Jun", orders: 680, revenue: 125000, fulfillment: 98 }
]

const categoryData = [
  { name: "Electronics", value: 35, volume: 2340 },
  { name: "Clothing", value: 28, volume: 1890 },
  { name: "Home & Garden", value: 20, volume: 1240 },
  { name: "Sports", value: 12, volume: 780 },
  { name: "Books", value: 5, volume: 320 }
]

export default function Analytics() {
  const { openModal } = useModal()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track performance, insights, and trends</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button 
            size="sm"
            onClick={() => openModal('report', { reportType: 'analytics' })}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$125,340"
          change={{ value: 12.5, label: "vs last month" }}
          trend="up"
          icon={DollarSign}
        />
        <MetricCard
          title="Orders Processed"
          value="2,847"
          change={{ value: 8.2, label: "this month" }}
          trend="up"
          icon={ShoppingCart}
        />
        <MetricCard
          title="Fulfillment Rate"
          value="98.2%"
          change={{ value: 2.1, label: "accuracy rate" }}
          trend="up"
          icon={Target}
        />
        <MetricCard
          title="Return Rate"
          value="2.8%"
          change={{ value: -0.5, label: "vs last month" }}
          trend="down"
          icon={RotateCcw}
        />
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Revenue & Orders Trend
                </CardTitle>
                <CardDescription>Monthly performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Chart visualization coming soon
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fulfillment Metrics</CardTitle>
                <CardDescription>Operational efficiency indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Pick Accuracy</span>
                    <span>99.1%</span>
                  </div>
                  <Progress value={99.1} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>On-Time Delivery</span>
                    <span>96.8%</span>
                  </div>
                  <Progress value={96.8} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Inventory Turnover</span>
                    <span>87.3%</span>
                  </div>
                  <Progress value={87.3} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Order Cycle Time</span>
                    <span>92.5%</span>
                  </div>
                  <Progress value={92.5} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Sales by Category
                </CardTitle>
                <CardDescription>Revenue distribution across product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category, index) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                        />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">{category.volume} units</span>
                        <Badge variant="secondary">{category.value}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Best sellers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Wireless Headphones", sales: 234, revenue: "$23,400" },
                    { name: "Smart Watch", sales: 189, revenue: "$37,800" },
                    { name: "Laptop Stand", sales: 156, revenue: "$7,800" },
                    { name: "USB-C Cable", sales: 145, revenue: "$2,900" },
                    { name: "Mouse Pad", sales: 134, revenue: "$1,340" }
                  ].map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                      </div>
                      <Badge className="bg-gradient-primary text-white">
                        {product.revenue}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Inventory Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Stock Levels</span>
                  <Badge variant="secondary">Healthy</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Low Stock Items</span>
                  <Badge className="bg-warning text-warning-foreground">23 items</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Out of Stock</span>
                  <Badge variant="destructive">5 items</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Overstock</span>
                  <Badge className="bg-info text-info-foreground">12 items</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Warehouse Utilization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Zone A</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Zone B</span>
                    <span>93%</span>
                  </div>
                  <Progress value={93} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Zone C</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Movement Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-success/10">
                  <span className="text-sm">Fast Movers</span>
                  <Badge className="bg-success text-success-foreground">156 items</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-warning/10">
                  <span className="text-sm">Slow Movers</span>
                  <Badge className="bg-warning text-warning-foreground">89 items</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-destructive/10">
                  <span className="text-sm">Dead Stock</span>
                  <Badge className="bg-destructive text-destructive-foreground">23 items</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Staff Performance
                </CardTitle>
                <CardDescription>Team productivity metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "John Doe", role: "Picker", efficiency: 98, orders: 145 },
                  { name: "Jane Smith", role: "Packer", efficiency: 96, orders: 132 },
                  { name: "Mike Johnson", role: "Receiver", efficiency: 94, orders: 89 },
                  { name: "Sarah Wilson", role: "Quality Control", efficiency: 99, orders: 67 }
                ].map((staff) => (
                  <div key={staff.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium">{staff.name}</p>
                      <p className="text-sm text-muted-foreground">{staff.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{staff.efficiency}% efficiency</p>
                      <p className="text-sm text-muted-foreground">{staff.orders} orders</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shift Analysis</CardTitle>
                <CardDescription>Performance by work shifts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Morning Shift (6AM-2PM)</span>
                    <Badge className="bg-success text-success-foreground">+12%</Badge>
                  </div>
                  <Progress value={89} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Day Shift (2PM-10PM)</span>
                    <Badge className="bg-warning text-warning-foreground">-3%</Badge>
                  </div>
                  <Progress value={76} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Night Shift (10PM-6AM)</span>
                    <Badge className="bg-info text-info-foreground">+7%</Badge>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}