import os


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")
VOSK_MODEL_DIR = os.path.join(MODELS_DIR, "vosk")
PUNC_MODEL_DIR = os.path.join(MODELS_DIR, "deepmultilingualpunctuation")
VOSK_LOG_LEVEL = 0
