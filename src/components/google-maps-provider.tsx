// components/google-maps-provider.tsx
"use client";

import { LoadScript } from "@react-google-maps/api";
import { Landmark } from "lucide-react";
import Image from "next/image";

export default function GoogleMapsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadScript
      googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
      libraries={["places"]}
      loadingElement={
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="relative flex items-center justify-center">
            {/* Spinner */}
            <div className="w-30 h-30 border-3 border-gray-300 border-t-primary rounded-full animate-spin"></div>

            {/* Bank Icon in the center */}
            <Image
              src="/NaBank-Icon.png"
              alt="icon"
              width={50}
              height={50}
              className="absolute"
            />
          </div>
        </div>
      }
    >
      {children}
    </LoadScript>
  );
}
