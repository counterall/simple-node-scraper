import data from './db.json';
import type { Notification } from './type';
import scrapeProduct from './scrapeProduct';
import ntfyNotify from './ntfy';

const scraper = async () => {
  const { product: productsToScrape } = data;
  let notification: Notification[] = [];
  if (Array.isArray(productsToScrape) && productsToScrape.length) {
    const enabledProducts = productsToScrape.filter(p => p.enabled);
    if (enabledProducts.length) {
      for(const product of enabledProducts) {
        const result = await scrapeProduct(product);
        const { name, normalPrice } = product;
        if (result.length) {
          notification = [...notification, { product: name, normalPrice, providers: result } ];
        }
      }
    }
  }
  if (notification.length) {
    console.log({ notification: JSON.stringify(notification) });
    ntfyNotify(notification);
  }
}

scraper();

// Perodically check product prices
// setInterval(async() => {
//   await scraper();
// }, 600000);