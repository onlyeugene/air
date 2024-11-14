"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("../components/map"), {
  ssr: false,
  loading: () => (
    <div className="h-[35vh] flex items-center justify-center bg-gray-100 rounded-lg">
      <div>Loading Map...</div>
    </div>
  ),
});

interface MapProps {
  center?: number[];
}

const Map: React.FC<MapProps> = ({ center }) => {
  return <LeafletMap center={center} />;
};

export default Map;