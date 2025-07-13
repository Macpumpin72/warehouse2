import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  FileText, 
  X, 
  Download, 
  Send, 
  CalendarIcon,
  BarChart3,
  PieChart,
  TrendingUp
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface ReportModalProps {
  onClose: () => void
  reportType: string
}

export function ReportModal({ onClose, reportType }: ReportModalProps) {
  const [formData, setFormData] = useState({
    reportName: "",
    dateFrom: undefined as Date | undefined,
    dateTo: undefined as Date | undefined,
    format: "pdf",
    includeCharts: true,
    includeSummary: true,
    includeDetails: true,
    email: "",
    notes: ""
  })
  const { toast } = useToast()

  const reportTypes = {
    inventory: {
      title: "Inventory Report",
      description: "Generate comprehensive inventory analysis",
      icon: <BarChart3 className="w-5 h-5" />
    },
    orders: {
      title: "Orders Report", 
      description: "Analyze order fulfillment and performance",
      icon: <TrendingUp className="w-5 h-5" />
    },
    analytics: {
      title: "Analytics Report",
      description: "Generate business intelligence insights",
      icon: <PieChart className="w-5 h-5" />
    },
    returns: {
      title: "Returns Report",
      description: "Track return patterns and processing",
      icon: <FileText className="w-5 h-5" />
    }
  }

  const currentReport = reportTypes[reportType as keyof typeof reportTypes] || reportTypes.inventory

  const handleGenerate = () => {
    toast({
      title: "Report generated",
      description: `${currentReport.title} has been generated successfully.`,
    })
    
    // Simulate file download
    const link = document.createElement('a')
    link.href = '#'
    link.download = `${formData.reportName || currentReport.title.toLowerCase().replace(' ', '-')}.${formData.format}`
    link.click()
    
    onClose()
  }

  const handleEmail = () => {
    if (!formData.email) {
      toast({
        title: "Email required",
        description: "Please enter an email address to send the report.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Report sent",
      description: `${currentReport.title} has been sent to ${formData.email}.`,
    })
    onClose()
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentReport.icon}
            <div>
              <CardTitle>{currentReport.title}</CardTitle>
              <CardDescription>{currentReport.description}</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Configuration */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reportName">Report Name</Label>
            <Input
              id="reportName"
              value={formData.reportName}
              onChange={(e) => setFormData(prev => ({ ...prev, reportName: e.target.value }))}
              placeholder={`${currentReport.title} - ${format(new Date(), 'MMM yyyy')}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateFrom ? format(formData.dateFrom, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dateFrom}
                    onSelect={(date) => setFormData(prev => ({ ...prev, dateFrom: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Date To</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateTo ? format(formData.dateTo, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dateTo}
                    onSelect={(date) => setFormData(prev => ({ ...prev, dateTo: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Export Format</Label>
            <Select value={formData.format} onValueChange={(value) => setFormData(prev => ({ ...prev, format: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                <SelectItem value="csv">CSV File</SelectItem>
                <SelectItem value="json">JSON Data</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Report Options */}
        <div className="space-y-4">
          <h4 className="font-medium">Report Options</h4>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeCharts"
                checked={formData.includeCharts}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeCharts: checked as boolean }))}
              />
              <Label htmlFor="includeCharts">Include Charts and Graphs</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeSummary"
                checked={formData.includeSummary}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeSummary: checked as boolean }))}
              />
              <Label htmlFor="includeSummary">Include Executive Summary</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeDetails"
                checked={formData.includeDetails}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeDetails: checked as boolean }))}
              />
              <Label htmlFor="includeDetails">Include Detailed Data</Label>
            </div>
          </div>
        </div>

        {/* Email Options */}
        <div className="space-y-4">
          <h4 className="font-medium">Email Options</h4>
          
          <div className="space-y-2">
            <Label htmlFor="email">Send to Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="recipient@company.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add any notes or special instructions..."
              rows={3}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Report Preview</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>• Report Type: {currentReport.title}</p>
            <p>• Format: {formData.format.toUpperCase()}</p>
            <p>• Date Range: {formData.dateFrom ? format(formData.dateFrom, 'MMM dd') : 'Start'} - {formData.dateTo ? format(formData.dateTo, 'MMM dd, yyyy') : 'End'}</p>
            <p>• Options: {[
              formData.includeCharts && "Charts",
              formData.includeSummary && "Summary", 
              formData.includeDetails && "Details"
            ].filter(Boolean).join(", ")}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          {formData.email && (
            <Button variant="outline" onClick={handleEmail} className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          )}
          <Button onClick={handleGenerate} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}