FROM divideprojects/docker-python-base:latest AS build
RUN /venv/bin/poetry export -f requirements.txt --without-hashes --output requirements.txt
RUN /venv/bin/pip install --disable-pip-version-check -r /requirements.txt
ENV FASTAPI_ENV=production
WORKDIR /app
COPY . .
ENTRYPOINT ["/venv/bin/uvicorn"]
CMD ["app:app", "--host", "0.0.0.0", "--port", "80", "--proxy-headers"]
