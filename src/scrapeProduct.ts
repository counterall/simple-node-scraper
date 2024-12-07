import * as dotenv from 'dotenv';
import giganttiScraper, { GIGANTTI_ID } from './providers/gigantti';
import powerScraper, { POWER_ID } from './providers/power';
import vkScraper, { VK_ID } from './providers/vk';
import data from './db.json';
dotenv.config();
import type { Product, ProductToScrape, ProductPrice } from './type';

export default async function (product: Product) {
  const { id, thresholdPrice } = product;
  let { productsToScrape } = data;
  productsToScrape = productsToScrape.filter((product: ProductToScrape) => product.productId === id)
  let prices: ProductPrice[] = [];
  if (productsToScrape.length) {
    for(const product of productsToScrape) {
      let price: ProductPrice | undefined;
      const { providerId, relativeUrl } = product;
      switch (providerId) {
        case GIGANTTI_ID:
          price = await giganttiScraper(relativeUrl);
          break;
        case POWER_ID:
          price = await powerScraper(relativeUrl);
          break;
        case VK_ID:
            price = await vkScraper(relativeUrl);
            break;
        default:
          break;
      }
      if (price?.price) {
        const thredsholdTriggered = thresholdPrice ? price.price <= thresholdPrice : true;
        if (thredsholdTriggered){
          prices = [...prices, price];
        }
      }
    }
  }
  return prices;
}