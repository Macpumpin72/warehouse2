import { useState } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger, 
  DialogTitle, 
  DialogDescription,
  DialogHeader 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AddInventoryForm } from "@/components/forms/AddInventoryForm"
import { AddOrderForm } from "@/components/forms/AddOrderForm"

interface ActionModalProps {
  trigger: React.ReactNode
  children: React.ReactNode
}

export function ActionModal({ trigger, children }: ActionModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Action Modal</DialogTitle>
          <DialogDescription>Perform actions on your data</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export function AddInventoryModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Add a new product to your inventory</DialogDescription>
        </DialogHeader>
        <AddInventoryForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export function AddOrderModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
          <DialogDescription>Create a new order for processing</DialogDescription>
        </DialogHeader>
        <AddOrderForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}