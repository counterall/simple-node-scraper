import axios from 'axios';
import * as dotenv from 'dotenv';
import data from './db.json';
dotenv.config();
import type { Notificaton } from './type';
import scrapeProduct from './scrapeProduct';

const scraper = async () => {
  const { product: productsToScrape } = data;
  const ntfyUrl = process.env.NTFY_URL;
  let notificaton: Notificaton[] = [];
  if (Array.isArray(productsToScrape) && productsToScrape.length) {
    for(const product of productsToScrape) {
      const result = await scrapeProduct(product);
      const { name, normalPrice } = product;
      if (result) {
        notificaton = [...notificaton, { product: name, normalPrice, providers: result } ];
      }
    }
  }
  console.log({ notificaton: JSON.stringify(notificaton) });
  if (ntfyUrl) {
    axios.post(ntfyUrl, notificaton);
  }
}

scraper();

// Perodically check product prices
// setInterval(async() => {
//   await scraper();
// }, 600000);