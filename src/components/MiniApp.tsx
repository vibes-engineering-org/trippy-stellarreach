"use client";

import { useFrameSDK } from "~/hooks/useFrameSDK";
import Frame from "~/components/Frame";


export default function MiniApp() {
  const { isSDKLoaded } = useFrameSDK();

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[400px] mx-auto py-2 px-2 space-y-4">
      <Frame />
    </div>
  );
}
