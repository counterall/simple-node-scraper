import * as dotenv from 'dotenv';
import giganttiScraper, { GIGANTTI_ID } from './providers/gigantti';
import powerScraper, { POWER_ID } from './providers/power';
import data from './db.json';
dotenv.config();
import type { Product, ProductToScrape, ProductPrice } from './type';

export default async function (product: Product) {
  const { id } = product;
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
        default:
          break;
      }
      if (price) {
        prices = [...prices, price];
      }
    }
  }
  return prices;
}