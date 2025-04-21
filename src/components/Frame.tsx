import React, { useEffect, useState } from "react";
import { useFrameSDK } from "~/hooks/useFrameSDK";
import useWarpScore from "~/hooks/useWarpScore";
import WarpSequence from "./WarpSequence";
import ScoreCard from "./ScoreCard";

export default function Frame() {
  const { isSDKLoaded } = useFrameSDK();
  const [started, setStarted] = useState(false);
  const { loading, error, profile, warpScore } = useWarpScore(started);

  // kick off the warp on frame load
  useEffect(() => {
    if (isSDKLoaded) {
      setStarted(true);
    }
  }, [isSDKLoaded]);

  if (!started) {
    return null;
  }
  if (loading) {
    return <WarpSequence />;
  }
  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }
  return <ScoreCard profile={profile} warpScore={warpScore} />;
}
