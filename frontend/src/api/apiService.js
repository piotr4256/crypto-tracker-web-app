import axios from 'axios';

// Baza do symulacji watchlisty (i logowania)
const STORAGE_KEY = 'crypto_pulse_watchlist';
let MOCK_WATCHLIST = JSON.parse(localStorage.getItem(STORAGE_KEY)) || ['bitcoin', 'solana'];

const saveToStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const isProd = import.meta.env.PROD;
const LOCAL_DJANGO_URL = 'http://127.0.0.1:8000/api';
const COINGECKO_URL = 'https://api.coingecko.com/api/v3';

export const apiService = {
  login: async (email, password) => {
    await delay(500);
    if (email && password) {
      return { data: { id: 'u1', email, token: 'mock-jwt-token-123' } };
    }
    throw new Error('Invalid credentials');
  },
  
  register: async (email, password) => {
    await delay(500);
    if (email && password) {
      return { data: { id: 'u1', email, token: 'mock-jwt-token-123' } };
    }
    throw new Error('Registration failed');
  },

  getAllCryptos: async () => {
    try {
      if (isProd) {
        const response = await axios.get(`${COINGECKO_URL}/coins/markets`, {
          params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 100, page: 1, sparkline: false }
        });
        return { data: response.data };
      } else {
        const response = await axios.get(`${LOCAL_DJANGO_URL}/market/`);
        return { data: response.data };
      }
    } catch (error) {
      console.error('Błąd pobierania danych:', error);
      throw new Error('Nie udało się pobrać danych z rynku. Spróbuj ponownie później.');
    }
  },

  getMarketChart: async (id, days = 7) => {
    try {
      if (isProd) {
         const response = await axios.get(`${COINGECKO_URL}/coins/${id}/market_chart`, {
           params: { vs_currency: 'usd', days }
         });
         return { data: response.data };
      } else {
         const response = await axios.get(`${LOCAL_DJANGO_URL}/coin/${id}/chart/`);
         return { data: response.data };
      }
    } catch (error) {
       console.error(`Błąd pobierania wykresu dla ${id}:`, error);
       throw new Error('Nie udało się pobrać wykresu cenowego.');
    }
  },

  getExchanges: async (page = 1) => {
    try {
      if (isProd) {
        const response = await axios.get(`${COINGECKO_URL}/exchanges`, {
          params: { per_page: 100, page }
        });
        return { data: response.data };
      } else {
        const response = await axios.get(`${LOCAL_DJANGO_URL}/exchanges/`);
        return { data: response.data };
      }
    } catch (error) {
      console.error('Błąd pobierania giełd:', error);
      throw new Error('Nie udało się pobrać listy giełd.');
    }
  },

  getTrending: async () => {
    try {
      if (isProd) {
        const response = await axios.get(`${COINGECKO_URL}/search/trending`);
        return { data: response.data.coins };
      } else {
        const response = await axios.get(`${LOCAL_DJANGO_URL}/trending/`);
        return { data: response.data.coins };
      }
    } catch (error) {
      console.error('Błąd pobierania trendków:', error);
      throw new Error('Nie udało się pobrać najnowszych trendów.');
    }
  },

  getGlobalStats: async () => {
    try {
       if (isProd) {
         const response = await axios.get(`${COINGECKO_URL}/global`);
         return { data: response.data.data };
       } else {
         const response = await axios.get(`${LOCAL_DJANGO_URL}/global/`);
         return { data: response.data }; 
       }
    } catch (error) {
       console.error('Błąd pobierania statystyk globalnych:', error);
       throw new Error('Nie udało się pobrać danych globalnych.');
    }
  },

  getUserWatchlist: async () => {
    await delay(300);
    return { data: MOCK_WATCHLIST };
  },

  addToWatchlist: async (cryptoId) => {
    await delay(200);
    if (!MOCK_WATCHLIST.includes(cryptoId)) {
      MOCK_WATCHLIST.push(cryptoId);
      saveToStorage(MOCK_WATCHLIST);
    }
    return { data: { success: true, watchlist: MOCK_WATCHLIST } };
  },

  removeFromWatchlist: async (cryptoId) => {
    await delay(200);
    MOCK_WATCHLIST = MOCK_WATCHLIST.filter(id => id !== cryptoId);
    saveToStorage(MOCK_WATCHLIST);
    return { data: { success: true, watchlist: MOCK_WATCHLIST } };
  }
};
