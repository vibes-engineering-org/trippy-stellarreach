import { useState, useEffect } from "react";
import { useFrameSDK } from "~/hooks/useFrameSDK";

export default function useWarpScore(startCalculation: boolean) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [warpScore, setWarpScore] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const { context } = useFrameSDK();
  const fid = (context as any)?.fid;

  useEffect(() => {
    if (!startCalculation || !fid) return;
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`/api/warpscore?fid=${fid}`);
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText);
        }
        const { profile, warpScore } = await res.json();
        setProfile(profile);
        setWarpScore(warpScore);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [startCalculation, fid]);

  return { loading, error, profile, warpScore };
}
