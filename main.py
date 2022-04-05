from os import getcwd
from typing import Optional

from fastapi import FastAPI
from prettyconf import Configuration
from prettyconf.loaders import EnvFile, Environment
from pydantic import BaseModel
from requests import post

# Load configuration
env_file = f"{getcwd()}/.env"
config = Configuration(loaders=[Environment(), EnvFile(filename=env_file)])

# define the app
app = FastAPI()

# get the secret for account from ENV
HCAPTCHA_SECRET = config(
    "HCAPTCHA_SECRET",
    cast=str,
    default="0x0000000000000000000000000000000000000000",
)
HCAPTCHA_URL = "https://hcaptcha.com/siteverify"

# class of the model for verifying the captcha
class Verification(BaseModel):
    token: str
    secret_key: Optional[str] = HCAPTCHA_SECRET


# Data to show when the user visits the homepage
@app.get("/")
def read_root():
    return "Hi, this is a simple API used to verify the status of a hcaptcha verification token"


# Data to show when the user visits the verify url
@app.post("/verify")
def read_item(v: Verification):
    dict_data = v.dict()
    data = {
        "response": dict_data["token"],
        "secret": dict_data["secret_key"],
    }
    r = post("https://hcaptcha.com/siteverify", data=data)
    return r.json()
