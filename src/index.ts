import * as cheerio from 'cheerio';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const scraper = async () => {
  const s9UltraUrlGigantti = "https://www.gigantti.fi/product/puhelimet-tabletit-ja-alykellot/tabletit/samsung-galaxy-tab-s9-ultra-wifi-tabletti-12256-gb-grafiitti/630946";
  const ntfyUrl = process.env.NTFY_URL;
  try {
    const $gigantti = await cheerio.fromURL(s9UltraUrlGigantti);

    const parentAttr = "[data-cro=\"pdp-main-price-box\"]";
    const priceClass= "inc-vat";
    const result = {
      "store": "Gigantti",
      "price": $gigantti(`${parentAttr} .${priceClass}`).text() || 0
    };
    if (ntfyUrl) {
      axios.post(ntfyUrl, result);
    }
  } catch (error) {
    console.log(error)
  }
}

setInterval(async() => {
  await scraper();
}, 600000);