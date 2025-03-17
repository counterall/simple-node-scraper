import steamApi, { STEAM_ID } from './providers/steam';
import loadData from './data';
import type { Product, ProductToScrape, ProductPrice } from './type';

export default async function (product: Product) {
  const { id } = product;
  let { productsToScrape }: { productsToScrape: ProductToScrape[] } = await loadData();
  productsToScrape = productsToScrape.filter((product: ProductToScrape) => product.productId === id)
  let prices: ProductPrice[] = [];
  if (productsToScrape.length) {
    for(const product of productsToScrape) {
      let price: ProductPrice | undefined;
      const { providerId, appId } = product;
      if (appId) {
        switch (providerId) {
          case STEAM_ID:
            price = await steamApi(appId);
            break;
          default:
            break;
        }
      }
      if (price?.price) {
        prices = [...prices, price];
      }
    }
  }
  return prices;
}