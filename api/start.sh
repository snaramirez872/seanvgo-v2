#!/bin/bash

# exit if any command fails
set -e

# start Uvicorn with FastAPI
uvicorn app.main:app --host 0.0.0.0 --port $PORT