import axios from 'axios';
import * as dotenv from 'dotenv';
import giganttiScraper from './providers/gigantti';
dotenv.config();

const scraper = async () => {
  const ntfyUrl = process.env.NTFY_URL;
  try {
    const result = await giganttiScraper("/puhelimet-tabletit-ja-alykellot/tabletit/samsung-galaxy-tab-s9-ultra-wifi-tabletti-12256-gb-grafiitti/630946");
    if (ntfyUrl) {
      axios.post(ntfyUrl, result);
    }
  } catch (error: any) {
    console.log(error.message)
  }
}

scraper();

// setInterval(async() => {
//   await scraper();
// }, 600000);