import axios from 'axios';
import type { ProductPrice } from '../type';
import loadData from '../data';
import logger from "../logger";

export const GIGANTTI_ID = 'gigantti';

export default async function(payload: { id: string}) {
  let result: ProductPrice | undefined;
  const { providers } = await loadData();
  const provider = providers.find(p => p.id === GIGANTTI_ID);

  if (provider && provider.enabled && payload?.id) {
    const { name, baseUrl } = provider;
    try{
      const response = await axios.get(`${baseUrl}/${payload.id}`)
      const price = response.data?.price?.current[0];
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