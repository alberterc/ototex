import { Content } from "~/components/content";
import { Transcription } from "~/components/transcription";
import { useState } from "react";
import { transcribeVideo } from "~/utils/api";
import type { Route } from "./+types/video";
import type { TranscriptionProps } from "~/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ototex - Video" },
    {
      name: "description",
      content: "Find a sentence from a video file",
    },
  ];
}

export default function Video() {
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [response, setResponse] = useState(Array<TranscriptionProps>);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const resetFileInput = () => {
    setSelectedFile(null);
    const form = document.getElementById("videoFileForm") as HTMLFormElement;
    form.reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    resetFileInput();

    try {
      setIsLoading(true);
      const data = await transcribeVideo(formData).finally(() => {
        setIsLoading(false);
      });
      setResponse(data.transcription);
    } catch (e) {
      setIsLoading(false);
      setResponse([]);
    }
  };

  const body = (
    <>
      <section className="mb-7">
        <h2 className="mb-2">Video File</h2>
        <form onSubmit={handleSubmit} id="videoFileForm">
          <div className="border-lavender-pinocchio/50 relative w-fit max-w-full min-w-3xs cursor-pointer border-2 border-dashed p-3 text-center">
            <p>{selectedFile?.name || "Click to upload"}</p>
            <input
              type="file"
              accept="video/*"
              className="absolute top-0 right-0 bottom-0 left-0 block h-full w-full cursor-pointer text-base opacity-0"
              onChange={handleFileChange}
            ></input>
          </div>
          <button className="mt-2" disabled={!selectedFile}>
            Transcribe
          </button>
        </form>
      </section>
      <section>
        <h2 className="mb-2">Transcription</h2>
        <Transcription data={response} isLoading={isLoading} />
      </section>
    </>
  );

  return (
    <>
      <Content
        title="Video"
        description="Transcribe the audio of a video file."
        body={body}
      />
    </>
  );
}
