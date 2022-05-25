from pydantic import StrictStr

from finances.schemas.webhooks import BaseWebhookSchema


class AccountRefreshedWebhookData(BaseWebhookSchema):
    id: StrictStr
    refreshed_object_id: StrictStr


class AccountRefreshedWebhook(BaseWebhookSchema):
    id: StrictStr
    type: StrictStr
    data: AccountRefreshedWebhookData
