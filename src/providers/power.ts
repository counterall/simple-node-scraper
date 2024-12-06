import puppeteer from "puppeteer";

export default async function(productRelativeUrl: string) {
  let result = {};
  try{
    const productUrl = `${process.env.POWER_BASE_URL}${productRelativeUrl}`;
    console.log({ productUrl })
    // launch the browser in headless mode
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(productUrl);
    const priceContainer = await page.waitForSelector(
      '.price-container',
    );
    const priceTxt = await priceContainer?.evaluate(el => el.textContent);
    await browser.close();

    result = {
      "store": "Power",
      "price": priceTxt || 0
    };
  } catch (error: any) {
    throw new Error(error);
  }

  return result;
}