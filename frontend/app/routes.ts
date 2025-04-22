import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("youtube", "routes/youtube.tsx"),
  route("video", "routes/video.tsx"),
  route("audio", "routes/audio.tsx"),
] satisfies RouteConfig;
