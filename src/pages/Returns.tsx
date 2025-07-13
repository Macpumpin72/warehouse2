import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useModal } from "@/components/modals/ModalManager"
import { 
  RotateCcw, 
  Package, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  RefreshCw,
  Trash2,
  Wrench
} from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/mock-data"

const mockReturnsData = [
  {
    id: "1",
    rmaNumber: "RMA-2024-001",
    orderNumber: "ORD-2024-003",
    customer: "Mike Brown",
    product: "Wireless Headphones",
    reason: "Defective",
    status: "pending_inspection",
    value: 75.00,
    returnDate: "2024-01-15T10:30:00Z",
    action: "repair"
  },
  {
    id: "2",
    rmaNumber: "RMA-2024-002",
    orderNumber: "ORD-2024-001",
    customer: "John Smith",
    product: "Gaming Mouse",
    reason: "Wrong item",
    status: "approved",
    value: 45.00,
    returnDate: "2024-01-14T14:20:00Z",
    action: "replace"
  },
  {
    id: "3",
    rmaNumber: "RMA-2024-003",
    orderNumber: "ORD-2024-002",
    customer: "Sarah Johnson",
    product: "USB-C Cable",
    reason: "Customer changed mind",
    status: "restocked",
    value: 15.00,
    returnDate: "2024-01-13T09:15:00Z",
    action: "restock"
  }
]

export default function Returns() {
  const { openModal } = useModal()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending_inspection":
        return <AlertTriangle className="h-4 w-4 text-warning" />
      case "approved":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-destructive" />
      case "restocked":
        return <Package className="h-4 w-4 text-info" />
      default:
        return <RotateCcw className="h-4 w-4" />
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "restock":
        return <RefreshCw className="h-4 w-4 text-success" />
      case "repair":
        return <Wrench className="h-4 w-4 text-warning" />
      case "replace":
        return <Package className="h-4 w-4 text-info" />
      case "scrap":
        return <Trash2 className="h-4 w-4 text-destructive" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending_inspection: "bg-warning/10 text-warning border-warning/20",
      approved: "bg-success/10 text-success border-success/20",
      rejected: "bg-destructive/10 text-destructive border-destructive/20",
      restocked: "bg-info/10 text-info border-info/20"
    }
    return colors[status as keyof typeof colors] || "bg-muted text-muted-foreground"
  }

  const stats = {
    total: mockReturnsData.length,
    pending: mockReturnsData.filter(r => r.status === "pending_inspection").length,
    approved: mockReturnsData.filter(r => r.status === "approved").length,
    restocked: mockReturnsData.filter(r => r.status === "restocked").length,
    totalValue: mockReturnsData.reduce((sum, r) => sum + r.value, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Returns Management</h1>
          <p className="text-muted-foreground">Process and track product returns</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => openModal('handle-returns')}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          New RMA
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Total Returns</p>
            </div>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <p className="text-sm font-medium">Pending</p>
            </div>
            <p className="text-2xl font-bold text-warning">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <p className="text-sm font-medium">Approved</p>
            </div>
            <p className="text-2xl font-bold text-success">{stats.approved}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-info" />
              <p className="text-sm font-medium">Restocked</p>
            </div>
            <p className="text-2xl font-bold text-info">{stats.restocked}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-accent" />
              <p className="text-sm font-medium">Return Value</p>
            </div>
            <p className="text-2xl font-bold text-accent">{formatCurrency(stats.totalValue)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Returns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Return Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>RMA #</TableHead>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReturnsData.map((returnItem) => (
                  <TableRow key={returnItem.id}>
                    <TableCell className="font-mono font-medium">{returnItem.rmaNumber}</TableCell>
                    <TableCell className="font-mono">{returnItem.orderNumber}</TableCell>
                    <TableCell>{returnItem.customer}</TableCell>
                    <TableCell>{returnItem.product}</TableCell>
                    <TableCell>{returnItem.reason}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(returnItem.status)}
                        <Badge variant="outline" className={getStatusColor(returnItem.status)}>
                          {returnItem.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getActionIcon(returnItem.action)}
                        <span className="capitalize">{returnItem.action}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{formatCurrency(returnItem.value)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(returnItem.returnDate)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="sm">
                          Process
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* RMA Rules */}
      <Card>
        <CardHeader>
          <CardTitle>RMA Rules Engine</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="h-4 w-4 text-success" />
                <h4 className="font-medium">Auto-Restock</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Items in perfect condition returned within 30 days
              </p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="h-4 w-4 text-warning" />
                <h4 className="font-medium">Repair Required</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Defective items that can be refurbished
              </p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Trash2 className="h-4 w-4 text-destructive" />
                <h4 className="font-medium">Scrap</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Damaged beyond repair or expired items
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}