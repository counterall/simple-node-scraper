import puppeteer from "puppeteer";
import type { ProductPrice } from '../type';
import data from '../db.json';
import logger from "../logger";

export const TELIA_ID = "telia";

export default async function(productRelativeUrl: string) {
  let result: ProductPrice | undefined;
  const { providers } = data;
  const provider = providers.find(p => p.id === TELIA_ID);
  if (provider && provider.enabled) {
    const { name, baseUrl } = provider;
    let browser; 
    try{
      const productUrl = `${baseUrl}${productRelativeUrl}`;
      // launch the browser in headless mode
      browser = await puppeteer.launch({args: ["--no-sandbox"]});
      const page = await browser.newPage();
      await page.goto(productUrl);
      const priceContainer = await page.waitForSelector(
        '.price-now',
      );
      const priceTxt = await priceContainer?.evaluate(el => el.textContent);  
      result = {
        store: name,
        price: parseInt(priceTxt || "")
      };
    } catch (error: any) {
      console.log(error);
      logger.error(error);
    }
    await browser?.close();
  }

  return result;
}