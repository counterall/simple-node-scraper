import axios from 'axios';
import * as dotenv from 'dotenv';
import giganttiScraper from './providers/gigantti';
import powerScraper from './providers/power';
dotenv.config();

const scraper = async () => {
  const ntfyUrl = process.env.NTFY_URL;
  try {
    const giganttiResult = await giganttiScraper("/puhelimet-tabletit-ja-alykellot/tabletit/samsung-galaxy-tab-s9-ultra-wifi-tabletti-12256-gb-grafiitti/630946");
    const poweresult = await powerScraper("/tietotekniikka/tabletit-ja-tarvikkeet/tablet-tietokoneet/samsung-galaxy-tab-s9-ultra-wifi-256-gt-graphite/p-2311617");
    const notification = [giganttiResult, poweresult];
    console.log({ notification });
    // if (ntfyUrl) {
    //   axios.post(ntfyUrl, notification);
    // }
  } catch (error: any) {
    console.log(error.message)
  }
}

scraper();

// Perodically check product prices
// setInterval(async() => {
//   await scraper();
// }, 600000);