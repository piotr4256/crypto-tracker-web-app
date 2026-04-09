# Lista danych dostępnych w CoinGecko API (V3 Free Tier)

Poniżej znajduje się zestawienie danych, które możemy pobrać z darmowego API CoinGecko dla naszej aplikacji.

---

### 1. Lista rynkowa (`/coins/markets`)
Ten endpoint służy do pobierania listy kryptowalut z ich podstawowymi danymi rynkowymi.
*   **Identyfikacja:** `id`, `symbol`, `name`, `image` (URL do logotypu)
*   **Dane cenowe:**
    *   `current_price` (aktualna cena)
    *   `high_24h` / `low_24h` (najwyższa/najniższa cena w ciągu doby)
    *   `ath` (cena wszech czasów) / `atl` (cena najniższa w historii)
    *   `ath_change_percentage` / `atl_change_percentage`
*   **Metryki rynkowe:**
    *   `market_cap` (kapitalizacja rynkowa)
    *   `market_cap_rank` (miejsce w rankingu)
    *   `total_volume` (wolumen obrotu)
    *   `fully_diluted_valuation` (całkowicie rozwodniona wycena)
*   **Zmiany procentowe:**
    *   `price_change_24h` / `price_change_percentage_24h`
    *   `market_cap_change_24h` / `market_cap_change_percentage_24h`
*   **Podaż:**
    *   `circulating_supply` (podaż w obiegu)
    *   `total_supply` (całkowita podaż)
    *   `max_supply` (maksymalna podaż)

### 2. Szczegóły monety (`/coins/{id}`)
Dostarcza bardzo głębokie dane o konkretnym projekcie.
*   **Informacje o projekcie:** `description` (opisy w różnych językach), `categories` (np. DeFi, Layer 1), `hashing_algorithm`.
*   **Linki:** Strony domowe, eksploratory bloków, Twitter, Reddit, GitHub, linki do komunikatorów.
*   **Dane rynkowe (Market Data):**
    *   Ceny w wielu walutach jednocześnie (USD, EUR, PLN, BTC, ETH).
    *   Zmiany procentowe w różnych przedziałach czasowych: 1h, 24h, 7d, 14d, 30d, 60d, 200d, 1y.
*   **Statystyki społeczności:** Liczba obserwujących na Twitterze, subskrypcje na Reddicie.
*   **Dane programistyczne (GitHub):** Liczba gwiazdek, forków, otwartych problemów, commitów z ostatnich 4 tygodni.
*   **Tickers:** Lista giełd, na których moneta jest notowana wraz z parami walutowymi.

### 3. Giełdy (`/exchanges`)
Lista giełd kryptowalut wraz z ich statystykami.
*   **Dane podstawowe:** `name`, `year_established`, `country`, `url`, `image`.
*   **Zaufanie i Wolumen:**
    *   `trust_score` (wskaźnik zaufania 1-10).
    *   `trust_score_rank`.
    *   `trade_volume_24h_btc` (wolumen w BTC z ostatnich 24h).

### 4. Dane Globalne (`/global`)
Statystyki dla całego rynku kryptowalut.
*   **Ogólne:** Liczba aktywnych kryptowalut, liczba giełd (markets).
*   **Suma rynku:** Całkowita kapitalizacja rynkowa (Total Market Cap), całkowity wolumen.
*   **Dominacja:** Procentowy udział w rynku głównych walut (np. BTC%, ETH%).
*   **Zmiany:** Zmiana kapitalizacji całego rynku w ciągu ostatnich 24h (%).

### 5. Trendy i Wyszukiwanie (`/search/trending`)
Zwraca najpopularniejsze wyszukiwania z ostatnich 24h.
*   **Coins:** Top 15 monet, które użytkownicy najczęściej wyszukują na CoinGecko.
*   **NFTs:** Najpopularniejsze kolekcje NFT.
*   **Categories:** Najszybciej rosnące kategorie projektów.

### 6. Prosty kurs (`/simple/price`)
Bardzo lekki punkt końcowy, idealny do szybkich odświeżeń ceny bez pobierania zbędnych danych.
*   Zwraca tylko cenę wybranej monety w wybranej walucie (np. BTC w PLN).

---
*Opracowano na podstawie dokumentacji CoinGecko API V3.*
