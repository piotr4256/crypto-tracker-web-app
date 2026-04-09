# Instrukcja dla Backend Dewelopera (Django)

Poniżej znajdują się wymagania i wytyczne dotyczące budowy Proxy API, które będzie pośrednikiem między moim frontendem (React + Vite) a zewnętrznymi danymi (CoinGecko).

## 1. Cel projektu
Stworzenie wydajnego serwera pośredniczącego (Proxy), który:
*   Będzie odpytywał zewnętrzne API (np. CoinGecko V3) pod spodem.
*   Będzie optymalizował i czyścił dane przed wysłaniem ich do frontendu.
*   Będzie chronił nas przed limitami zapytań (*Rate Limits*) zewnętrznego dostawcy.

## 2. Technologia: Django + Django REST Framework (DRF)
Zalecam użycie **Django REST Framework (DRF)**, aby zapewnić czyste i ustandaryzowane API.

### Endpointy do zaimplementowania:
*   `GET /api/market/`: Pobiera listę top 100 kryptowalut.
*   `GET /api/coin/<id>/`: Pobiera szczegółowe dane konkretnej monety.
*   `GET /api/exchanges/`: Pobiera listę 100 najpopularniejszych giełd.
*   `GET /api/trending/`: Pobiera listę obecnie najpopularniejszych wyszukiwań.

## 2.5 Konkretne adresy URL z CoinGecko (V3 Public)
To są adresy, które obecnie odpytuję z Frontendu. Twoje Django powinno teraz robić to samo pod spodem:
*   **Rynek (Top 100):** `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
*   **Wykres historyczny (7 dni):** `https://api.coingecko.com/api/v3/coins/{id}/market_chart?vs_currency=usd&days=7`
*   **Szczegóły monety:** `https://api.coingecko.com/api/v3/coins/{id}`
*   **Lista giełd:** `https://api.coingecko.com/api/v3/exchanges?per_page=100&page=1`
*   **Trendy:** `https://api.coingecko.com/api/v3/search/trending`
*   **Statystyki globalne:** `https://api.coingecko.com/api/v3/global`

## 3. System Cache'owania (Krytyczne!)
Użyj wbudowanego systemu cache'owania Django (`django.core.cache`).
**Zalecany czas życia cache (TTL):**
*   **Kursy i ceny:** 60 sekund (użyj `cache.set` i `cache.get`).
*   **Giełdy i dane statyczne:** 1 godzina (3600 sekund).

Dzięki temu Twoje Django nie będzie "męczyć" CoinGecko przy każdym odświeżeniu strony przez użytkownika.

## 4. Serializacja danych
Zdefiniuj czyste foldery/pliki `serializers.py`, aby usuwać nadmiar informacji zwracanych przez CoinGecko (szczególnie w opisie monet). Do frontendu wysyłaj tylko te pola, których faktycznie potrzebuję (zgodnie z moją listą w projekcie).

## 5. Konfiguracja CORS
Do obsługi komunikacji między Reactem a Django zainstaluj i skonfiguruj paczkę `django-cors-headers`:

```python
# settings.py

INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Musi być nad CommonMiddleware!
    'django.middleware.common.CommonMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Mój lokalny port deweloperski
    "https://twoja-domena-frontendowa.vercel.app"  # Przyszły adres produkcyjny
]
```

## 6. Dokumentacja (Swagger/Redoc)
Użyj `drf-spectacular` lub `drf-yasg`, aby wygenerować dokumentację API widoczną pod `/api/schema/swagger-ui/`. Gdy serwer będzie gotowy, prześlij mi link, abym mógł skonsultować strukturę JSON-a.

## 7: Error Handling.
Jeśli CoinGecko zwróci błąd 429 (Too Many Requests), Twoje API powinno zwrócić mi ostatnie dane z cache'u zamiast błędu, aby frontend nie 'wybuchł'.


---
*Status: Oczekiwanie na wdrożenie serwera Django.*
