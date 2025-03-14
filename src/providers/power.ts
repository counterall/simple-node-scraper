import axios from 'axios';
import type { ProductPrice } from '../type';
import data from '../db.json';
import logger from "../logger";

export const POWER_ID = "power";

export default async function(payload: { id: string}) {
  let result: ProductPrice | undefined;
  const { providers } = data;
  const provider = providers.find(p => p.id === POWER_ID);
  if (provider && provider.enabled && payload?.id) {
    const { name, baseUrl } = provider;
    try{
      const response = await axios.get(baseUrl, {
        params: {
          ids: payload.id
        }
      })
      const price = response.data[0]?.price;
      if(price) {
        result = {
          store: name,
          price
        };
      }
    } catch (error: any) {
      console.log(error);
      logger.error(error);
    }
  }

  return result;
}