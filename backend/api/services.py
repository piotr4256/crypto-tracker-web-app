import logging
import requests

logger = logging.getLogger(__name__)

class CoinGeckoService:
    BASE_URL = "https://api.coingecko.com/api/v3"

    @classmethod
    def _fetch_data(cls, endpoint, params):
        """
        Główna metoda pobierająca dane z CoinGecko. Bez użycia cache.
        """
        try:
            response = requests.get(f"{cls.BASE_URL}{endpoint}", params=params, timeout=10)
            
            if response.status_code == 200:
                return response.json()
                
            elif response.status_code == 429:
                logger.warning(f"CoinGecko Rate Limit (429) docelowo: {endpoint}.")
                return {"error": "Rate limit exceeded (429)", "status": 429}
                
            else:
                response.raise_for_status()
                
        except requests.RequestException as e:
            logger.error(f"Network error fetching CoinGecko {endpoint}: {e}")
            return {"error": str(e), "status": 500}

    @classmethod
    def get_markets(cls):
        return cls._fetch_data(
            endpoint="/coins/markets",
            params={"vs_currency": "usd", "order": "market_cap_desc", "per_page": 100, "page": 1, "sparkline": False}
        )
        
    @classmethod
    def get_coin_details(cls, coin_id):
        return cls._fetch_data(
            endpoint=f"/coins/{coin_id}",
            params={}
        )
        
    @classmethod
    def get_coin_market_chart(cls, coin_id, days=7):
        return cls._fetch_data(
            endpoint=f"/coins/{coin_id}/market_chart",
            params={"vs_currency": "usd", "days": days}
        )
        
    @classmethod
    def get_exchanges(cls):
        return cls._fetch_data(
            endpoint="/exchanges",
            params={"per_page": 100, "page": 1}
        )
        
    @classmethod
    def get_trending(cls):
        return cls._fetch_data(
            endpoint="/search/trending",
            params={}
        )
        
    @classmethod
    def get_global(cls):
        return cls._fetch_data(
            endpoint="/global",
            params={}
        )
