import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Camera, 
  X, 
  RotateCcw, 
  Download,
  Trash2,
  Save
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PhotoCaptureModalProps {
  onClose: () => void
  title: string
  description: string
}

interface CapturedPhoto {
  id: string
  dataUrl: string
  timestamp: Date
}

export function PhotoCaptureModal({ onClose, title, description }: PhotoCaptureModalProps) {
  const [photos, setPhotos] = useState<CapturedPhoto[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      })
      setStream(mediaStream)
      setIsStreaming(true)
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      })
    }
  }, [toast])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
      setIsStreaming(false)
    }
  }, [stream])

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (!context) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0)

    const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
    const newPhoto: CapturedPhoto = {
      id: Math.random().toString(36).substr(2, 9),
      dataUrl,
      timestamp: new Date()
    }

    setPhotos(prev => [...prev, newPhoto])
    
    toast({
      title: "Photo captured",
      description: "Photo has been captured successfully.",
    })
  }, [toast])

  const deletePhoto = (photoId: string) => {
    setPhotos(prev => prev.filter(p => p.id !== photoId))
  }

  const downloadPhoto = (photo: CapturedPhoto) => {
    const link = document.createElement('a')
    link.href = photo.dataUrl
    link.download = `photo-${photo.timestamp.toISOString().split('T')[0]}-${photo.id}.jpg`
    link.click()
  }

  const savePhotos = () => {
    toast({
      title: "Photos saved",
      description: `${photos.length} photo(s) have been saved successfully.`,
    })
    onClose()
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { stopCamera(); onClose(); }}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Camera Section */}
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
              {isStreaming ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Camera not active</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              {!isStreaming ? (
                <Button onClick={startCamera} className="flex-1">
                  <Camera className="w-4 h-4 mr-2" />
                  Start Camera
                </Button>
              ) : (
                <>
                  <Button onClick={capturePhoto} className="flex-1">
                    <Camera className="w-4 h-4 mr-2" />
                    Capture Photo
                  </Button>
                  <Button variant="outline" onClick={stopCamera}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Photos Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Captured Photos ({photos.length})</h4>
              {photos.length > 0 && (
                <Badge variant="outline">{photos.length} photos</Badge>
              )}
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {photos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Camera className="w-8 h-8 mx-auto mb-2" />
                  <p>No photos captured yet</p>
                </div>
              ) : (
                photos.map((photo) => (
                  <div key={photo.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <img 
                      src={photo.dataUrl} 
                      alt="Captured" 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Photo {photo.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {photo.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => downloadPhoto(photo)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deletePhoto(photo.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => { stopCamera(); onClose(); }} className="flex-1">
            Cancel
          </Button>
          <Button onClick={savePhotos} disabled={photos.length === 0} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save {photos.length} Photos
          </Button>
        </div>

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  )
}