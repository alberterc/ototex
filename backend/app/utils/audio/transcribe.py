import json
import os
import wave

import deepmultilingualpunctuation
import fastapi
import nltk
import vosk

from app.config import PUNC_MODEL_DIR, VOSK_MODEL_DIR
from app.schemas.transcription import TranscriptionData, WordData


def add_punctuation(text: str) -> str:
    model = deepmultilingualpunctuation.PunctuationModel(model=PUNC_MODEL_DIR)
    return model.restore_punctuation(text)


def get_sentences(words: list[WordData]):
    full_text = " ".join([w.word for w in words])
    full_text = add_punctuation(full_text)
    return nltk.sent_tokenize(full_text)


def get_words(audio_path: str) -> list[WordData]:
    model_path = VOSK_MODEL_DIR
    if not os.path.exists(model_path):
        raise fastapi.HTTPException(status_code=500, detail="Vosk model not found")

    vosk.SetLogLevel(-1)

    model = vosk.Model(model_path)

    with wave.open(audio_path, "rb") as wf:
        if (
            wf.getnchannels() != 1
            or wf.getsampwidth() != 2
            or wf.getframerate() != 16000
            or wf.getcomptype() != "NONE"
        ):
            raise fastapi.HTTPException(
                status_code=400,
                detail="Audio file must be WAV format with 16-bit PCM mono audio and 16kHz sample rate.",
            )

        rec = vosk.KaldiRecognizer(model, wf.getframerate())
        rec.SetWords(True)

        res: list[WordData] = []
        while True:
            data = wf.readframes(4000)
            if len(data) == 0:
                break
            if rec.AcceptWaveform(data):
                rec_result = json.loads(rec.Result())
                if "result" in rec_result:
                    res.extend(WordData(**item) for item in rec_result["result"])

        rec_final_result = json.loads(rec.FinalResult())
        if "result" in rec_final_result:
            res.extend(WordData(**item) for item in rec_final_result["result"])

    return res


def transcribe_audio(audio_path: str) -> list[TranscriptionData]:
    words: list[WordData] = get_words(audio_path)
    sentences = get_sentences(words)

    transcription: list[TranscriptionData] = []
    for sentence in sentences:
        sentence_words = sentence.split()
        sentence_words_len = len(sentence_words)

        start_time = words[0].start
        end_time = words[sentence_words_len - 1].end

        transcription.append(
            TranscriptionData(
                sentence=sentence,
                start_time=start_time,
                end_time=end_time,
                words=[word for word in words if start_time <= word.start <= end_time],
            )
        )

        del words[:sentence_words_len]

    return transcription
