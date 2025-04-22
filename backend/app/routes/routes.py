import os
import shutil

import fastapi

from app.config import BASE_DIR
from app.utils.audio import extract_audio, transcribe_audio
from app.utils.ydl import extract_info, extract_audio_yt_video

router = fastapi.APIRouter()


@router.post("/transcribe-video")
async def transcribe_video_file(file: fastapi.UploadFile):
    video_path = os.path.join(BASE_DIR, "video.mp4")
    audio_path = os.path.join(BASE_DIR, "audio.wav")
    with open(video_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    extract_audio(video_path, audio_path)
    res = transcribe_audio(audio_path)

    os.remove(video_path)
    os.remove(audio_path)

    return {"transcription": res}


@router.post("/transcribe-audio")
async def transcribe_audio_file(file: fastapi.UploadFile):
    audio_path = os.path.join(BASE_DIR, "audio.wav")
    with open(audio_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    res = transcribe_audio(audio_path)

    os.remove(audio_path)

    return {"transcription": res}


@router.get("/transcribe-video-youtube")
async def transcribe_video_youtube(url: str):
    audio_path = os.path.join(BASE_DIR, "audio.wav")
    ydl_extract_path = os.path.join(BASE_DIR, "ydl_extract")
    err = extract_audio_yt_video(url, audio_path, ydl_extract_path)
    res = {}
    if (err) == 0:
        extract_audio(ydl_extract_path + ".wav", audio_path)
        res = transcribe_audio(audio_path)

    os.remove(ydl_extract_path + ".wav")
    os.remove(audio_path)

    return {"transcription": res}


@router.get("/extract-video-youtube-info")
async def extract_video_youtube_info(url: str):
    info = extract_info(url)
    res = {
        "title": info["title"],
        "thumbnail": info["thumbnail"],
        "duration": info["duration"],
        "channel": info["uploader"],
        "upload_date": info["upload_date"],
    }
    return res


@router.get("/")
def health_check():
    return {"message": "Woah, where am I?"}
