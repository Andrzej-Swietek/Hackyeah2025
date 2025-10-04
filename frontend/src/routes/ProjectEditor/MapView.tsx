import { Card } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"
import Image from "next/image"

export function MapView() {
    return (
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-muted">
            {/* Map placeholder with image */}
            <gmp-map center="40.12150192260742,-100.45039367675781" zoom="4" map-id="DEMO_MAP_ID">
                <gmp-advanced-marker position="40.12150192260742,-100.45039367675781" title="My location"></gmp-advanced-marker>
            </gmp-map>

            <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCD01by5y2a8mIKjk9X7DKJX5uu5JiO48M&callback=console.debug&libraries=maps,marker&v=beta">
            </script>

            {/*<div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />*/}

            {/* Map controls */}
            {/*<div className="absolute right-4 top-4 flex flex-col gap-2">*/}
            {/*    <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-card shadow-lg transition-colors hover:bg-accent">*/}
            {/*        <Navigation className="h-5 w-5 text-foreground" />*/}
            {/*    </button>*/}
            {/*    <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-card shadow-lg transition-colors hover:bg-accent">*/}
            {/*        <span className="text-lg font-semibold text-foreground">+</span>*/}
            {/*    </button>*/}
            {/*    <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-card shadow-lg transition-colors hover:bg-accent">*/}
            {/*        <span className="text-lg font-semibold text-foreground">−</span>*/}
            {/*    </button>*/}
            {/*</div>*/}

            {/*/!* Location cards *!/*/}
            {/*<div className="absolute bottom-4 left-4 right-4 flex gap-3 overflow-x-auto pb-2">*/}
            {/*    <Card className="flex-shrink-0 w-64 p-4 shadow-lg">*/}
            {/*        <div className="flex items-start gap-3">*/}
            {/*            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary">*/}
            {/*                <MapPin className="h-5 w-5 text-primary-foreground" />*/}
            {/*            </div>*/}
            {/*            <div className="flex-1 space-y-1">*/}
            {/*                <h4 className="font-semibold text-sm text-foreground">Eiffel Tower</h4>*/}
            {/*                <p className="text-xs text-muted-foreground">Champ de Mars, Paris</p>*/}
            {/*                <p className="text-xs text-primary font-medium">09:00 AM</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </Card>*/}
            {/*    <Card className="flex-shrink-0 w-64 p-4 shadow-lg">*/}
            {/*        <div className="flex items-start gap-3">*/}
            {/*            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">*/}
            {/*                <MapPin className="h-5 w-5 text-secondary-foreground" />*/}
            {/*            </div>*/}
            {/*            <div className="flex-1 space-y-1">*/}
            {/*                <h4 className="font-semibold text-sm text-foreground">Louvre Museum</h4>*/}
            {/*                <p className="text-xs text-muted-foreground">Rue de Rivoli, Paris</p>*/}
            {/*                <p className="text-xs text-secondary font-medium">02:00 PM</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </Card>*/}
            {/*</div>*/}
        </div>
    )
}
