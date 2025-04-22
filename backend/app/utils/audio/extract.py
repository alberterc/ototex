import os


def extract_audio(file_path: str, audio_path: str):
    _ = os.system(
        f'ffmpeg -v error -i "{file_path}" -ac 1 -ar 16000 -acodec pcm_s16le "{audio_path}" -y'
    )
