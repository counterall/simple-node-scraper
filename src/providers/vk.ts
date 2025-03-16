import axios from 'axios';
import type { ProductPrice } from '../type';
import data from '../db.json';
import logger from "../logger";

export const VK_ID = 'vk';

export default async function(payload: { id: string}) {
	let result: ProductPrice | undefined;
  const { providers } = data;
  const provider = providers.find(p => p.id === VK_ID);

  if (provider && provider.enabled && payload?.id) {
    const { name, baseUrl } = provider;
    try{
      const response = await axios.get(baseUrl, {
        params: {
          pids: payload.id
        }
      })
      const price = response.data[0]?.price
      if(price) {
        const vatPrice =  price * 1.255
        result = {
          store: name,
          price: Number(vatPrice.toFixed(2))
        };
      }
    } catch (error: any) {
      console.log(error);
			logger.error(error);
    }
  }
  return result;
}