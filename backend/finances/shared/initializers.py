from fintoc import Fintoc

from finances.config import settings


FINTOC_CLIENT = Fintoc(settings.fintoc_secret_key)
