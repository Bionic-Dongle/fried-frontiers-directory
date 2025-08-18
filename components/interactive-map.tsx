"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InteractiveMapProps {
  address: string
  businessName: string
  className?: string
}

// Geocoding function to convert address to coordinates
const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    // Using OpenStreetMap Nominatim API for geocoding (free)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
    )
    const data = await response.json()

    if (data && data.length > 0) {
      return {
        lat: Number.parseFloat(data[0].lat),
        lng: Number.parseFloat(data[0].lon),
      }
    }

    // Fallback to Melbourne CBD if geocoding fails
    return { lat: -37.8136, lng: 144.9631 }
  } catch (error) {
    console.error("Geocoding error:", error)
    // Fallback to Melbourne CBD
    return { lat: -37.8136, lng: 144.9631 }
  }
}

export function InteractiveMap({ address, businessName, className = "" }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    let isMounted = true

    const initializeMap = async () => {
      try {
        setIsLoading(true)

        // Get coordinates for the address
        const coords = await geocodeAddress(address)
        if (!isMounted) return

        setCoordinates(coords)

        if (!coords || !mapRef.current) {
          setMapError(true)
          setIsLoading(false)
          return
        }

        // Dynamically import Leaflet to avoid SSR issues
        const L = await import("leaflet")

        // Fix for default markers in Leaflet with Next.js
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        })

        // Initialize the map
        const map = L.map(mapRef.current).setView([coords.lat, coords.lng], 15)

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(map)

        // Add a marker for the business location
        const marker = L.marker([coords.lat, coords.lng]).addTo(map)
        marker
          .bindPopup(`
          <div style="text-align: center; padding: 8px;">
            <strong>${businessName}</strong><br>
            <small>${address}</small>
          </div>
        `)
          .openPopup()

        // Store map instance for cleanup
        mapInstanceRef.current = map

        setIsLoading(false)
      } catch (error) {
        console.error("Map initialization error:", error)
        if (isMounted) {
          setMapError(true)
          setIsLoading(false)
        }
      }
    }

    initializeMap()

    return () => {
      isMounted = false
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [address, businessName])

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn()
    }
  }

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut()
    }
  }

  const handleRecenter = () => {
    if (mapInstanceRef.current && coordinates) {
      mapInstanceRef.current.setView([coordinates.lat, coordinates.lng], 15)
    }
  }

  const openInMaps = () => {
    if (coordinates) {
      const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
      window.open(url, "_blank")
    }
  }

  if (mapError) {
    return (
      <Card className={`${className} bg-card border-border card-enhanced`}>
        <CardHeader>
          <CardTitle className="text-card-foreground">Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center p-4">
              <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-3">Map temporarily unavailable</p>
              <Button variant="outline" size="sm" onClick={openInMaps} className="interactive-element bg-transparent">
                <Navigation className="h-4 w-4 mr-2" />
                Open in Maps
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {/* Load Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />

      <Card className={`${className} bg-card border-border card-enhanced`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-card-foreground">
            Location
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                disabled={isLoading}
                className="interactive-element bg-transparent"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={isLoading}
                className="interactive-element bg-transparent"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRecenter}
                disabled={isLoading}
                className="interactive-element bg-transparent"
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-muted rounded-lg flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">Loading map...</p>
                </div>
              </div>
            )}
            <div
              ref={mapRef}
              className="aspect-square w-full rounded-lg overflow-hidden"
              style={{ minHeight: "300px" }}
            />
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 inline mr-1" />
              Interactive map
            </div>
            <Button variant="outline" size="sm" onClick={openInMaps} className="interactive-element bg-transparent">
              <Navigation className="h-4 w-4 mr-2" />
              Open in Maps
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
