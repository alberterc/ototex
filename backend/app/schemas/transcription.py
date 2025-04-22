from pydantic import BaseModel


class WordData(BaseModel):
    word: str
    start: float
    end: float
    conf: float


class TranscriptionData(BaseModel):
    sentence: str
    start_time: float
    end_time: float
    words: list[WordData]
