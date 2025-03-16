import * as dotenv from 'dotenv';
import giganttiScraper, { GIGANTTI_ID } from './providers/gigantti';
import powerScraper, { POWER_ID } from './providers/power';
import vkScraper, { VK_ID } from './providers/vk';
import dnaScraper, { DNA_ID } from './providers/dna';
import elisaScraper, { ELISA_ID } from './providers/elisa';
import teliaScraper, { TELIA_ID } from './providers/telia';
import data from './db.json';
dotenv.config();
import type { Product, ProductToScrape, ProductPrice } from './type';

export default async function (product: Product) {
  const { id, thresholdPrice, normalPrice } = product;
  let { productsToScrape } = data;
  const { providers } = data;
  productsToScrape = productsToScrape.filter((product: ProductToScrape) => {
    const providerFound = providers.find((provider) => provider.id === product.providerId);
    if (providerFound && providerFound.enabled && product.productId === id) {
      return true;
    }
    return false;
  })
  let prices: ProductPrice[] = [];
  if (productsToScrape.length) {
    for(const product of productsToScrape) {
      let price: ProductPrice | undefined;
      const { providerId, relativeUrl, payload } = product;
      const providerFound = providers.find((provider) => provider.id === providerId);
      const scrapingType = providerFound?.type 
      if (scrapingType === "dom" && relativeUrl) {
        switch (providerId) {
          case VK_ID:
              price = await vkScraper(relativeUrl);
              break;
          case DNA_ID:
              price = await dnaScraper(relativeUrl);
              break;
          case ELISA_ID:
              price = await elisaScraper(relativeUrl);
              break;
          default:
            break;
        }
      } else if (scrapingType === "api" && payload) {
        switch (providerId) {
          case POWER_ID:
            price = await powerScraper(payload);
            break;
          case TELIA_ID:
            price = await teliaScraper(payload);
            break;
          case GIGANTTI_ID:
            price = await giganttiScraper(payload);
            break;
          default:
            break;
        }
      }
      
      if (price?.price) {
        const thredsholdTriggered = thresholdPrice ? price.price <= thresholdPrice : price.price < normalPrice;
        if (thredsholdTriggered){
          prices = [...prices, price];
        }
      }
    }
  }
  return prices;
}