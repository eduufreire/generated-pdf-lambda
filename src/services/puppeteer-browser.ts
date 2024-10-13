import chromium from '@sparticuz/chromium'
import puppeteerCore from 'puppeteer-core'

export default async function configBrowser() {
    let browser;
   
    try {
        browser = await puppeteerCore.launch({
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
            defaultViewport: chromium.defaultViewport,
            args: [...chromium.args]
        })
        return browser;
    } catch (err) {
        console.log(err)
    }
}