import axios, { AxiosInstance } from "axios";

const API_KEY = "c8db12b2c4b1464eadb85e758e4a751e";
// https://api.currencyfreaks.com/v2.0/rates/latest?apikey=c8db12b2c4b1464eadb85e758e4a751e&base=EGP&symbols=ETH
export const payRateApi: AxiosInstance = axios.create({
  baseURL: "https://api.currencyfreaks.com/v2.0",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    apikey: API_KEY,
  },
});
export default payRateApi;
export interface ExchangeRatesResponse {
  rates: {
    [key: string]: number; // Key-value pairs for currency codes and their respective rates
  };
  base: string; // The base currency (e.g., "USD")
  date: string; // Date of the rates
}

export const getExchangeRates = async (): Promise<ExchangeRatesResponse> => {
  try {
    const response = await payRateApi.get<ExchangeRatesResponse>(
      "/rates/latest",
      {
        params: {
          symbols: "ETH,EGP,USD",
          apikey: API_KEY,
        },
      },
    );

    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error; // Rethrow the error for further handling
  }
};
