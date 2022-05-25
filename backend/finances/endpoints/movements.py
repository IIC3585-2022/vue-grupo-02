from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import finances.crud.links as links_crud
from finances import deps
from finances.shared.initializers import FINTOC_CLIENT
from finances.schemas.movements import (
    MovementsRequest as MovementsRequestSchema,
    MovementsResponse as MovementsResponseSchema,
)

router = APIRouter()


def format_movement(movement):
    serialized_mov = movement.serialize()
    return {
        "amount": abs(serialized_mov["amount"]),
        "post_date": movement.post_date.strftime("%m-%d"),
        "description": serialized_mov["description"],
        "recipient_account": serialized_mov["recipient_account"],
        "sender_account": serialized_mov["sender_account"],
        "comment": serialized_mov["comment"],
    }


@router.post("", response_model=MovementsResponseSchema)
def get_account_movements(
    fintoc_id: str,
    movements_schema: MovementsRequestSchema,
    db: Session = Depends(deps.get_db),
) -> MovementsResponseSchema:
    database_link = links_crud.get_by_fintoc_id(db, fintoc_id)
    link = FINTOC_CLIENT.links.get(database_link.fintoc_token)
    inbound_acc = link.accounts.get(movements_schema.inbound_account_id)
    outbound_acc = link.accounts.get(movements_schema.outbound_account_id)

    inbound = list(map(format_movement, filter(
        lambda y: y.amount > 0,
        inbound_acc.movements.all(since="2022-01-01"),
    )))

    outbound = list(map(format_movement, filter(
        lambda y: y.amount < 0,
        outbound_acc.movements.all(since="2022-01-01"),
    )))

    links_crud.delete(db, database_link)

    return MovementsResponseSchema(
        inbound_movements=inbound,
        outbound_movements=outbound,
    )
