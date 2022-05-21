from fastapi import HTTPException
from sqlalchemy.orm import Session

from finances.models.link import Link as LinkModel
from finances.schemas.link import LinkCreation as LinkCreationSchema


def get_by_fintoc_id(db: Session, fintoc_id: str, silent: bool = False) -> LinkModel:
    link = db.query(LinkModel).filter(
        LinkModel.fintoc_intent_id == fintoc_id,
    ).first()
    if not silent and not link:
        raise HTTPException(
            status_code=404,
            detail=f"No link with Fintoc id {fintoc_id}",
        )
    return link


def create(db: Session, link_schema: LinkCreationSchema) -> str:
    link = LinkModel(
        fintoc_id=link_schema.fintoc_id,
        fintoc_token=link_schema.fintoc_token,
    )
    db.add(link)
    db.commit()
    db.refresh(link)
    return link


def update(
    db: Session,
    link_schema: LinkCreationSchema,
    link: LinkModel,
) -> LinkModel:
    link.fintoc_token = link_schema.fintoc_token
    db.commit()
    db.refresh(link)
    return link


def refreshed(
    db: Session,
    link: LinkModel,
) -> LinkModel:
    link.refreshed = True
    db.commit()
    db.refresh(link)
    return link


def remove(db: Session, link: LinkModel) -> None:
    db.delete(link)
