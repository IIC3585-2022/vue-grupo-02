from typing import Any, Dict, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import finances.crud.links as links_crud
from finances import deps
from finances.shared.initializers import FINTOC_CLIENT

router = APIRouter()


@router.get("")
def get_accounts(
    fintoc_id: str,
    db: Session = Depends(deps.get_db),
) -> List[Dict[str, Any]]:
    database_link = links_crud.get_by_fintoc_id(db, fintoc_id)
    link = FINTOC_CLIENT.links.get(database_link.fintoc_token)
    return [x.serialize() for x in link.accounts.all()]
