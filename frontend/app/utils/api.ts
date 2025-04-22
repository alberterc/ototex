const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function checkHealth() {
  const res = await fetch(API_URL, {
    method: "GET",
  });
  const data = await res.json();
  return data;
}

export async function transcribeVideo(req: FormData) {
  const res = await fetch(`${API_URL}/transcribe-video`, {
    method: "POST",
    body: req,
  });
  const data = await res.json();
  return data;
}

export async function transcribeAudio(req: FormData) {
  const res = await fetch(`${API_URL}/transcribe-audio`, {
    method: "POST",
    body: req,
  });
  const data = await res.json();
  return data;
}

export async function transcribeVideoYoutube(url: string) {
  const res = await fetch(`${API_URL}/transcribe-video-youtube?url=${url}`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
}

export async function getInfoVideoYoutube(url: string) {
  const res = await fetch(`${API_URL}/extract-video-youtube-info?url=${url}`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
}
