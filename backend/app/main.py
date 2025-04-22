import fastapi
import fastapi.middleware.cors
from app.routes import router

app = fastapi.FastAPI(
    docs_url="/api/docs", redoc_url="/api/redoc", openapi_url="/api/openapi.json"
)

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    fastapi.middleware.cors.CORSMiddleware,
    allow_origins=origins,
)


app.include_router(router, prefix="/api")
