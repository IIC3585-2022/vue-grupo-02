from pydantic import StrictStr

from finances.schemas.webhooks import BaseWebhookSchema


class AccountRefreshedWebhookData(BaseWebhookSchema):
    refreshed_object_id: StrictStr


class AccountRefreshedWebhook(BaseWebhookSchema):
    data: AccountRefreshedWebhookData
