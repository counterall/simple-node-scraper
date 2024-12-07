import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
import type { Notification } from './type';

export default function (payload: Notification[]) {
  const ntfyUrl = process.env.NTFY_URL;
  
  if (ntfyUrl) {
    axios.post(ntfyUrl, payload, {
      headers: {
        'Title': "Hello World"
      }
    });
  }
}