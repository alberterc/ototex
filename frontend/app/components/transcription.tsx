import type { TranscriptionProps } from "~/types";
import { formatTime } from "~/utils/time";

export function Transcription({
  data,
  isLoading,
}: {
  data: TranscriptionProps[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="mt-2 bg-black/20 p-3">
        <p>Please wait, the transcription is loading...</p>
      </div>
    );
  } else {
    if (data && data.length !== 0) {
      return (
        <div className="lg:grid lg:grid-cols-2">
          {data.map((item, index) => {
            return index % 2 === 0 ? (
              <div className="mt-2 bg-black/20 p-3 lg:me-2">
                <span className="italic">
                  {formatTime(item.start_time)} - {formatTime(item.end_time)}
                </span>
                <p className="ms-5">{item.sentence}</p>
              </div>
            ) : (
              <div className="mt-2 bg-black/20 p-3 lg:ms-2">
                <span className="italic">
                  {formatTime(item.start_time)} - {formatTime(item.end_time)}
                </span>
                <p className="ms-5">{item.sentence}</p>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="mt-2 bg-black/20 p-3">
          <p>No transcription available.</p>
        </div>
      );
    }
  }
}
