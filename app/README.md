# Setup and Running the App

Run the backend before frontend

## Backend

The server is required for the app but the python side is only required if you plan on generating data with the tool.

### Python (for generating new continuation)

Ensure you have python3 installed and pip is upto date

Windows

```bash
py -m venv .venv
.venv\Scripts\activate
py -m pip install -r requirements.txt
```

Unix/maacOS

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
```

### Server

```bash
cd app
```

```bash
cd backend
npm i
npm run start
```

## Frontend

```bash
cd app
```

```bash
cd frontend
npm i
npm run dev
```

# Extending the tool data

In order to generate more data there are a few key steps.
The first thing to understand is that app/backend/src/data/llm.json contains the default data displayed.

This data was orignialy generate manually in python and added to the file.

With the addition of the generation pipeline it is possible to generate new data for other llms.

## Steps to add a new LLM

1. Add LLM HuggingFace Pipeline to [generateContinuations.py](backend/src/python/generate/generateContinuations.py)

2. Add LLM to the array in the [Generate Page](frontend/src/app/generate/page.tsx)

## Steps to change default data

If you wanted to add a new LLM or larger generation as the default data displayed

1. Generate your data
2. Add or change [llm.json](backend/src/data/llm.json) to include new data
