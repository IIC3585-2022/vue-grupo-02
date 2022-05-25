from pydantic import Extra

from finances.shared.schemas import BaseSchema


class BaseWebhookSchema(BaseSchema):
    class Config:
        extra = Extra.ignore
