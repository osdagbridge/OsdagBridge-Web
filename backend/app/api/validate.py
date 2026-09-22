from fastapi import APIRouter
from app.models.schemas import ValidateFieldRequest, ValidateFieldResponse
import sys
from pathlib import Path

CORE_DIR = Path(__file__).resolve().parents[5] / "OsdagBridge" / "src"
if CORE_DIR.exists() and str(CORE_DIR) not in sys.path:
    sys.path.insert(0, str(CORE_DIR))

router = APIRouter(prefix="/validate", tags=["Validation"])

@router.post("/field", response_model=ValidateFieldResponse)
def validate_field(payload: ValidateFieldRequest):
    """
    Validates a single input field against IRC / Osdag design constraints.
    TODO: Connect to BridgeInputValidator in validator.py
    """
    key = payload.key
    val = payload.value

    # Try running the actual core validator if available
    try:
        from osdagbridge.core.bridge_types.plate_girder.validator import BridgeInputValidator
        validator = BridgeInputValidator()
        result = validator.validate_basic_inputs(key, payload.all_inputs or {key: val})
        if result is not None:
            corrected, msg = result
            return ValidateFieldResponse(valid=False, corrected_value=corrected, message=msg)
    except Exception:
        # Fallback contract rules
        if key == "Span":
            try:
                num = float(val)
                if num < 12.0 or num > 60.0:
                    return ValidateFieldResponse(
                        valid=False,
                        corrected_value=30.0,
                        message="Span must be between 12.0 m and 60.0 m as per software limit."
                    )
            except (ValueError, TypeError):
                return ValidateFieldResponse(valid=False, message="Span must be a numeric value.")
                
        if key == "Carriageway_Width":
            try:
                num = float(val)
                if num < 4.25 or num > 24.0:
                    return ValidateFieldResponse(
                        valid=False,
                        corrected_value=7.5,
                        message="Carriageway width must be at least 4.25 m (IRC 5 Cl.104.3.1)."
                    )
            except (ValueError, TypeError):
                return ValidateFieldResponse(valid=False, message="Width must be numeric.")

    return ValidateFieldResponse(valid=True)
