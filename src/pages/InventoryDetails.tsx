import { useState } from "react"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Edit, 
  Package, 
  DollarSign,
  Calendar,
  MapPin,
  Truck,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { formatCurrency } from "@/lib/mock-data"

export default function InventoryDetails() {
  const { id } = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Mock data for product details
  const product = {
    id: id,
    name: "Black big sole shoes",
    sku: "LTH-203543",
    weight: "400g",
    costPrice: "NGN 500,000",
    sellingPrice: "NGN 550,000",
    minimumQty: 10,
    quantityOutForDelivery: 20,
    totalDelivered: 300,
    totalStillInStock: 300,
    totalValue: "NGN 3,000,000",
    images: [
      "/placeholder-shoe.jpg",
      "/placeholder-shoe-2.jpg",
      "/placeholder-shoe-3.jpg"
    ]
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Inventory
        </Button>
        <div className="text-sm text-muted-foreground">
          Inventory list / Black big sole shoes
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Images */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Images</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm">More</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg overflow-hidden">
                <img 
                  src={product.images[currentImageIndex]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
              
              <div className="absolute bottom-4 right-4 text-white text-sm">
                Previous | Next
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Side - Details */}
        <div className="space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Quantity out for delivery</p>
                  <p className="text-3xl font-bold">{product.quantityOutForDelivery}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total delivered</p>
                  <p className="text-3xl font-bold">{product.totalDelivered} units</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total still in stock</p>
                  <p className="text-3xl font-bold">{product.totalStillInStock}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total value</p>
                  <p className="text-3xl font-bold">{product.totalValue}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Item Details */}
          <Card>
            <CardHeader>
              <CardTitle>Item details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Unit</p>
                  <p className="font-medium">Box</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-medium">{product.weight}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Cost price</p>
                  <p className="font-medium">{product.costPrice}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Selling price</p>
                  <p className="font-medium">{product.sellingPrice}</p>
                </div>
                
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Minimum qty</p>
                  <p className="font-medium">{product.minimumQty}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}