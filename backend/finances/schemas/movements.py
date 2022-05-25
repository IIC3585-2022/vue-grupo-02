from typing import List, Optional

from pydantic import Extra, UUID4, StrictBool, StrictInt, StrictStr

from finances.shared.schemas import BaseSchema


class MovementsRequest(BaseSchema):
    inbound_account_id: StrictStr
    outbound_account_id: StrictStr


class Institution(BaseSchema):
    id: StrictStr
    name: StrictStr
    country: StrictStr


class TransferAccount(BaseSchema):
    holder_id: StrictStr
    holder_name: StrictStr
    number: StrictStr
    institution: Optional[Institution]


class Movement(BaseSchema):
    amount: StrictInt
    post_date: StrictStr
    description: StrictStr
    recipient_account: Optional[TransferAccount]
    sender_account: Optional[TransferAccount]
    comment: Optional[StrictStr]


class MovementsResponse(BaseSchema):
    inbound_movements: List[Movement]
    outbound_movements: List[Movement]
