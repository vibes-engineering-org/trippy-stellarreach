export async function fetchProfile() {
  const res = await fetch(
    "https://api.neynar.com/v2/farcaster/profiles",
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

export async function fetchCasts(limit = 10) {
  const res = await fetch(
    `https://api.neynar.com/v2/farcaster/casts?limit=${limit}`,
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
