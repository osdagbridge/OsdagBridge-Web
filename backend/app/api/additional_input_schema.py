import backend.app.MagicMock_module_creation as MagicMock_module_creation

from fastapi import APIRouter
from typing import List
from app.models.schemas import AdditionalInputTab


from unittest.mock import MagicMock

def remove_magic_mock(node):
    if isinstance(node, MagicMock):
        return None
    if isinstance(node, dict):
        return {k: remove_magic_mock(v) for k, v in node.items()}
    if isinstance(node, list):
        return [remove_magic_mock(v) for v in node]
    return node
router = APIRouter(prefix="/schema", tags=["Schema"])
@router.get("/additional", response_model=List[AdditionalInputTab])
def additional_input_schema():
    try:
        from osdagbridge.core.bridge_types.plate_girder.ui_fields_additional_input import ADDITIONAL_INPUTS_SCHEMA
        return remove_magic_mock(ADDITIONAL_INPUTS_SCHEMA)
    except ImportError as e:
            print("CORE IMPORT ERROR:", e)
            raise
