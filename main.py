from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import uvicorn

app = FastAPI()


app.mount('/frontend', StaticFiles(directory='frontend'), name='frontend')

if __name__ == "__main__":
    uvicorn.run('main:app', host='192.168.0.110', reload=True)
