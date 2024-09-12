# Setup and Running the App

Run the backend before frontend

## Backend

The server is required for the app but the python side is only required if you plan on generating data with the tool.

### Server

```bash
cd backend
npm i
npm run start
```

### Python (for generating new continuation)

Ensure you have python3 installed

## Frontend

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

## Steps
