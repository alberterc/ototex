import { Content } from "~/components/content";
import type { Route } from "./+types/youtube";
import { Transcription } from "~/components/transcription";
import { useState } from "react";
import {
  videoInfoTmpl,
  type TranscriptionProps,
  type VideoInfoProps,
} from "~/types";
import { transcribeVideoYoutube, getInfoVideoYoutube } from "~/utils/api";
import { formatTime } from "~/utils/time";
import { LoadingCircle } from "~/components/loading_circle";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ototex - YouTube" },
    {
      name: "description",
      body: "Find a sentence from a YouTube video",
    },
  ];
}

export default function Youtube() {
  const [ytUrl, setYtUrl] = useState("");
  const [transcription, setTranscription] = useState(Array<TranscriptionProps>);
  const [videoInfo, setVideoInfo] = useState<VideoInfoProps>();
  const [isChecking, setIsChecking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const data = await transcribeVideoYoutube(
        encodeURIComponent(ytUrl),
      ).finally(() => {
        setIsLoading(false);
      });
      setTranscription(data.transcription);
    } catch (e) {
      alert(e);
      setIsLoading(false);
      setTranscription([]);
    }
  };

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsChecking(true);
      const data = await getInfoVideoYoutube(encodeURIComponent(ytUrl));
      setVideoInfo(data);
      setIsChecking(false);
    } catch (e) {
      alert(e);
      setVideoInfo(videoInfoTmpl);
      setIsChecking(false);
    }
  };

  const body = (
    <>
      <section className="mb-7">
        <h2 className="mb-2">URL</h2>
        <span className="mb-1 block text-sm">
          Example: https://youtu.be/dQw4w9WgXcQ or
          https://www.youtube.com/watch?v=dQw4w9WgXcQ
        </span>
        <form onSubmit={handleCheck}>
          <input
            id="youtubeUrl"
            className="w-full bg-gray-50 p-2.5 text-base text-gray-950"
            type="url"
            placeholder="Enter YouTube URL..."
            onChange={(e) => setYtUrl(e.target.value)}
            required
          ></input>
          <button
            className="mt-2 inline-block align-middle"
            disabled={isChecking}
          >
            Check
          </button>
          {isChecking ? (
            <LoadingCircle
              className="ms-2 mt-2 inline-block py-1 align-middle"
              show={true}
            />
          ) : (
            <></>
          )}
        </form>
      </section>
      <section className="mb-7">
        {videoInfo != undefined ? (
          <>
            <div className="sm:flex sm:flex-row sm:items-center">
              <img
                src={
                  videoInfo.thumbnail != "" ? videoInfo.thumbnail : undefined
                }
                width="160"
                height="90"
                alt="video-thumbnail"
              />
              <div className="mt-2 sm:ms-3 sm:mt-0">
                <p className="mb-2 font-bold">
                  <a href={ytUrl}>{videoInfo.title}</a>
                </p>
                <p>{videoInfo.channel}</p>
                <p className="italic">{formatTime(videoInfo.duration)}</p>
              </div>
            </div>
            <button className="mt-2" onClick={handleSubmit}>
              Transcribe
            </button>
          </>
        ) : (
          <></>
        )}
      </section>
      <section>
        <h2 className="mb-2">Transcription</h2>
        <Transcription data={transcription} isLoading={isLoading} />
      </section>
    </>
  );

  return (
    <Content
      title="YouTube URL"
      description="Transcribe the audio of a YouTube video."
      body={body}
    />
  );
}
