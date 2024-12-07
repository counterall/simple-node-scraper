import axios from 'axios';
import { format } from 'date-fns';
import * as dotenv from 'dotenv';
dotenv.config();
import type { Notification } from './type';

export default function (payload: Notification[]) {
  const ntfyUrl = process.env.NTFY_URL;
  const body: string[] = [];
  payload.forEach((nt: Notification) => {
    const { product, normalPrice, providers } = nt;
    const priceList = providers.map(p => `- ${p.store}: ${p.price}€`);
    const tmp = [
      `${product} (${normalPrice}€)`,
      priceList.join("\n")
    ];
    body.push(tmp.join("\n"));
  })
  if (ntfyUrl) {
    const updateAt = format(new Date(), 'yyyy-MM-dd HH:mm');
    axios.post(ntfyUrl, body.join("\n\n"), {
      headers: {
        'Title': `Price Update (${updateAt})`
      }
    });
  }
}