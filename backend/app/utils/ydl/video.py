import yt_dlp


def extract_info(url: str):
    ydl_opts = {"quiet": True}
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
    return info


def extract_audio_yt_video(
    url: str, audio_path: str, ydl_extract_path: str
) -> int | None:
    ydl_opts = {
        "format": "m4a/bestaudio/best",
        "noplaylists": True,
        "outtmpl": ydl_extract_path,
        "quiet": True,
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "wav",
            }
        ],
    }
    err = None
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        err = ydl.download(url)

    return err
