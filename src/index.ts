import loadData from './data';
import type { Notification } from './type';
import scrapeProduct from './scrapeProduct';
import scrapeGame from './scrapeGame';
import ntfyNotify from './ntfy';

const scraper = async (): Promise<Notification[]> => {
  const { products: productsToScrape } = await loadData();
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
    ntfyNotify(notification);
  }
  return notification;
}

export const simpleNodeScraper = async function (req: any, res: any) {
  try {
    const result = await scraper();
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send('Scraping failed');
  }
};