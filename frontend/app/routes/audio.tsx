import { useState } from "react";
import type { Route } from "./+types/audio";
import type { TranscriptionProps } from "~/types";
import { transcribeAudio } from "~/utils/api";
import { Transcription } from "~/components/transcription";
import { Content } from "~/components/content";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ototex - Audio" },
    {
      name: "description",
      content: "Find a sentence from an audio file",
    },
  ];
}

export default function Audio() {
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
    const form = document.getElementById("audioFileForm") as HTMLFormElement;
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
      const data = await transcribeAudio(formData).finally(() => {
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
        <h2 className="mb-2">Audio File</h2>
        <form onSubmit={handleSubmit} id="audioFileForm">
          <div className="border-lavender-pinocchio/50 relative w-fit max-w-full min-w-3xs cursor-pointer border-2 border-dashed p-3 text-center">
            <p>{selectedFile?.name || "Click to upload"}</p>
            <input
              type="file"
              accept="audio/*"
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
        title="Audio"
        description="Transcribe the audio of an audio file."
        body={body}
      />
    </>
  );
}
