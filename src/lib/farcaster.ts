export async function fetchProfile(fid: string) {
  const res = await fetch(
    `https://api.neynar.com/v2/farcaster/profiles?fid=${fid}`,
    {
      headers: { Authorization: `Bearer ${process.env.NEY_NAR_API_KEY}` },
    },
  );
  const data = await res.json();
  return {
    username: data.result.username,
    avatar: data.result.avatar,
    followers: data.result.followerCount,
    registeredAt: data.result.registrationTime,
  };
}

export async function fetchCasts(fid: string, limit = 10) {
  const res = await fetch(
    `https://api.neynar.com/v2/farcaster/casts?fid=${fid}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${process.env.NEY_NAR_API_KEY}` },
    },
  );
  const data = await res.json();
  return data.result.casts.map((c: any) => ({
    likes: c.likeCount,
    recasts: c.recastCount,
  }));
}
