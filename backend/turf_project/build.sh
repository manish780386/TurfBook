#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python backend/turf_project/manage.py collectstatic --no-input
python backend/turf_project/manage.py migrate
python backend/turf_project/manage.py createsu   