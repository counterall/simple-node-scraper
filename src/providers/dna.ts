import * as cheerio from 'cheerio';
import type { ProductPrice } from '../type';
import data from '../db.json';
import logger from "../logger";

export const DNA_ID = 'dna';

export default async function(productRelativeUrl: string) {
  let result: ProductPrice | undefined;
  const { providers } = data;
  const provider = providers.find(p => p.id === DNA_ID);

  if (provider && provider.enabled) {
    const { name, baseUrl } = provider;
    try{
      const productUrl = `${baseUrl}${productRelativeUrl}`;
      const $dna = await cheerio.fromURL(productUrl);
      const priceAttr= "[data-testid=\"product-selected-price\"]";
      const priceTxt = $dna(`${priceAttr}`).text() || "";
      const price = parseInt(priceTxt.split("€")[0]);
      result = {
        store: name,
        price
      };
    } catch (error: any) {
      console.log(error);
      logger.error(error);
    }
  }
  return result;
}