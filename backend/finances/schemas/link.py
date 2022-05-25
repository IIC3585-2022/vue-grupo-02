from pydantic import Extra, UUID4, StrictBool, StrictStr

from finances.shared.schemas import BaseSchema


class LinkResponse(BaseSchema):
    id: UUID4
    fintoc_id: StrictStr
    refreshed: StrictBool


# Webhook
class BaseWebhookSchema(BaseSchema):
    class Config:
        extra = Extra.ignore


class LinkCreatedWebhookData(BaseWebhookSchema):
    id: StrictStr
    link_token: StrictStr


class LinkCreatedWebhook(BaseWebhookSchema):
    type: StrictStr
    data: LinkCreatedWebhookData


class LinkRefreshedWebhookData(BaseWebhookSchema):
    id: StrictStr
    refreshed_object_id: StrictStr


class LinkRefreshedWebhook(BaseWebhookSchema):
    id: StrictStr
    type: StrictStr
    mode: StrictStr
    data: LinkRefreshedWebhookData
