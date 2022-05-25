import uuid

from sqlalchemy import Boolean, Column, String
from sqlalchemy.dialects.postgresql import ARRAY, UUID

from finances.shared.models import BaseModel


class Link(BaseModel):
    __tablename__ = "links"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    fintoc_id = Column(String, nullable=False, unique=True, index=True)
    fintoc_token = Column(String, nullable=False)
    refreshed_accounts = Column(ARRAY(String))
