// components/google-maps-provider.tsx
"use client";

import { LoadScript } from "@react-google-maps/api";

export default function GoogleMapsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDAlzawIymM7mJWwpBeCg-nLU954uZxoVo"
      libraries={["places"]}
    >
      {children}
    </LoadScript>
  );
}
