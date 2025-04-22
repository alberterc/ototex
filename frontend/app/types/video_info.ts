export interface VideoInfoProps {
  title: string;
  thumbnail: string;
  duration: number;
  channel: string;
  upload_date: string;
}

export function videoInfoTmpl() {
  return {
    title: "",
    thumbnail: "",
    duration: 0,
    channel: "",
    upload_date: "",
  };
}
