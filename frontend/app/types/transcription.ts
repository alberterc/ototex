export interface TranscriptionProps {
  sentence: string;
  start_time: number;
  end_time: number;
  words: { word: string; start: number; end: number; conf: number }[];
}
