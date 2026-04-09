import axios from 'axios';

// Baza do symulacji watchlisty (i logowania)
const STORAGE_KEY = 'crypto_pulse_watchlist';
let MOCK_WATCHLIST = JSON.parse(localStorage.getItem(STORAGE_KEY)) || ['bitcoin', 'solana'];

const saveToStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const BASE_URL = 'http://127.0.0.1:8000/api';

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
      const response = await axios.get(`${BASE_URL}/market/`);
      return { data: response.data };
    } catch (error) {
      console.error('Błąd pobierania danych z Django:', error);
      throw new Error('Nie udało się pobrać danych z rynku. Spróbuj ponownie później.');
    }
  },

  getMarketChart: async (id, days = 7) => {
    try {
       // Obecnie backend zawsze zwraca dane z 7 dni (zignoruje parametr z frontu, lecz adres uległ zmianie)
       const response = await axios.get(`${BASE_URL}/coin/${id}/chart/`);
       return { data: response.data };
    } catch (error) {
       console.error(`Błąd pobierania wykresu dla ${id}:`, error);
       throw new Error('Nie udało się pobrać wykresu cenowego.');
    }
  },

  getExchanges: async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/exchanges/`);
      return { data: response.data };
    } catch (error) {
      console.error('Błąd pobierania giełd:', error);
      throw new Error('Nie udało się pobrać listy giełd.');
    }
  },

  getTrending: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/trending/`);
      // Serializer z backendu podaje listę pod kluczem 'coins'
      return { data: response.data.coins };
    } catch (error) {
      console.error('Błąd pobierania trendków:', error);
      throw new Error('Nie udało się pobrać najnowszych trendów.');
    }
  },

  getGlobalStats: async () => {
    try {
       const response = await axios.get(`${BASE_URL}/global/`);
       // Backend odfiltrowuje śmieci za nas, wiec uzywamy glownego response.data
       return { data: response.data };
    } catch (error) {
       console.error('Błąd pobierania statystyk globalnych:', error);
       throw new Error('Nie udało się pobrać danych globalnych.');
    }
  },

  getUserWatchlist: async () => {
    await delay(300);
    // In real app, we'd fetch based on userId.
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
