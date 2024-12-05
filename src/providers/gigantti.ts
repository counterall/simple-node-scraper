import * as cheerio from 'cheerio';

export default async function(productRelativeUrl: string) {
  let result = {};
  try{
    const productUrl = `${process.env.GIGANTTI_BASE_URL}${productRelativeUrl}`;
    const $gigantti = await cheerio.fromURL(productUrl);
    const parentAttr = "[data-cro=\"pdp-main-price-box\"]";
    const priceClass= "inc-vat";
    result = {
      "store": "Gigantti",
      "price": $gigantti(`${parentAttr} .${priceClass}`).text() || 0
    };
    console.log({ productUrl, result })
  } catch (error: any) {
    throw new Error(error);
  }

  return result;
}