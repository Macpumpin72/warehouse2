import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Shield,
  Activity
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@warehouse.com",
    role: "Warehouse Manager",
    department: "Operations",
    status: "Active",
    lastActive: "2 hours ago",
    avatar: "",
    phone: "+1 (555) 123-4567",
    location: "Zone A"
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@warehouse.com",
    role: "Inventory Specialist",
    department: "Inventory",
    status: "Active",
    lastActive: "1 hour ago",
    avatar: "",
    phone: "+1 (555) 234-5678",
    location: "Zone B"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@warehouse.com",
    role: "Picker",
    department: "Fulfillment",
    status: "Active",
    lastActive: "30 minutes ago",
    avatar: "",
    phone: "+1 (555) 345-6789",
    location: "Zone C"
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily@warehouse.com",
    role: "Quality Control",
    department: "Quality",
    status: "Inactive",
    lastActive: "3 days ago",
    avatar: "",
    phone: "+1 (555) 456-7890",
    location: "Zone A"
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@warehouse.com",
    role: "Receiving Clerk",
    department: "Receiving",
    status: "Active",
    lastActive: "15 minutes ago",
    avatar: "",
    phone: "+1 (555) 567-8901",
    location: "Dock 1"
  }
]

const roles = [
  { name: "Warehouse Manager", permissions: ["All Access"], count: 2 },
  { name: "Inventory Specialist", permissions: ["Inventory", "Reports"], count: 5 },
  { name: "Picker", permissions: ["Orders", "Inventory View"], count: 12 },
  { name: "Packer", permissions: ["Orders", "Shipping"], count: 8 },
  { name: "Quality Control", permissions: ["Quality", "Reports"], count: 3 },
  { name: "Receiving Clerk", permissions: ["Receiving", "Inventory"], count: 4 }
]

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    return status === "Active" 
      ? <Badge className="bg-success text-success-foreground">Active</Badge>
      : <Badge variant="secondary">Inactive</Badge>
  }

  const getRoleColor = (role: string) => {
    const colors = {
      "Warehouse Manager": "bg-primary text-primary-foreground",
      "Inventory Specialist": "bg-info text-info-foreground",
      "Picker": "bg-success text-success-foreground",
      "Packer": "bg-warning text-warning-foreground",
      "Quality Control": "bg-accent text-accent-foreground",
      "Receiving Clerk": "bg-secondary text-secondary-foreground"
    }
    return colors[role as keyof typeof colors] || "bg-muted text-muted-foreground"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage warehouse staff and permissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">34</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-success/10 rounded-lg">
                <Activity className="w-5 h-5 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Now</p>
                <p className="text-2xl font-bold">28</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Shield className="w-5 h-5 text-warning" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Managers</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-info/10 rounded-lg">
                <UserPlus className="w-5 h-5 text-info" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">New This Month</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">All Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Department
            </Button>
          </div>

          {/* Users Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <Card key={role.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{role.name}</CardTitle>
                  <CardDescription>{role.count} users assigned</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Permissions:</p>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Permissions
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>User actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: "John Doe", action: "Updated inventory count for SKU-12345", time: "2 minutes ago", type: "update" },
                  { user: "Sarah Wilson", action: "Processed order #ORD-001", time: "15 minutes ago", type: "order" },
                  { user: "Mike Johnson", action: "Completed picking task", time: "30 minutes ago", type: "task" },
                  { user: "Emily Chen", action: "Quality check failed for batch B-456", time: "1 hour ago", type: "alert" },
                  { user: "David Brown", action: "Received shipment SH-789", time: "2 hours ago", type: "receiving" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'alert' ? 'bg-destructive' :
                      activity.type === 'order' ? 'bg-success' :
                      activity.type === 'update' ? 'bg-info' : 'bg-warning'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}