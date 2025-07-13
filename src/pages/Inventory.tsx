import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useModal } from "@/components/modals/ModalManager"
import { 
  Search, 
  Filter, 
  Plus, 
  Edit,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Package,
  TrendingDown
} from "lucide-react"
import { mockProducts, formatCurrency, formatDate, getStatusColor } from "@/lib/mock-data"

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [products] = useState(mockProducts)
  const { openModal } = useModal()

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in_stock":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "low_stock":
        return <AlertTriangle className="h-4 w-4 text-warning" />
      case "out_of_stock":
        return <XCircle className="h-4 w-4 text-destructive" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const stockStats = {
    total: products.length,
    inStock: products.filter(p => p.status === "in_stock").length,
    lowStock: products.filter(p => p.status === "low_stock").length,
    outOfStock: products.filter(p => p.status === "out_of_stock").length,
    totalValue: products.reduce((sum, p) => sum + (p.quantity * p.cost), 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Monitor and manage your warehouse stock levels</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => openModal('add-inventory')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Total Items</p>
            </div>
            <p className="text-2xl font-bold">{stockStats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <p className="text-sm font-medium">In Stock</p>
            </div>
            <p className="text-2xl font-bold text-success">{stockStats.inStock}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <p className="text-sm font-medium">Low Stock</p>
            </div>
            <p className="text-2xl font-bold text-warning">{stockStats.lowStock}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive" />
              <p className="text-sm font-medium">Out of Stock</p>
            </div>
            <p className="text-2xl font-bold text-destructive">{stockStats.outOfStock}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-accent" />
              <p className="text-sm font-medium">Total Value</p>
            </div>
            <p className="text-2xl font-bold text-accent">{formatCurrency(stockStats.totalValue)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Product Inventory</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products, SKUs, categories..."
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
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Safety Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.supplier}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="font-mono text-sm">{product.location}</TableCell>
                    <TableCell>
                      <div className="text-center">
                        <p className="font-medium">{product.quantity}</p>
                        {product.quantity <= product.safetyStock && (
                          <p className="text-xs text-warning">Below safety stock</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{product.safetyStock}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(product.status)}
                        <Badge variant="outline" className={getStatusColor(product.status)}>
                          {product.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(product.quantity * product.cost)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(product.lastUpdated)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => window.location.href = `/inventory/${product.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}