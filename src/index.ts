import data from './db.json';
import type { Notification } from './type';
import scrapeProduct from './scrapeProduct';
import scrapeGame from './scrapeGame';
import ntfyNotify from './ntfy';

const scraper = async () => {
  const { product: productsToScrape } = data;
  let notification: Notification[] = [];
  if (Array.isArray(productsToScrape) && productsToScrape.length) {
    const enabledProducts = productsToScrape.filter(p => p.enabled && p.type === 'physical');
    const enabledDigiProducts = productsToScrape.filter(p => p.enabled && p.type === 'digital');
    if (enabledProducts.length) {
      for(const product of enabledProducts) {
        const result = await scrapeProduct(product);
        const { name, normalPrice } = product;
        if (result.length) {
          notification = [...notification, { product: name, normalPrice, providers: result } ];
        }
      }
    }
    if (enabledDigiProducts.length) {
      for(const product of enabledDigiProducts) {
        const result = await scrapeGame(product);
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

export const simpleNodeScraper = async function (req: any, res: any) {
  try {
    await scraper();
    res.status(200).send('Scraping completed');
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send('Scraping failed');
  }
};