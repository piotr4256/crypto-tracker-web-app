import logging
import requests
from django.core.cache import cache

logger = logging.getLogger(__name__)

class CoinGeckoService:
    BASE_URL = "https://api.coingecko.com/api/v3"
    
    # Czas zycia podstawowego cache (sekundy)
    CACHE_TTL_MARKET = 60
    CACHE_TTL_EXCHANGES = 3600
    # Czas zycia "nieswieżego" (stale) cache (sekundy) -> 24 godziny
    CACHE_TTL_STALE = 60 * 60 * 24

    @classmethod
    def _fetch_data(cls, endpoint, params, cache_key, ttl):
        """
        Główna metoda pobierająca dane z CoinGecko, 
        obsługująca rate limit (HTTP 429) z użyciem "stale cache".
        """
        stale_cache_key = f"{cache_key}_stale"
        
        # 1. Próba pobrania świeżego cache'u
        cached_data = cache.get(cache_key)
        if cached_data is not None:
            return cached_data
            
        # 2. Brak w cache - odpytujemy API
        try:
            response = requests.get(f"{cls.BASE_URL}{endpoint}", params=params, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                # Odśwież podstawowy cache
                cache.set(cache_key, data, ttl)
                # Odśwież zapasowy (nieswieży) cache na wypadek awarii/429
                cache.set(stale_cache_key, data, cls.CACHE_TTL_STALE)
                return data
                
            elif response.status_code == 429:
                logger.warning(f"CoinGecko Rate Limit (429) docelowo: {endpoint}. Używam stale-cache.")
                # Pobierz z zapasowego cache'u
                stale_data = cache.get(stale_cache_key)
                if stale_data is not None:
                    return stale_data
                return {"error": "Rate limit exceeded (429) & no cached data available", "status": 429}
                
            else:
                response.raise_for_status()
                
        except requests.RequestException as e:
            logger.error(f"Network error fetching CoinGecko {endpoint}: {e}")
            stale_data = cache.get(stale_cache_key)
            if stale_data is not None:
                return stale_data
            return {"error": str(e), "status": 500}

    @classmethod
    def get_markets(cls):
        return cls._fetch_data(
            endpoint="/coins/markets",
            params={"vs_currency": "usd", "order": "market_cap_desc", "per_page": 100, "page": 1, "sparkline": False},
            cache_key="cg_markets",
            ttl=cls.CACHE_TTL_MARKET
        )
        
    @classmethod
    def get_coin_details(cls, coin_id):
        return cls._fetch_data(
            endpoint=f"/coins/{coin_id}",
            params={},
            cache_key=f"cg_coin_details_{coin_id}",
            ttl=cls.CACHE_TTL_MARKET
        )
        
    @classmethod
    def get_coin_market_chart(cls, coin_id, days=7):
        return cls._fetch_data(
            endpoint=f"/coins/{coin_id}/market_chart",
            params={"vs_currency": "usd", "days": days},
            cache_key=f"cg_coin_chart_{coin_id}_{days}d",
            ttl=cls.CACHE_TTL_MARKET
        )
        
    @classmethod
    def get_exchanges(cls):
        return cls._fetch_data(
            endpoint="/exchanges",
            params={"per_page": 100, "page": 1},
            cache_key="cg_exchanges",
            ttl=cls.CACHE_TTL_EXCHANGES
        )
        
    @classmethod
    def get_trending(cls):
        return cls._fetch_data(
            endpoint="/search/trending",
            params={},
            cache_key="cg_trending",
            ttl=cls.CACHE_TTL_EXCHANGES
        )
        
    @classmethod
    def get_global(cls):
        return cls._fetch_data(
            endpoint="/global",
            params={},
            cache_key="cg_global",
            ttl=cls.CACHE_TTL_EXCHANGES
        )
