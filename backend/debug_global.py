import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

import traceback
from api.services import CoinGeckoService
from api.serializers import GlobalStatsSerializer

try:
    data = CoinGeckoService.get_global()
    print("API RESPONSE KEYS:", data.keys() if isinstance(data, dict) else type(data))
    
    global_data = data.get('data', {}) if isinstance(data, dict) else {}
    print("GLOBAL DATA KEYS:", global_data.keys() if isinstance(global_data, dict) else type(global_data))
    
    serializer = GlobalStatsSerializer(global_data)
    print("SERIALIZED DATA:", serializer.data)
except Exception as e:
    print("ERROR OCCURRED:")
    traceback.print_exc()
