from dotenv import (load_dotenv)

load_dotenv()

from fastapi import (
    FastAPI
)

from routes.upload import (
    router as upload_router
)

from routes.chat import (
    router as chat_router
)

app = FastAPI(
    title="RAG API",
     redirect_slashes=False 
)


from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)
app.include_router(
    upload_router,
    prefix="/api"
)

app.include_router(
    chat_router,
    prefix="/api"
)


@app.get("/")
def home():

    return {
        "message":
        "RAG API Running"
    }