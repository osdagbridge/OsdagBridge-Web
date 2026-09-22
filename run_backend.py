import sys
import uvicorn
from pathlib import Path

backend_dir = Path(__file__).resolve().parent / 'backend'
sys.path.insert(0, str(backend_dir))

if __name__ == '__main__':
    print('Starting OsdagBridge Web API on http://127.0.0.1:8000 ...')
    uvicorn.run('app.main:app', host='127.0.0.1', port=8000, reload=True, app_dir=str(backend_dir))
