import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface StorageRequestFormProps {
  onSubmit: (data: any) => void
  onClose: () => void
}

export function StorageRequestForm({ onSubmit, onClose }: StorageRequestFormProps) {
  const [formData, setFormData] = useState({
    storageType: "",
    itemName: "",
    productId: "",
    quantity: "",
    arrivalDate: undefined as Date | undefined,
    durationDays: "",
    spaceRequired: "",
    specialHandling: false,
    requirement: "",
    additionalNotes: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>New storage request</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storageType">Storage type</Label>
                <Select 
                  value={formData.storageType} 
                  onValueChange={(value) => setFormData({...formData, storageType: value})}
                >
                  <SelectTrigger className="hover:border-primary transition-colors">
                    <SelectValue placeholder="Shelves" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shelves">Shelves</SelectItem>
                    <SelectItem value="floor">Floor Storage</SelectItem>
                    <SelectItem value="cold">Cold Storage</SelectItem>
                    <SelectItem value="hazardous">Hazardous Materials</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="itemName">Item name</Label>
                <Input
                  id="itemName"
                  placeholder="Shirt packets"
                  value={formData.itemName}
                  onChange={(e) => setFormData({...formData, itemName: e.target.value})}
                  className="hover:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productId">Product ID</Label>
                <Input
                  id="productId"
                  placeholder="30639KHF"
                  value={formData.productId}
                  onChange={(e) => setFormData({...formData, productId: e.target.value})}
                  className="hover:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  placeholder="50"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="hover:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label>Date of arrival to warehouse</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal hover:border-primary transition-colors",
                        !formData.arrivalDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.arrivalDate ? format(formData.arrivalDate, "PPP") : "25 Mar 2025"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.arrivalDate}
                      onSelect={(date) => setFormData({...formData, arrivalDate: date})}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="durationDays">Duration (Days)</Label>
                <Input
                  id="durationDays"
                  placeholder="20"
                  value={formData.durationDays}
                  onChange={(e) => setFormData({...formData, durationDays: e.target.value})}
                  className="hover:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="spaceRequired">Space required</Label>
                <div className="flex gap-2">
                  <Input
                    id="spaceRequired"
                    placeholder="30"
                    value={formData.spaceRequired}
                    onChange={(e) => setFormData({...formData, spaceRequired: e.target.value})}
                    className="hover:border-primary transition-colors"
                  />
                  <span className="flex items-center text-sm text-muted-foreground">m²</span>
                  <span className="flex items-center text-sm text-muted-foreground">Available: 80m²</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="specialHandling"
                checked={formData.specialHandling}
                onCheckedChange={(checked) => setFormData({...formData, specialHandling: checked as boolean})}
              />
              <Label htmlFor="specialHandling">Special handling requirements</Label>
            </div>

            {formData.specialHandling && (
              <div className="space-y-2">
                <Label htmlFor="requirement">Requirement</Label>
                <Select 
                  value={formData.requirement} 
                  onValueChange={(value) => setFormData({...formData, requirement: value})}
                >
                  <SelectTrigger className="hover:border-primary transition-colors">
                    <SelectValue placeholder="Fragile" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fragile">Fragile</SelectItem>
                    <SelectItem value="temperature-controlled">Temperature Controlled</SelectItem>
                    <SelectItem value="hazardous">Hazardous Materials</SelectItem>
                    <SelectItem value="high-value">High Value Items</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional notes</Label>
              <Textarea
                id="additionalNotes"
                placeholder="Any additional information..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                rows={3}
                className="hover:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose} className="hover:bg-accent hover:text-accent-foreground transition-colors">
              Cancel
            </Button>
            <Button type="submit" className="hover:bg-primary/90 transition-colors">
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}