import { FC } from 'react';

interface TripEditorProps {
}

export const TripEditor: FC<AboutProps> = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <gmp-map center="40.12150192260742,-100.45039367675781" zoom="4" map-id="DEMO_MAP_ID">
                <gmp-advanced-marker position="40.12150192260742,-100.45039367675781" color="blue" title="My location"></gmp-advanced-marker>
            </gmp-map>

            <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCD01by5y2a8mIKjk9X7DKJX5uu5JiO48M&callback=console.debug&libraries=maps,marker&v=beta">
            </script>

        </div>
    );
};
