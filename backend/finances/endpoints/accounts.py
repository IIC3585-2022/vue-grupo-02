from typing import Any, Dict, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import finances.crud.links as links_crud
from finances import deps
from finances.shared.initializers import FINTOC_CLIENT

router = APIRouter()


def format_movement(movement):
    serialized_mov = movement.serialize()
    return {
        "amount": serialized_mov["amount"],
        "post_date": serialized_mov["post_date"],
        "description": serialized_mov["description"],
        "recipient_account": serialized_mov["recipient_account"],
        "sender_account": serialized_mov["sender_account"],
        "comment": serialized_mov["comment"],
    }


@router.get("")
def get_accounts(
    fintoc_id: str,
    db: Session = Depends(deps.get_db),
) -> List[Dict[str, Any]]:
    database_link = links_crud.get_by_fintoc_id(db, fintoc_id)
    link = FINTOC_CLIENT.links.get(database_link.fintoc_token)
    return [x.serialize() for x in link.accounts.all()]
