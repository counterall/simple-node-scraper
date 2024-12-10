import puppeteer from "puppeteer";
import type { ProductPrice } from '../type';
import data from '../db.json';

export const POWER_ID = "power";

export default async function(productRelativeUrl: string) {
  let result: ProductPrice | undefined;
  const { providers } = data;
  const provider = providers.find(p => p.id === POWER_ID);
  if (provider && provider.enabled) {
    const { name, baseUrl } = provider;
    try{
      const productUrl = `${baseUrl}${productRelativeUrl}`;
      // launch the browser in headless mode
      const browser = await puppeteer.launch({args: ["--no-sandbox"]});
      const page = await browser.newPage();
      await page.goto(productUrl);
      const priceContainer = await page.waitForSelector(
        '.price-container',
      );
      const priceTxt = await priceContainer?.evaluate(el => el.textContent);
      await browser.close();
  
      result = {
        store: name,
        price: parseInt(priceTxt || "")
      };
    } catch (error: any) {
      console.log(error);
    }
  }

  return result;
}