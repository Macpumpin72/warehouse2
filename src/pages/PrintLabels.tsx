import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  Printer, 
  Download, 
  Eye, 
  Settings,
  Package,
  ArrowLeft
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockOrders = [
  { id: "ORD-001", customer: "John Smith", items: 3, address: "123 Main St, New York, NY 10001" },
  { id: "ORD-002", customer: "Sarah Johnson", items: 1, address: "456 Oak Ave, Los Angeles, CA 90210" },
  { id: "ORD-003", customer: "Mike Brown", items: 5, address: "789 Pine Rd, Chicago, IL 60601" }
]

export default function PrintLabels() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [labelSettings, setLabelSettings] = useState({
    format: "4x6",
    includeBarcode: true,
    includeReturnAddress: true,
    carrier: "ups"
  })
  const { toast } = useToast()

  const handlePrint = () => {
    if (selectedOrders.length === 0) {
      toast({
        title: "No orders selected",
        description: "Please select at least one order to print labels.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Labels printed",
      description: `${selectedOrders.length} shipping labels have been sent to printer.`,
    })
  }

  const handleDownload = () => {
    if (selectedOrders.length === 0) {
      toast({
        title: "No orders selected", 
        description: "Please select at least one order to download labels.",
        variant: "destructive"
      })
      return
    }

    // Simulate file download
    const link = document.createElement('a')
    link.href = '#'
    link.download = `shipping-labels-${new Date().toISOString().split('T')[0]}.pdf`
    link.click()

    toast({
      title: "Labels downloaded",
      description: `${selectedOrders.length} shipping labels have been downloaded.`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Print Shipping Labels</h1>
          <p className="text-muted-foreground">Generate and print shipping labels for orders</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Label Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Label Settings
            </CardTitle>
            <CardDescription>Configure label format and options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Label Format</Label>
              <Select value={labelSettings.format} onValueChange={(value) => setLabelSettings(prev => ({ ...prev, format: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4x6">4" x 6" (Standard)</SelectItem>
                  <SelectItem value="4x4">4" x 4" (Square)</SelectItem>
                  <SelectItem value="8.5x11">8.5" x 11" (Letter)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Shipping Carrier</Label>
              <Select value={labelSettings.carrier} onValueChange={(value) => setLabelSettings(prev => ({ ...prev, carrier: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ups">UPS</SelectItem>
                  <SelectItem value="fedex">FedEx</SelectItem>
                  <SelectItem value="usps">USPS</SelectItem>
                  <SelectItem value="dhl">DHL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeBarcode"
                  checked={labelSettings.includeBarcode}
                  onCheckedChange={(checked) => setLabelSettings(prev => ({ ...prev, includeBarcode: checked as boolean }))}
                />
                <Label htmlFor="includeBarcode">Include Barcode</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeReturnAddress"
                  checked={labelSettings.includeReturnAddress}
                  onCheckedChange={(checked) => setLabelSettings(prev => ({ ...prev, includeReturnAddress: checked as boolean }))}
                />
                <Label htmlFor="includeReturnAddress">Include Return Address</Label>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <Button onClick={handlePrint} className="w-full" disabled={selectedOrders.length === 0}>
                <Printer className="w-4 h-4 mr-2" />
                Print Labels ({selectedOrders.length})
              </Button>
              
              <Button variant="outline" onClick={handleDownload} className="w-full" disabled={selectedOrders.length === 0}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Selection */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Select Orders
            </CardTitle>
            <CardDescription>Choose orders to generate shipping labels for</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedOrders.length === mockOrders.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedOrders(mockOrders.map(o => o.id))
                        } else {
                          setSelectedOrders([])
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Shipping Address</TableHead>
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
                    <TableCell className="max-w-xs truncate">{order.address}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                        Ready to Ship
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      {selectedOrders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Label Preview
            </CardTitle>
            <CardDescription>Preview of shipping labels to be printed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedOrders.slice(0, 3).map((orderId) => {
                const order = mockOrders.find(o => o.id === orderId)
                return (
                  <div key={orderId} className="border-2 border-dashed border-muted-foreground/25 p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="font-bold">FOLANO WAREHOUSE</div>
                      <div className="text-xs">123 Warehouse Blvd, City, ST 12345</div>
                      <hr className="my-2" />
                      <div className="font-medium">Ship To:</div>
                      <div>{order?.customer}</div>
                      <div className="text-xs">{order?.address}</div>
                      <hr className="my-2" />
                      <div className="flex justify-between">
                        <span>Order: {orderId}</span>
                        <span>{labelSettings.carrier.toUpperCase()}</span>
                      </div>
                      {labelSettings.includeBarcode && (
                        <div className="text-center">
                          <div className="bg-black h-8 w-full opacity-20 rounded"></div>
                          <div className="text-xs mt-1">{orderId}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
              {selectedOrders.length > 3 && (
                <div className="border-2 border-dashed border-muted-foreground/25 p-4 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Package className="w-8 h-8 mx-auto mb-2" />
                    <p>+{selectedOrders.length - 3} more labels</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}