import axios from 'axios';
import * as cheerio from 'cheerio';
import type { ProductPrice } from '../type';
import data from '../db.json';

export const VK_ID = 'vk';

export default async function(productRelativeUrl: string) {
	let result: ProductPrice | undefined;
  const { providers } = data;
  const provider = providers.find(p => p.id === VK_ID);

  if (provider && provider.enabled) {
    const { name, baseUrl } = provider;
    try{
      const productUrl = `${baseUrl}${productRelativeUrl}`;
			const headers = {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0'
			}
			const response = await axios.get(productUrl, {
					headers,
			})
      const $vk = await cheerio.load(response.data);
      const parentAttr = "[data-price=\"current\"]";
      const priceTxt = $vk(`${parentAttr}`).prop('value') || "";
      const price = parseInt(priceTxt);
      result = {
        store: name,
        price
      };
    } catch (error: any) {
      console.log(error);
    }
  }
  return result;
}