import { FC, useState, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';

interface MarkerData {
    lat: number;
    lng: number;
    background: string;
    borderColor: string;
    glyphColor: string;
    name: string;
    description: string;
}

interface MapViewProps {
    center: { lat: number; lng: number };
    zoom: number;
    markers: MarkerData[];
}

export const MapView: FC<MapViewProps> = ({ center, zoom, markers }) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

    return (
        <APIProvider apiKey={apiKey}>
            <Map
                mapId="DEMO_MAP_ID"
                defaultCenter={center}
                defaultZoom={zoom}
                style={{ width: '100%', height: '100%' }}
            >
                {markers.map((marker, idx) => {
                    const [markerRef, markerAnchor] = useAdvancedMarkerRef();
                    const [infoWindowShown, setInfoWindowShown] = useState(false);

                    const handleMarkerClick = useCallback(() => setInfoWindowShown(s => !s), []);
                    const handleClose = useCallback(() => setInfoWindowShown(false), []);

                    return (
                        <div key={idx}>
                            <AdvancedMarker
                                ref={markerRef}
                                position={{ lat: marker.lat, lng: marker.lng }}
                                onClick={handleMarkerClick}
                            >
                                <Pin
                                    background={marker.background}
                                    borderColor={marker.borderColor}
                                    glyphColor={marker.glyphColor}
                                />
                            </AdvancedMarker>

                            {infoWindowShown && markerAnchor && (
                                <InfoWindow anchor={markerAnchor} onClose={handleClose}>
                                    <div>
                                        <h2>{marker.name}</h2>
                                        <p>{marker.description}</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </div>
                    );
                })}
            </Map>
        </APIProvider>
    );
};