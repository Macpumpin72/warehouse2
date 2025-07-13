import { useState } from "react"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useModal } from "@/components/modals/ModalManager"
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock,
  Package,
  Truck,
  User,
  MapPin,
  Calendar,
  Phone,
  Mail
} from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/mock-data"

export default function OrderDetails() {
  const { orderNumber } = useParams()
  const { openModal } = useModal()
  
  // Mock order data
  const order = {
    orderNumber: orderNumber || "2203ERJE304",
    customer: "Brooks leather",
    status: "in_progress",
    priority: "high",
    orderDate: "23, May 2025",
    dueDate: "25, May 2025",
    totalValue: 125000,
    items: [
      {
        id: "1",
        name: "Brown leather",
        sku: "LTH-203543",
        quantityOrdered: 20,
        quantityReceived: 20,
        status: "under_review"
      },
      {
        id: "2",
        name: "Brown leather",
        sku: "LTH-203543", 
        quantityOrdered: 20,
        quantityReceived: 20,
        status: "approved"
      },
      {
        id: "3",
        name: "Brown leather",
        sku: "LTH-203543",
        quantityOrdered: 20, 
        quantityReceived: 20,
        status: "approved"
      },
      {
        id: "4",
        name: "Brown leather",
        sku: "LTH-203543",
        quantityOrdered: 20,
        quantityReceived: 20,
        status: "rejected"
      }
    ]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "under_review":
        return <Clock className="h-4 w-4 text-warning" />
      case "rejected":
        return <Package className="h-4 w-4 text-destructive" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "border-success text-success"
      case "under_review":
        return "border-warning text-warning"
      case "rejected":
        return "border-destructive text-destructive"
      default:
        return "border-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Receiving
        </Button>
        <div className="text-sm text-muted-foreground">
          Receiving & Inspection / Order {order.orderNumber}
        </div>
      </div>

      {/* Order Status Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">In progress</span>
            </div>
            
            <div className="flex-1 h-px bg-border"></div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">2</span>
              </div>
              <span className="text-sm text-muted-foreground">{order.orderNumber}</span>
            </div>
            
            <div className="flex-1 h-px bg-border"></div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">3</span>
              </div>
              <span className="text-sm text-muted-foreground">Arrival date: {order.orderNumber}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Order details</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Quantity ordered</TableHead>
                      <TableHead>Quantity received</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                        <TableCell className="text-center">{item.quantityOrdered}</TableCell>
                        <TableCell className="text-center">{item.quantityReceived}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(item.status)}
                            <Badge variant="outline" className={getStatusColor(item.status)}>
                              {item.status.replace("_", " ")}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openModal('file-upload', {
                              title: 'Upload Item Documentation',
                              description: 'Upload photos, receipts, or other documents for this item'
                            })}
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inspection Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No inspection reports available</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}