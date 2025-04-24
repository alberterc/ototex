# Ototex - Backend

Backend for the Ototex website built with FastAPI in Python.

## Setup

Need a "models" directory to store the models used by vosk and deepmultilingualpunctuation.

1. Create a "models" directory inside the "app" directory.
2. Store the vosk and deepmultilingualpunctuation models inside their respective directories named after themselves.
3. Correct directory structure:

```
backend/
├─ app/
│  ├─ models/
│  │  ├─ deepmultilingualpunctuation/
│  │  │  └─ (the model files)
│  │  └─ vosk/
│  │     └─ (the model files)
│  ├─ routes/
│  ├─ schemas/
...
```

_See [config.py](app/config.py) to check and customize the "models" directory._

## Development

### Dependencies installation

Create a Python virtual environment

```bash
python -m venv venv
```

Install dependencies

```bash
pip install -r requirements.txt
```

### Start development server

```bash
fastapi dev .\app\main.py
```

## Production

### Dependencies installation

Refer to the previous [Development](#development) section for dependencies installation.

### Start production server manually

```bash
fastapi run .\app\main.py
```

<details>
  <summary>
    <h2><code>[Click to show]</code> Tech Stack</h2>
  </summary>

1. [Deep multilingual punctuation](https://github.com/oliverguhr/deepmultilingualpunctuation) - This python library predicts the punctuation of English, Italian, French and German texts.
2. [FastAPI](https://github.com/fastapi/fastapi) - FastAPI is a modern, fast (high-performance), web framework for building APIs with Python based on standard Python type hints.
3. [NLTK](https://www.nltk.org/) - NLTK is a leading platform for building Python programs to work with human language data.
4. [Pydantic](https://docs.pydantic.dev/latest/) - Pydantic is the most widely used data validation library for Python.
5. [Vosk](https://alphacephei.com/vosk/) - Vosk is a speech recognition toolkit.
6. [yt-dlp](https://github.com/yt-dlp/yt-dlp) - yt-dlp is a feature-rich command-line audio/video downloader with support for thousands of sites.

</details>
