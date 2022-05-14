from os import getcwd
from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from prettyconf import Configuration
from prettyconf.loaders import EnvFile, Environment
from pydantic import BaseModel
from requests import post

# Load configuration
env_file = f"{getcwd()}/.env"
config = Configuration(loaders=[Environment(), EnvFile(filename=env_file)])

# define the app
app = FastAPI()

# add cors policy to avoid CORS errors
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# get the secret for account from ENV
HCAPTCHA_TOKEN_TEST = "0x0000000000000000000000000000000000000000"
HCAPTCHA_URL = "https://hcaptcha.com/siteverify"

# class of the model for verifying the captcha
class Verification(BaseModel):
    token: str
    secret_key: Optional[str] = HCAPTCHA_TOKEN_TEST


# define the '/alive' endpoint
@app.get("/alive")
async def alive():
    return {"status": "alive"}


# Data to show when the user visits the verify url
@app.post("/verify")
async def verify_item(v: Verification):
    dict_data = v.dict()
    token = dict_data["token"]
    secret_key = (
        dict_data["secret_key"]
        if dict_data["secret_key"] != HCAPTCHA_TOKEN_TEST
        else config(
            "HCAPTCHA_SECRET",
            cast=str,
            default=HCAPTCHA_TOKEN_TEST,
        )
    )
    data = {
        "response": token,
        "secret": secret_key,
    }
    r = post(HCAPTCHA_URL, data=data)
    return r.json()


# Data to show when the user visits the homepage
app.mount("/", StaticFiles(directory="static", html=True), name="static")
