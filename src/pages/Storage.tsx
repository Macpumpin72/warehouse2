import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useModal } from "@/components/modals/ModalManager"
import { 
  Warehouse, 
  Package, 
  Plus, 
  MapPin, 
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle
} from "lucide-react"
import { formatDate } from "@/lib/mock-data"

const mockStorageData = [
  {
    id: "1",
    item: "10 boxes of shoes",
    space: "40m²",
    storageType: "Shelf",
    totalStorage: "40m²",
    duration: "50 days",
    date: "23, May 2025"
  },
  {
    id: "2", 
    item: "20 bags of clothes",
    space: "40m²",
    storageType: "Shelf",
    totalStorage: "40m²", 
    duration: "50 days",
    date: "23, May 2025"
  },
  {
    id: "3",
    item: "10 boxes of shoes",
    space: "40m²",
    storageType: "Shelf", 
    totalStorage: "40m²",
    duration: "50 days",
    date: "23, May 2025"
  }
]

const mockStorageRequests = [
  {
    id: "4001RRD",
    requestedStorage: "40m²",
    storageType: "Shelf",
    date: "23, May 2025",
    status: "approved"
  },
  {
    id: "4002RRD", 
    requestedStorage: "40m²",
    storageType: "Shelf",
    date: "23, May 2025",
    status: "declined"
  },
  {
    id: "4003RRD",
    requestedStorage: "40m²", 
    storageType: "Shelf",
    date: "23, May 2025",
    status: "pending"
  }
]

export default function Storage() {
  const [activeTab, setActiveTab] = useState("manage")
  const [showRequestForm, setShowRequestForm] = useState(false)
  const { openModal } = useModal()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "declined":
        return <XCircle className="h-4 w-4 text-destructive" />
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "border-success text-success"
      case "declined":
        return "border-destructive text-destructive"
      case "pending":
        return "border-warning text-warning"
      default:
        return "border-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Storage Management</h1>
          <p className="text-muted-foreground">Monitor and manage warehouse storage space</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="manage">Manage storage</TabsTrigger>
          <TabsTrigger value="requests">Storage request</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-6">
          {/* Space Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Allocated space</p>
                  <p className="text-4xl font-bold">280 m²</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total space remaining</p>
                  <p className="text-4xl font-bold">80 m²</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Used Storage */}
          <Card>
            <CardHeader>
              <CardTitle>Used storage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead>Space used</TableHead>
                      <TableHead>Type of storage</TableHead>
                      <TableHead>Total storage after item</TableHead>
                      <TableHead>Duration of storage</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStorageData.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.item}</TableCell>
                        <TableCell>{item.space}</TableCell>
                        <TableCell>{item.storageType}</TableCell>
                        <TableCell>{item.totalStorage}</TableCell>
                        <TableCell>{item.duration}</TableCell>
                        <TableCell>{item.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Approved</p>
                </div>
                <p className="text-2xl font-bold">4,000</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-warning" />
                  <p className="text-sm font-medium">Pending</p>
                </div>
                <p className="text-2xl font-bold text-warning">2,000</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <p className="text-sm font-medium">Declined</p>
                </div>
                <p className="text-2xl font-bold text-destructive">300</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex justify-end">
                <Button onClick={() => openModal('storage-request')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Request space
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Storage Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Storage requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Requested storage</TableHead>
                      <TableHead>Type of storage</TableHead>
                      <TableHead>Request date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStorageRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-mono">{request.id}</TableCell>
                        <TableCell>{request.requestedStorage}</TableCell>
                        <TableCell>{request.storageType}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(request.status)}
                            <Badge variant="outline" className={getStatusColor(request.status)}>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Storage Request Modal would go here */}
    </div>
  )
}