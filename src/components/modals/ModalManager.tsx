import { useState, createContext, useContext, ReactNode } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { QuickAddInventoryForm, ProcessOrdersForm, ReceiveItemsForm, HandleReturnsForm } from "@/components/forms/QuickActionForms"
import { AddInventoryForm } from "@/components/forms/AddInventoryForm"
import { AddOrderForm } from "@/components/forms/AddOrderForm"
import { StorageRequestForm } from "@/components/forms/StorageRequestForm"
import { FileUploadModal } from "@/components/modals/FileUploadModal"
import { PhotoCaptureModal } from "@/components/modals/PhotoCaptureModal"
import { ReportModal } from "@/components/modals/ReportModal"

type ModalType = 
  | 'quick-add-inventory'
  | 'process-orders'
  | 'receive-items'
  | 'handle-returns'
  | 'add-inventory'
  | 'add-order'
  | 'storage-request'
  | 'file-upload'
  | 'photo-capture'
  | 'report'

interface ModalConfig {
  type: ModalType
  props?: any
}

interface ModalContextType {
  openModal: (type: ModalType, props?: any) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [currentModal, setCurrentModal] = useState<ModalConfig | null>(null)

  const getModalTitle = (type: ModalType, props?: any): string => {
    switch (type) {
      case 'quick-add-inventory':
        return 'Quick Add Inventory'
      case 'process-orders':
        return 'Process Orders'
      case 'receive-items':
        return 'Receive Items'
      case 'handle-returns':
        return 'Handle Returns'
      case 'add-inventory':
        return 'Add Inventory'
      case 'add-order':
        return 'Add Order'
      case 'storage-request':
        return 'Storage Request'
      case 'file-upload':
        return props?.title || 'Upload Files'
      case 'photo-capture':
        return props?.title || 'Capture Photos'
      case 'report':
        return 'Generate Report'
      default:
        return 'Modal'
    }
  }

  const getModalDescription = (type: ModalType, props?: any): string => {
    switch (type) {
      case 'quick-add-inventory':
        return 'Quickly add new inventory items to your warehouse'
      case 'process-orders':
        return 'Process and manage customer orders'
      case 'receive-items':
        return 'Record received items and update inventory'
      case 'handle-returns':
        return 'Process customer returns and refunds'
      case 'add-inventory':
        return 'Add detailed inventory information'
      case 'add-order':
        return 'Create a new customer order'
      case 'storage-request':
        return 'Request additional storage space'
      case 'file-upload':
        return props?.description || 'Upload documents and files'
      case 'photo-capture':
        return props?.description || 'Take photos for documentation'
      case 'report':
        return 'Generate and download reports'
      default:
        return 'Modal dialog'
    }
  }

  const openModal = (type: ModalType, props?: any) => {
    setCurrentModal({ type, props })
  }

  const closeModal = () => {
    setCurrentModal(null)
  }

  const renderModal = () => {
    if (!currentModal) return null

    const { type, props } = currentModal

    switch (type) {
      case 'quick-add-inventory':
        return <QuickAddInventoryForm onClose={closeModal} />
      
      case 'process-orders':
        return <ProcessOrdersForm onClose={closeModal} />
      
      case 'receive-items':
        return <ReceiveItemsForm onClose={closeModal} />
      
      case 'handle-returns':
        return <HandleReturnsForm onClose={closeModal} />
      
      case 'add-inventory':
        return <AddInventoryForm onClose={closeModal} />
      
      case 'add-order':
        return <AddOrderForm onClose={closeModal} />
      
      case 'storage-request':
        return (
          <StorageRequestForm 
            onSubmit={(data) => {
              console.log('Storage request:', data)
              closeModal()
            }}
            onClose={closeModal}
          />
        )
      
      case 'file-upload':
        return (
          <FileUploadModal
            onClose={closeModal}
            title={props?.title || "Upload Files"}
            description={props?.description || "Upload documents and files"}
            acceptedTypes={props?.acceptedTypes}
            maxFiles={props?.maxFiles}
          />
        )
      
      case 'photo-capture':
        return (
          <PhotoCaptureModal
            onClose={closeModal}
            title={props?.title || "Capture Photos"}
            description={props?.description || "Take photos for documentation"}
          />
        )
      
      case 'report':
        return (
          <ReportModal
            onClose={closeModal}
            reportType={props?.reportType || 'inventory'}
          />
        )
      
      default:
        return null
    }
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Dialog open={!!currentModal} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-fit max-h-[90vh] overflow-y-auto p-0 border-0 bg-transparent shadow-none">
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle>
                {currentModal ? getModalTitle(currentModal.type, currentModal.props) : 'Modal'}
              </DialogTitle>
            </VisuallyHidden>
            <VisuallyHidden>
              <DialogDescription>
                {currentModal ? getModalDescription(currentModal.type, currentModal.props) : 'Modal dialog'}
              </DialogDescription>
            </VisuallyHidden>
          </DialogHeader>
          {renderModal()}
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}