import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Upload, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  CalendarIcon, 
  Package, 
  ShoppingCart, 
  Truck, 
  RotateCcw,
  Camera,
  FileText,
  Download
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Quick Add Inventory Form
export function QuickAddInventoryForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    quantity: "",
    location: "",
    category: ""
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Product added successfully",
      description: `${formData.name} has been added to inventory.`,
    })
    onClose()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Quick Add Inventory</CardTitle>
        <CardDescription>Add a new product to inventory</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
              placeholder="SKU-12345"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Product name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
              placeholder="100"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zone-a">Zone A</SelectItem>
                <SelectItem value="zone-b">Zone B</SelectItem>
                <SelectItem value="zone-c">Zone C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="home">Home & Garden</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 hover:bg-accent hover:text-accent-foreground transition-colors">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 hover:bg-primary/90 transition-colors">
              <Save className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// Process Orders Form
export function ProcessOrdersForm({ onClose }: { onClose: () => void }) {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const { toast } = useToast()

  const mockOrders = [
    { id: "ORD-001", customer: "John Smith", items: 3, status: "pending" },
    { id: "ORD-002", customer: "Sarah Johnson", items: 1, status: "pending" },
    { id: "ORD-003", customer: "Mike Brown", items: 5, status: "pending" }
  ]

  const handleProcess = () => {
    toast({
      title: "Orders processed",
      description: `${selectedOrders.length} orders have been processed successfully.`,
    })
    onClose()
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Process Orders</CardTitle>
        <CardDescription>Select orders to process for fulfillment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedOrders(prev => [...prev, order.id])
                        } else {
                          setSelectedOrders(prev => prev.filter(id => id !== order.id))
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell className="font-mono">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 hover:bg-accent hover:text-accent-foreground transition-colors">
              Cancel
            </Button>
            <Button 
              onClick={handleProcess} 
              disabled={selectedOrders.length === 0}
              className="flex-1 hover:bg-primary/90 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Process {selectedOrders.length} Orders
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Receive Items Form
export function ReceiveItemsForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    poNumber: "",
    supplier: "",
    expectedDate: undefined as Date | undefined,
    notes: ""
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Shipment registered",
      description: `PO ${formData.poNumber} has been registered for receiving.`,
    })
    onClose()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Receive Items</CardTitle>
        <CardDescription>Register incoming shipment</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="poNumber">PO Number</Label>
            <Input
              id="poNumber"
              value={formData.poNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, poNumber: e.target.value }))}
              placeholder="PO-2024-001"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Input
              id="supplier"
              value={formData.supplier}
              onChange={(e) => setFormData(prev => ({ ...prev, supplier: e.target.value }))}
              placeholder="Supplier name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Expected Arrival Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.expectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.expectedDate ? format(formData.expectedDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.expectedDate}
                  onSelect={(date) => setFormData(prev => ({ ...prev, expectedDate: date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes..."
              rows={3}
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 hover:bg-accent hover:text-accent-foreground transition-colors">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 hover:bg-primary/90 transition-colors">
              <Truck className="w-4 h-4 mr-2" />
              Register Shipment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// Handle Returns Form
export function HandleReturnsForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    orderNumber: "",
    customerName: "",
    reason: "",
    condition: "",
    action: ""
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Return processed",
      description: `Return for order ${formData.orderNumber} has been processed.`,
    })
    onClose()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Handle Returns</CardTitle>
        <CardDescription>Process product return</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orderNumber">Order Number</Label>
            <Input
              id="orderNumber"
              value={formData.orderNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, orderNumber: e.target.value }))}
              placeholder="ORD-2024-001"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
              placeholder="Customer name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Return Reason</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, reason: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="defective">Defective</SelectItem>
                <SelectItem value="wrong-item">Wrong Item</SelectItem>
                <SelectItem value="damaged">Damaged in Transit</SelectItem>
                <SelectItem value="not-needed">No Longer Needed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="condition">Item Condition</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, condition: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Like New</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="damaged">Damaged</SelectItem>
                <SelectItem value="unusable">Unusable</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="action">Action</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, action: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="restock">Restock</SelectItem>
                <SelectItem value="repair">Repair</SelectItem>
                <SelectItem value="replace">Replace</SelectItem>
                <SelectItem value="scrap">Scrap</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 hover:bg-accent hover:text-accent-foreground transition-colors">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 hover:bg-primary/90 transition-colors">
              <RotateCcw className="w-4 h-4 mr-2" />
              Process Return
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}