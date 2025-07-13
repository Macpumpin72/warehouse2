import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useModal } from "@/components/modals/ModalManager"
import { 
  Search, 
  Filter, 
  Plus, 
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreHorizontal,
  Printer
} from "lucide-react"
import { mockOrders, formatCurrency, formatDate, getStatusColor } from "@/lib/mock-data"

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [orders] = useState(mockOrders)
  const { openModal } = useModal()

  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />
      case "processing":
        return <Package className="h-4 w-4 text-info" />
      case "picking":
        return <Package className="h-4 w-4 text-accent" />
      case "packed":
        return <Package className="h-4 w-4 text-primary" />
      case "shipped":
        return <Truck className="h-4 w-4 text-success" />
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-success" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      case "medium":
        return <Clock className="h-4 w-4 text-warning" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-success" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    totalValue: orders.reduce((sum, o) => sum + o.value, 0)
  }

  const statusCounts = {
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    picking: orders.filter(o => o.status === "picking").length,
    packed: orders.filter(o => o.status === "packed").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Order Management</h1>
          <p className="text-muted-foreground">Track and process customer orders</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/print-labels'}
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Labels
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => openModal('add-order')}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Total Orders</p>
            </div>
            <p className="text-2xl font-bold">{orderStats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <p className="text-sm font-medium">Pending</p>
            </div>
            <p className="text-2xl font-bold text-warning">{orderStats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-info" />
              <p className="text-sm font-medium">Processing</p>
            </div>
            <p className="text-2xl font-bold text-info">{orderStats.processing}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-success" />
              <p className="text-sm font-medium">Shipped</p>
            </div>
            <p className="text-2xl font-bold text-success">{orderStats.shipped}</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Orders</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders, customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({statusCounts.pending})</TabsTrigger>
              <TabsTrigger value="processing">Processing ({statusCounts.processing})</TabsTrigger>
              <TabsTrigger value="shipped">Shipped ({statusCounts.shipped})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Order Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Tracking</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono font-medium">{order.orderNumber}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            <Badge variant="outline" className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getPriorityIcon(order.priority)}
                            <Badge variant="outline" className={getStatusColor(order.priority)}>
                              {order.priority}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{order.items}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(order.value)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(order.orderDate)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(order.dueDate)}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {order.trackingNumber || "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => window.location.href = `/orders/${order.orderNumber}`}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* Similar content for other tabs... */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}