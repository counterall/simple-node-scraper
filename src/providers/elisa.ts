import * as cheerio from 'cheerio';
import type { ProductPrice } from '../type';
import loadData from '../data';
import logger from "../logger";

export const ELISA_ID = 'elisa';

export default async function(productRelativeUrl: string) {
  let result: ProductPrice | undefined;
  const { providers } = await loadData();
  const provider = providers.find(p => p.id === ELISA_ID);

  if (provider && provider.enabled) {
    const { name, baseUrl } = provider;
    try{
      const productUrl = `${baseUrl}${productRelativeUrl}`;
      const $elisa = await cheerio.fromURL(productUrl);
      const priceClass= "ds-price-content-number";
      const priceTxt = $elisa(`.${priceClass}`).text() || "";
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