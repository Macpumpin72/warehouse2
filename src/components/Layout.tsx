import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Bell, Search, User, Home, Package, ShoppingCart, Truck, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useNavigate, useLocation } from "react-router-dom"
import { useIsMobile } from "@/hooks/use-mobile"

interface LayoutProps {
  children: React.ReactNode
}

const MobileBottomNav = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/inventory", icon: Package, label: "Inventory" },
    { path: "/orders", icon: ShoppingCart, label: "Orders" },
    { path: "/receiving", icon: Truck, label: "Receiving" },
    { path: "/returns", icon: RotateCcw, label: "Returns" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 p-2 min-h-[48px] rounded-lg transition-colors ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile()
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className={isMobile ? "hidden" : "block"}>
          <AppSidebar />
        </div>
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
            <div className="flex items-center justify-between h-full px-4 md:px-6">
              <div className="flex items-center gap-2 md:gap-4">
                {/* Mobile: Only hamburger, Desktop: Hamburger + Search */}
                <SidebarTrigger className="h-9 w-9" />
                
                {/* Search - Hidden on mobile xs, visible on sm+ */}
                <div className="relative hidden sm:block w-48 md:w-96 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search orders, products, SKUs..." 
                    className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                {/* Mobile: Only essential actions */}
                <Button variant="ghost" size="sm" className="relative min-h-[48px] min-w-[48px] md:min-h-auto md:min-w-auto hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Search className="h-4 w-4 sm:hidden" />
                  <Bell className="h-4 w-4 hidden sm:block" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-orange-500 text-white border-orange-500 sm:-top-2 sm:-right-2 sm:h-5 sm:w-5">
                    3
                  </Badge>
                </Button>
                
                <Button variant="ghost" size="sm" className="min-h-[48px] min-w-[48px] md:min-h-auto md:min-w-auto hover:bg-accent hover:text-accent-foreground transition-colors">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 bg-muted/20 pb-20 md:pb-6">
            {children}
          </main>
        </div>
        
        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
    </SidebarProvider>
  )
}