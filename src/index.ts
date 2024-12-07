import data from './db.json';
import type { Notification } from './type';
import scrapeProduct from './scrapeProduct';
import ntfyNotify from './ntfy';

const scraper = async () => {
  const { product: productsToScrape } = data;
  let notification: Notification[] = [];
  if (Array.isArray(productsToScrape) && productsToScrape.length) {
    for(const product of productsToScrape) {
      const result = await scrapeProduct(product);
      const { name, normalPrice } = product;
      if (result) {
        notification = [...notification, { product: name, normalPrice, providers: result } ];
      }
    }
  }
  console.log({ notification: JSON.stringify(notification) });
  ntfyNotify(notification)
}

scraper();

// Perodically check product prices
// setInterval(async() => {
//   await scraper();
// }, 600000);