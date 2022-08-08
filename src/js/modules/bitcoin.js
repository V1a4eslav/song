import axios from "axios";

export function bitcoin() {
   async function getData() {
      const link = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR';
      const apiKey = 'fb2f2e14ebc71322dc42d60cc77809e48a93d1280d355b2fb33ae632b5b7dbfc';

      try {
         const { data } = await axios.request(`${link}&api_key=${apiKey}`);
         return data;
      } catch (error) {
         console.error(error);
      }
   }

   async function countPriceUsd() {
      const btc = document.querySelector('[data-btc]');
      if (!btc) return;

      const usd = document.querySelector('[data-usd]');

      const { USD } = await getData();

      usd.innerHTML = await (USD * +btc.innerHTML).toFixed(2);
   }
   countPriceUsd();

}