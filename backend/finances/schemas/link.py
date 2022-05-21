from datetime import datetime
from typing import List, Optional

from pydantic import Extra, UUID4, StrictBool, StrictStr

from finances.shared.schemas import BaseSchema


class BaseLink(BaseSchema):
    fintoc_id: StrictStr
    fintoc_token: StrictStr


class LinkCreation(BaseLink):
    ...


class LinkResponse(BaseLink):
    id: UUID4
    refreshed: StrictBool


# Webhook
class BaseWebhookSchema(BaseSchema):
    class Config:
        extra = Extra.ignore


class LinkRefreshedWebhookData(BaseWebhookSchema):
    id: StrictStr
    refreshed_object_id: StrictStr


class LinkRefreshedWebhook(BaseWebhookSchema):
    id: StrictStr
    type: StrictStr
    mode: StrictStr
    data: LinkRefreshedWebhookData
