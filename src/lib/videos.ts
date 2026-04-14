export type VideoItem = {
  title: string;
  youtubeUrl: string;
  episode: number;
};

export const videos: VideoItem[] = [
  { title: "Episode 1", youtubeUrl: "https://youtu.be/PwrJGFv8oeo?si=xQRAJQnUdWOQqVmq", episode: 1 },
  { title: "Episode 2", youtubeUrl: "https://youtu.be/2rxZhtrpweE?si=GQEEss344vFfbSKD", episode: 2 },
  { title: "Episode 3", youtubeUrl: "https://youtu.be/sTM-BV_fEAI?si=9Xgc8NVBj58Cxzg7", episode: 3 },
  { title: "Episode 4", youtubeUrl: "https://youtu.be/XSNZpwD_c9g?si=Q1XYx0U8xcA8mSRd", episode: 4 },
  { title: "Episode 5", youtubeUrl: "https://youtu.be/dGFtDvGTKt4?si=89_Bj3Yz-qsPoc_0", episode: 5 },
  { title: "Episode 6", youtubeUrl: "https://youtu.be/vSaAOwzaop8?si=BYoiD82O7ZVN4l4A", episode: 6 },
  { title: "Episode 7", youtubeUrl: "https://youtu.be/GW1wz68pcC8?si=lV9z7GSeTGzSCHOe", episode: 7 },
  { title: "Episode 8", youtubeUrl: "https://youtu.be/yqe2nFh00hk?si=1JFymUCiYJY6oRzp", episode: 8 },
  { title: "Episode 9", youtubeUrl: "https://youtu.be/p054fZtEQO0?si=HuGI-yWEGucv4ngK", episode: 9 },
  { title: "Episode 10", youtubeUrl: "https://youtu.be/m09ily-jMx8?si=1ZhXZm2O1UKMZFrA", episode: 10 },
  { title: "Episode 11", youtubeUrl: "https://youtu.be/sc6FyLkca0E?si=1Q94bhDxgTK13mMn", episode: 11 },
  { title: "Episode 12", youtubeUrl: "https://youtu.be/Tx9wTEdtEiE?si=IzqUEE8WYF79hpis", episode: 12 },
];

export const getYoutubeThumbnail = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
  const id = match?.[1];
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
};
