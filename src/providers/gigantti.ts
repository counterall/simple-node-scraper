import * as cheerio from 'cheerio';

export default async function(productRelativeUrl: string) {
  let result = {};
  try{
    const productUrl = `${process.env.GIGANTTI_BASE_URL}${productRelativeUrl}`;
    const $gigantti = await cheerio.fromURL(productUrl);
    const parentAttr = "[data-cro=\"pdp-main-price-box\"]";
    const priceClass= "inc-vat";
    const priceTxt = $gigantti(`${parentAttr} .${priceClass}`).text() || "";
    const price = parseInt(priceTxt.split("€")[0]);
    result = {
      store: "Gigantti",
      price
    };
  } catch (error: any) {
    throw new Error(error);
  }

  return result;
}