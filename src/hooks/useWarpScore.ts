import { useState, useEffect } from "react";
import { fetchProfile, fetchCasts } from "~/lib/farcaster";

export default function useWarpScore(startCalculation: boolean) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [warpScore, setWarpScore] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!startCalculation) return;
    (async () => {
      try {
        const p = await fetchProfile();
        const casts = await fetchCasts(10);
        const totalEngagement = casts.reduce(
          (sum: number, c: any) => sum + c.likes + c.recasts,
          0,
        );
        const avgEngagement = casts.length
          ? totalEngagement / casts.length
          : 0;
        const ageDays = Math.floor(
          (Date.now() - new Date(p.registeredAt).getTime()) /
            (1000 * 60 * 60 * 24),
        );
        const rawScore =
          avgEngagement * 4 + p.followers * 0.5 + ageDays * 0.25;
        setWarpScore(Math.min(Math.round(rawScore), 10000));
        setProfile(p);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [startCalculation]);

  return { loading, error, profile, warpScore };
}
