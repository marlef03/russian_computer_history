from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

app = FastAPI()


app.mount('/frontend', StaticFiles(directory='frontend'), name='frontend')
app.mount('/assets', StaticFiles(directory='assets'), name='assets')

if __name__ == "__main__":
    uvicorn.run('main:app', host='192.168.0.110', reload=True)
