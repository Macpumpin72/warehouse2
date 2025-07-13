// Mock data for the warehouse management system

export interface Product {
  id: string
  sku: string
  name: string
  category: string
  quantity: number
  safetyStock: number
  location: string
  lastUpdated: string
  status: "in_stock" | "low_stock" | "out_of_stock"
  cost: number
  supplier: string
}

export interface Order {
  id: string
  orderNumber: string
  customer: string
  status: "pending" | "processing" | "picking" | "packed" | "shipped" | "delivered"
  items: number
  value: number
  priority: "low" | "medium" | "high"
  orderDate: string
  dueDate: string
  trackingNumber?: string
}

export interface DashboardMetrics {
  inventoryValue: number
  pendingOrders: number
  returnsRate: number
  dockUtilization: number
  dailyMetrics: {
    date: string
    orders: number
    revenue: number
    returns: number
  }[]
}

export const mockProducts: Product[] = [
  {
    id: "1",
    sku: "WH-001",
    name: "Wireless Headphones",
    category: "Electronics",
    quantity: 150,
    safetyStock: 50,
    location: "A1-B2",
    lastUpdated: "2024-01-15T10:30:00Z",
    status: "in_stock",
    cost: 75.00,
    supplier: "Tech Corp"
  },
  {
    id: "2",
    sku: "KB-002",
    name: "Mechanical Keyboard",
    category: "Electronics",
    quantity: 25,
    safetyStock: 30,
    location: "A2-C1",
    lastUpdated: "2024-01-15T09:15:00Z",
    status: "low_stock",
    cost: 120.00,
    supplier: "KeyTech Ltd"
  },
  {
    id: "3",
    sku: "MO-003",
    name: "Gaming Mouse",
    category: "Electronics",
    quantity: 0,
    safetyStock: 20,
    location: "A2-C2",
    lastUpdated: "2024-01-14T16:45:00Z",
    status: "out_of_stock",
    cost: 45.00,
    supplier: "GameGear Inc"
  },
  {
    id: "4",
    sku: "TB-004",
    name: "USB-C Cable",
    category: "Accessories",
    quantity: 500,
    safetyStock: 100,
    location: "B1-A1",
    lastUpdated: "2024-01-15T11:00:00Z",
    status: "in_stock",
    cost: 15.00,
    supplier: "Cable Co"
  },
  {
    id: "5",
    sku: "SP-005",
    name: "Bluetooth Speaker",
    category: "Electronics",
    quantity: 75,
    safetyStock: 25,
    location: "A3-B1",
    lastUpdated: "2024-01-15T08:30:00Z",
    status: "in_stock",
    cost: 85.00,
    supplier: "Audio Systems"
  }
]

export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customer: "John Smith",
    status: "pending",
    items: 3,
    value: 245.00,
    priority: "high",
    orderDate: "2024-01-15T09:00:00Z",
    dueDate: "2024-01-17T17:00:00Z"
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    customer: "Sarah Johnson",
    status: "processing",
    items: 1,
    value: 120.00,
    priority: "medium",
    orderDate: "2024-01-15T10:30:00Z",
    dueDate: "2024-01-18T17:00:00Z"
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    customer: "Mike Brown",
    status: "picking",
    items: 5,
    value: 380.00,
    priority: "low",
    orderDate: "2024-01-14T14:15:00Z",
    dueDate: "2024-01-19T17:00:00Z"
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    customer: "Emily Davis",
    status: "packed",
    items: 2,
    value: 160.00,
    priority: "medium",
    orderDate: "2024-01-14T11:20:00Z",
    dueDate: "2024-01-16T17:00:00Z"
  },
  {
    id: "5",
    orderNumber: "ORD-2024-005",
    customer: "Alex Wilson",
    status: "shipped",
    items: 4,
    value: 295.00,
    priority: "high",
    orderDate: "2024-01-13T16:45:00Z",
    dueDate: "2024-01-15T17:00:00Z",
    trackingNumber: "TRK123456789"
  }
]

export const mockDashboardMetrics: DashboardMetrics = {
  inventoryValue: 125750,
  pendingOrders: 12,
  returnsRate: 3.2,
  dockUtilization: 78,
  dailyMetrics: [
    { date: "2024-01-08", orders: 45, revenue: 12500, returns: 2 },
    { date: "2024-01-09", orders: 52, revenue: 14200, returns: 1 },
    { date: "2024-01-10", orders: 38, revenue: 10800, returns: 3 },
    { date: "2024-01-11", orders: 61, revenue: 16750, returns: 2 },
    { date: "2024-01-12", orders: 48, revenue: 13200, returns: 4 },
    { date: "2024-01-13", orders: 55, revenue: 15100, returns: 1 },
    { date: "2024-01-14", orders: 43, revenue: 11900, returns: 2 },
  ]
}

// Utility functions for API simulation
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount)
}

export const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(dateString))
}

export const getStatusColor = (status: string) => {
  const colors = {
    in_stock: "bg-success/10 text-success border-success/20",
    low_stock: "bg-warning/10 text-warning border-warning/20",
    out_of_stock: "bg-destructive/10 text-destructive border-destructive/20",
    pending: "bg-warning/10 text-warning border-warning/20",
    processing: "bg-info/10 text-info border-info/20",
    picking: "bg-accent/10 text-accent border-accent/20",
    packed: "bg-primary/10 text-primary border-primary/20",
    shipped: "bg-success/10 text-success border-success/20",
    delivered: "bg-muted text-muted-foreground",
    high: "bg-destructive/10 text-destructive border-destructive/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-success/10 text-success border-success/20"
  }
  return colors[status as keyof typeof colors] || colors.low
}