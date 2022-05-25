from fastapi import HTTPException
from sqlalchemy.orm import Session

from finances.models.link import Link as LinkModel
from finances.schemas.link import LinkCreatedWebhook as LinkCreatedWebhookSchema


def get_by_fintoc_id(db: Session, fintoc_id: str, silent: bool = False) -> LinkModel:
    link = db.query(LinkModel).filter(
        LinkModel.fintoc_id == fintoc_id,
    ).first()
    if not silent and not link:
        raise HTTPException(
            status_code=404,
            detail=f"No link with Fintoc id {fintoc_id}",
        )
    return link


def create(db: Session, link_schema: LinkCreatedWebhookSchema) -> str:
    link = get_by_fintoc_id(db, link_schema.data.id, silent=True)
    if link:
        link.fintoc_token = link_schema.data.link_token
    else:
        link = LinkModel(
            fintoc_id=link_schema.data.id,
            fintoc_token=link_schema.data.link_token,
        )
    db.add(link)
    db.commit()
    db.refresh(link)
    return link


def account_refreshed(
    db: Session,
    link: LinkModel,
    account_id: str,
) -> LinkModel:
    link.refreshed_accounts.append(account_id)
    db.add(link)
    db.commit()
    db.refresh(link)
    return link


def delete(db: Session, link: LinkModel) -> None:
    db.delete(link)
    db.commit()
