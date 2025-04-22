import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ototex Dashboard" },
    { name: "description", content: "Find a sentence from a video" },
  ];
}

export default function Index() {
  return (
    <div>
      <h1>Index</h1>
    </div>
  );
}
