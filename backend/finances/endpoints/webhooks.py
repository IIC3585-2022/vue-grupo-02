from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

import finances.crud.links as links_crud
import finances.schemas.accounts as accounts_schemas
from finances import deps
from finances.middleware.webhooks import (
    require_signature_validation,
    require_timestamp_validation,
)
from finances.models.link import Link as LinkModel

router = APIRouter()


@router.post(
    "/account/refreshed",
    dependencies=[
        Depends(require_timestamp_validation),
        Depends(require_signature_validation),
    ],
)
def link_refreshed(
    content: accounts_schemas.AccountRefreshedWebhook,
    db: Session = Depends(deps.get_db),
) -> Response:
    link = links_crud.get_by_fintoc_id(db, content.data.refreshed_object_id)
    links_crud.refreshed(db, link)
    return Response(status_code=200)
