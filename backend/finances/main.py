from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from finances.config import settings
from finances.database import engine
from finances.endpoints.accounts import router as accounts_router
from finances.endpoints.links import router as links_router
from finances.endpoints.webhooks import router as webhooks_router
from finances.endpoints.shared import router as shared_router
from finances.shared.models import BaseModel

BaseModel.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(links_router, prefix="/links", tags=["Links"])
app.include_router(
    accounts_router,
    prefix="/links/{fintoc_id}/accounts",
    tags=["Accounts"],
)
app.include_router(webhooks_router, prefix="/webhooks", tags=["Webhooks"])
app.include_router(shared_router, tags=["Shared"])
