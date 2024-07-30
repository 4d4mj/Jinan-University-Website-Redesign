import { chromium } from "playwright-chromium";

let browser;
let page;

const getBrowserInstance = async () => {
  if (!browser) {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.route('**/*.{png,jpg,jpeg,svg,gif,css}', request => request.abort());
  }
  return { browser, page };
};

export default { getBrowserInstance };
