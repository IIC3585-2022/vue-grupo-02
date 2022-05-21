from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

import finances.crud.links as links_crud
import finances.schemas.link as link_schemas
from finances import deps
from finances.middleware.webhooks import (
    require_signature_validation,
    require_timestamp_validation,
)
from finances.models.link import Link as LinkModel

router = APIRouter()


@router.post(
    "/links/refreshed",
    dependencies=[
        Depends(require_timestamp_validation),
        Depends(require_signature_validation),
    ],
)
def link_refreshed(
    content: link_schemas.LinkRefreshedWebhook,
    db: Session = Depends(deps.get_db),
) -> Response:
    link = links_crud.get_by_fintoc_id(db, content.data.refreshed_object_id)
    links_crud.refreshed(db, link)
    return Response(status_code=200)
