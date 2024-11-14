// "use client";

// import L from "leaflet";

// import "leaflet/dist/leaflet.css";
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// import { MapContainer, Marker, TileLayer } from "react-leaflet";

// // @ts-ignore
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: markerIcon.src,
//   iconRetinaUrl: markerIcon2x.src,
//   shadowUrl: markerShadow.src,
// });

// interface MapProps {
//   center?: number[];
// }

// const Map: React.FC<MapProps> = ({ center }) => {
//   return (
//     <MapContainer
//       center={(center as L.LatLngExpression) || [51, -0.09]}
//       zoom={center ? 4 : 2}
//       scrollWheelZoom={false}
//       className="h-[35vh] rounded-lg"
//     >
//       <TileLayer
//         // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {center && (
//         <Marker
//             position={center as L.LatLngExpression}
//         />

//       )}
//     </MapContainer>
//   );
// };

// export default Map;



"use client";

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

interface MapProps {
  center?: number[];
}

const Map: React.FC<MapProps> = ({ center }) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configure default icon
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon.src,
      iconRetinaUrl: markerIcon2x.src,
      shadowUrl: markerShadow.src,
    });

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Generate unique ID for map container
  const mapId = `map-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div 
      ref={containerRef}
      id={mapId} 
      className="h-[35vh] relative rounded-lg overflow-hidden"
    >
      <MapContainer
        ref={mapRef}
        center={(center as L.LatLngExpression) || [51, -0.09]}
        zoom={center ? 4 : 2}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {center && (
          <Marker position={center as L.LatLngExpression} />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;