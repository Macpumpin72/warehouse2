import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bell, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Package, 
  ShoppingCart,
  Truck,
  Users,
  MoreHorizontal,
  Trash2,
  Check,
  Archive
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Low Stock Alert",
    message: "SKU-12345 (Wireless Headphones) is running low. Only 5 units remaining.",
    timestamp: "2 minutes ago",
    read: false,
    priority: "high",
    category: "inventory"
  },
  {
    id: 2,
    type: "success",
    title: "Order Completed",
    message: "Order #ORD-001 has been successfully fulfilled and shipped.",
    timestamp: "15 minutes ago",
    read: false,
    priority: "medium",
    category: "orders"
  },
  {
    id: 3,
    type: "info",
    title: "Shipment Received",
    message: "Incoming shipment SH-789 with 250 items has been received at dock 2.",
    timestamp: "1 hour ago",
    read: true,
    priority: "medium",
    category: "receiving"
  },
  {
    id: 4,
    type: "alert",
    title: "System Maintenance",
    message: "Scheduled maintenance will begin at 2:00 AM tonight. System downtime expected.",
    timestamp: "2 hours ago",
    read: true,
    priority: "high",
    category: "system"
  },
  {
    id: 5,
    type: "info",
    title: "New Team Member",
    message: "Sarah Johnson has joined the warehouse team as a Quality Control Specialist.",
    timestamp: "1 day ago",
    read: true,
    priority: "low",
    category: "team"
  },
  {
    id: 6,
    type: "alert",
    title: "Quality Issue",
    message: "Quality check failed for batch B-456. Items quarantined for inspection.",
    timestamp: "2 days ago",
    read: true,
    priority: "high",
    category: "quality"
  }
]

export default function Notifications() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [notificationList, setNotificationList] = useState(notifications)

  const filteredNotifications = notificationList.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || notification.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const unreadCount = notificationList.filter(n => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="w-5 h-5 text-destructive" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-success" />
      case "info":
        return <Info className="w-5 h-5 text-info" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "inventory":
        return <Package className="w-4 h-4" />
      case "orders":
        return <ShoppingCart className="w-4 h-4" />
      case "receiving":
        return <Truck className="w-4 h-4" />
      case "team":
        return <Users className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-destructive text-destructive-foreground">High</Badge>
      case "medium":
        return <Badge className="bg-warning text-warning-foreground">Medium</Badge>
      case "low":
        return <Badge variant="secondary">Low</Badge>
      default:
        return <Badge variant="outline">Normal</Badge>
    }
  }

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const deleteNotification = (id: number) => {
    setNotificationList(prev => prev.filter(n => n.id !== id))
  }

  const categoryStats = [
    { name: "All", value: "all", count: notificationList.length },
    { name: "Inventory", value: "inventory", count: notificationList.filter(n => n.category === "inventory").length },
    { name: "Orders", value: "orders", count: notificationList.filter(n => n.category === "orders").length },
    { name: "Receiving", value: "receiving", count: notificationList.filter(n => n.category === "receiving").length },
    { name: "Team", value: "team", count: notificationList.filter(n => n.category === "team").length },
    { name: "System", value: "system", count: notificationList.filter(n => n.category === "system").length }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Bell className="w-8 h-8" />
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground">
                {unreadCount} new
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">Stay updated with warehouse activities and alerts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{notificationList.length}</p>
              </div>
              <Bell className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold text-destructive">{unreadCount}</p>
              </div>
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-warning">
                  {notificationList.filter(n => n.priority === "high").length}
                </p>
              </div>
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today</p>
                <p className="text-2xl font-bold text-success">
                  {notificationList.filter(n => n.timestamp.includes("hour") || n.timestamp.includes("minute")).length}
                </p>
              </div>
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          {categoryStats.map((category) => (
            <TabsTrigger key={category.value} value={category.value} className="flex items-center gap-2">
              <span>{category.name}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground">No notifications found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`transition-all hover:shadow-md ${!notification.read ? 'border-l-4 border-l-primary bg-primary/5' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              {getCategoryIcon(notification.category)}
                              <span className="capitalize">{notification.category}</span>
                              <span>•</span>
                              <span>{notification.timestamp}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {getPriorityBadge(notification.priority)}
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                {!notification.read && (
                                  <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                    <Check className="w-4 h-4 mr-2" />
                                    Mark as Read
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                  <Archive className="w-4 h-4 mr-2" />
                                  Archive
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-destructive"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}