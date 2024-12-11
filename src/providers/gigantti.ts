import * as cheerio from 'cheerio';
import type { ProductPrice } from '../type';
import data from '../db.json';
import logger from "../logger";

export const GIGANTTI_ID = 'gigantti';

export default async function(productRelativeUrl: string) {
  let result: ProductPrice | undefined;
  const { providers } = data;
  const provider = providers.find(p => p.id === GIGANTTI_ID);

  if (provider && provider.enabled) {
    const { name, baseUrl } = provider;
    try{
      const productUrl = `${baseUrl}${productRelativeUrl}`;
      const $gigantti = await cheerio.fromURL(productUrl);
      const parentAttr = "[data-cro=\"pdp-main-price-box\"]";
      const priceClass= "inc-vat";
      const priceTxt = $gigantti(`${parentAttr} .${priceClass}`).text() || "";
      const price = parseInt(priceTxt.split("€")[0]);
      result = {
        store: name,
        price
      };
    } catch (error: any) {
      // console.log(error);
      logger.error(error);
    }
  }
  return result;
}