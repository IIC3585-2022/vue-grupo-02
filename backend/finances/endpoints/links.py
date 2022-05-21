from typing import List

from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

import finances.crud.links as links_crud
import finances.schemas.link as link_schemas
from finances import deps
from finances.models.link import Link as LinkModel

router = APIRouter()


@router.post("")
def create_link(
    link: link_schemas.LinkCreation,
    db: Session = Depends(deps.get_db),
) -> Response:
    links_crud.create(db, link)
    return Response(status_code=200)


@router.get("/{fintoc_id}", response_model=link_schemas.LinkResponse)
def get_link(
    fintoc_id: str,
    db: Session = Depends(deps.get_db),
) -> LinkModel:
    return links_crud.get_by_fintoc_id(db, fintoc_id)


# @router.post("/intents", response_model=payment_schemas.PaymentCreationResponse)
# def create_payment_intent(
#     payment: payment_schemas.PaymentCreation,
#     db: Session = Depends(deps.get_db),
# ) -> payment_schemas.PaymentCreationResponse:
#     widget_token = payments_crud.create(db, payment)
#     return payment_schemas.PaymentCreationResponse(widget_token=widget_token)


# @router.get("/accepted", response_model=List[payment_schemas.PaymentResponse])
# def list_accepted_payments(db: Session = Depends(deps.get_db)) -> List[PaymentModel]:
#     return payments_crud.list_accepted(db)
