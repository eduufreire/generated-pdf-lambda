import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer';
import puppeteerCore from 'puppeteer-core'
import 'dotenv/config';

export default async function configBrowser() {
    let browser;

    if(process.env.ENV === 'dev') {
        browser = await puppeteer.launch();
    } else {
        browser = await puppeteerCore.launch({
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
            defaultViewport: chromium.defaultViewport,
            args: [...chromium.args]
        })
    }

    return browser;
}