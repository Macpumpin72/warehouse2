import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useModal } from "@/components/modals/ModalManager"
import { 
  Truck, 
  Package, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Camera,
  FileText,
  User
} from "lucide-react"

const mockReceivingData = [
  {
    id: "1",
    poNumber: "PO-2024-001",
    supplier: "Tech Corp",
    expectedItems: 150,
    receivedItems: 95,
    status: "in_progress",
    arrivalDate: "2024-01-15",
    inspector: "Jane Smith"
  },
  {
    id: "2",
    poNumber: "PO-2024-002",
    supplier: "KeyTech Ltd",
    expectedItems: 75,
    receivedItems: 75,
    status: "completed",
    arrivalDate: "2024-01-14",
    inspector: "Mike Johnson"
  }
]

export default function Receiving() {
  const { openModal } = useModal()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Receiving & Inspection</h1>
          <p className="text-muted-foreground">Process incoming shipments and quality checks</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => openModal('receive-items')}
        >
          <Truck className="h-4 w-4 mr-2" />
          New Shipment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Expected Today</p>
            </div>
            <p className="text-2xl font-bold">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-info" />
              <p className="text-sm font-medium">In Progress</p>
            </div>
            <p className="text-2xl font-bold text-info">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <p className="text-sm font-medium">Completed</p>
            </div>
            <p className="text-2xl font-bold text-success">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <p className="text-sm font-medium">Discrepancies</p>
            </div>
            <p className="text-2xl font-bold text-warning">2</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Receiving */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Receiving</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReceivingData.map((item) => (
                <div key={item.id} className="p-4 border border-border rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.poNumber}</p>
                      <p className="text-sm text-muted-foreground">{item.supplier}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        item.status === "completed" ? "bg-success/10 text-success border-success/20" :
                        item.status === "in_progress" ? "bg-info/10 text-info border-info/20" :
                        "bg-muted text-muted-foreground"
                      }
                    >
                      {item.status.replace("_", " ")}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{item.receivedItems}/{item.expectedItems}</span>
                    </div>
                    <Progress 
                      value={(item.receivedItems / item.expectedItems) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{item.inspector}</span>
                    </div>
                    <span>{item.arrivalDate}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openModal('photo-capture', { 
                        title: 'Capture Shipment Photos',
                        description: 'Take photos of received items for documentation'
                      })}
                    >
                      <Camera className="h-4 w-4 mr-1" />
                      Photo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openModal('report', { reportType: 'receiving' })}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inspection Checklist */}
        <Card>
          <CardHeader>
            <CardTitle>Quality Inspection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-3">PO-2024-001 Checklist</h4>
                <div className="space-y-2">
                  {[
                    { item: "Quantity verification", completed: true },
                    { item: "Package condition", completed: true },
                    { item: "Product quality", completed: false },
                    { item: "Documentation review", completed: false },
                    { item: "Labeling accuracy", completed: false }
                  ].map((check, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className={`h-4 w-4 ${check.completed ? 'text-success' : 'text-muted-foreground'}`} />
                      <span className={`text-sm ${check.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {check.item}
                      </span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" size="sm">
                  Complete Inspection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}