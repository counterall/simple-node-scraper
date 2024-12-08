import axios from 'axios';
import type { ProductPrice } from '../type';
import data from '../db.json';

export const STEAM_ID = 'steam';

export default async function(appId: string) {
  let result: ProductPrice | undefined;
  const { providers } = data;
  const provider = providers.find(p => p.id === STEAM_ID);

  if (provider && provider.enabled) {
    const { name, baseUrl } = provider;
    try{
      const response = await axios.get(baseUrl, {
        params: {
          appids: appId,
          cc: "fi",
          l: "english",
        },
      })
      const priceDetail = response.data[appId]?.data?.price_overview;
      if(priceDetail) {
        const { initial, final, discount_percent } = priceDetail;
        result = {
          store: name,
          price: final ? final/100 : 0,
          initialPrice: initial ? initial/100 : 0,
          discount: `${discount_percent}%`
        };
      }
      
    } catch (error: any) {
      console.log(error);
    }
  }
  return result;
}