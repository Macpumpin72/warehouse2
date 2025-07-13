import { MetricCard } from "@/components/MetricCard"
import { SalesChart } from "@/components/charts/SalesChart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useModal } from "@/components/modals/ModalManager"
import { 
  Package, 
  ShoppingCart, 
  RotateCcw, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Truck,
  AlertTriangle,
  Eye,
  CheckCircle,
  Clock
} from "lucide-react"
import { mockDashboardMetrics, mockOrders, formatCurrency } from "@/lib/mock-data"

export default function Dashboard() {
  const metrics = mockDashboardMetrics
  const recentOrders = mockOrders.slice(0, 5)
  const { openModal } = useModal()

  // Mock data for items to restock and items for delivery
  const itemsToRestock = [
    { no: 1, name: "Size 14 Brown shoes", numberLeft: 12, units: "Boxes" },
    { no: 2, name: "Size 14 Brown shoes", numberLeft: 12, units: "Boxes" },
    { no: 3, name: "Size 14 Brown shoes", numberLeft: 12, units: "Boxes" },
    { no: 4, name: "Size 14 Brown shoes", numberLeft: 12, units: "Boxes" },
    { no: 5, name: "Size 14 Brown shoes", numberLeft: 12, units: "Boxes" }
  ]

  const itemsForDelivery = [
    { no: 1, item: "Size 14 Brown shoes +2", address: "23, Adams close...", recipient: "Adewumi Jones", status: "Packaging" },
    { no: 2, item: "Size 14 Brown shoes +2", address: "23, Adams close...", recipient: "Adewumi Jones", status: "Shipped" },
    { no: 3, item: "Size 14 Brown shoes +2", address: "23, Adams close...", recipient: "Adewumi Jones", status: "Packaging" },
    { no: 4, item: "Size 14 Brown shoes +2", address: "23, Adams close...", recipient: "Adewumi Jones", status: "Packaging" },
    { no: 5, item: "Size 14 Brown shoes +2", address: "23, Adams close...", recipient: "Adewumi Jones", status: "Packaging" }
  ]

  const getStatusIcon = (status: string) => {
    return status === "Shipped" ? 
      <CheckCircle className="h-4 w-4 text-blue-500" /> : 
      <Clock className="h-4 w-4 text-orange-500" />
  }

  const getStatusBadge = (status: string) => {
    return status === "Shipped" ? 
      <Badge className="bg-blue-100 text-blue-700 border-blue-200">Shipped</Badge> : 
      <Badge className="bg-orange-100 text-orange-700 border-orange-200">Packaging</Badge>
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Overview</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground">Today</span>
            <Button variant="outline" size="sm" className="h-6 px-2 text-xs hover:bg-accent hover:text-accent-foreground transition-colors">
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-blue-500" />
              <p className="text-sm font-medium text-muted-foreground">Items in warehouse</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold">4,100</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="h-4 w-4 text-blue-500" />
              <p className="text-sm font-medium text-muted-foreground">Shipped</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold">200</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <p className="text-sm font-medium text-muted-foreground">Completed deliveries</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold">6,459</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-2">
              <RotateCcw className="h-4 w-4 text-orange-500" />
              <p className="text-sm font-medium text-muted-foreground">Returned packages</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold">20</p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Sales Chart */}
      <SalesChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Items to Restock */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg font-semibold">Items to restocked</CardTitle>
            <Button variant="outline" size="sm" className="hover:bg-accent hover:text-accent-foreground transition-colors">
              Status
            </Button>
          </CardHeader>
          <CardContent className="p-3 md:p-6">
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">No.</TableHead>
                    <TableHead className="text-xs">Item name</TableHead>
                    <TableHead className="text-xs">Number left</TableHead>
                    <TableHead className="text-xs">Units</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itemsToRestock.map((item) => (
                    <TableRow key={item.no} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="text-xs">{item.no}</TableCell>
                      <TableCell className="text-xs">{item.name}</TableCell>
                      <TableCell className="text-xs">{item.numberLeft}</TableCell>
                      <TableCell className="text-xs">{item.units}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Items for Delivery */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Items for delivery</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-6">
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">No.</TableHead>
                    <TableHead className="text-xs">Item</TableHead>
                    <TableHead className="text-xs">Address</TableHead>
                    <TableHead className="text-xs">Recipient</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itemsForDelivery.map((item) => (
                    <TableRow key={item.no} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="text-xs">{item.no}</TableCell>
                      <TableCell className="text-xs">{item.item}</TableCell>
                      <TableCell className="text-xs">{item.address}</TableCell>
                      <TableCell className="text-xs">{item.recipient}</TableCell>
                      <TableCell className="text-xs">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(item.status)}
                          {getStatusBadge(item.status)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Button 
              className="h-16 md:h-20 flex-col gap-1 md:gap-2 min-h-[48px] hover:bg-accent hover:text-accent-foreground transition-colors" 
              variant="outline"
              onClick={() => openModal('quick-add-inventory')}
            >
              <Package className="h-4 w-4 md:h-6 md:w-6" />
              <span className="text-xs md:text-sm">Add Inventory</span>
            </Button>
            <Button 
              className="h-16 md:h-20 flex-col gap-1 md:gap-2 min-h-[48px] hover:bg-accent hover:text-accent-foreground transition-colors" 
              variant="outline"
              onClick={() => openModal('process-orders')}
            >
              <ShoppingCart className="h-4 w-4 md:h-6 md:w-6" />
              <span className="text-xs md:text-sm">Process Orders</span>
            </Button>
            <Button 
              className="h-16 md:h-20 flex-col gap-1 md:gap-2 min-h-[48px] hover:bg-accent hover:text-accent-foreground transition-colors" 
              variant="outline"
              onClick={() => openModal('receive-items')}
            >
              <Truck className="h-4 w-4 md:h-6 md:w-6" />
              <span className="text-xs md:text-sm">Receive Items</span>
            </Button>
            <Button 
              className="h-16 md:h-20 flex-col gap-1 md:gap-2 min-h-[48px] hover:bg-accent hover:text-accent-foreground transition-colors" 
              variant="outline"
              onClick={() => openModal('handle-returns')}
            >
              <RotateCcw className="h-4 w-4 md:h-6 md:w-6" />
              <span className="text-xs md:text-sm">Handle Returns</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}