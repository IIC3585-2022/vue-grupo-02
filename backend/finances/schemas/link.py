from typing import List, Optional

from pydantic import UUID4, StrictBool, StrictStr

from finances.schemas.webhooks import BaseWebhookSchema
from finances.shared.schemas import BaseSchema


class LinkResponse(BaseSchema):
    id: UUID4
    fintoc_id: StrictStr
    refreshed_accounts: Optional[List[StrictStr]]


# Webhook
class LinkCreatedWebhookData(BaseWebhookSchema):
    id: StrictStr
    link_token: StrictStr


class LinkCreatedWebhook(BaseWebhookSchema):
    type: StrictStr
    mode: StrictStr
    data: LinkCreatedWebhookData
