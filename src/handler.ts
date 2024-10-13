import configBrowser from "./services/puppeteer-browser";
import dayjs from "dayjs";
import convertDataForPDF from "./services/convert-data";
import compile from "./services/handlebars";

export const handler = async (event: any) => {
  console.time()
  let pdfBase64;
  let browser = await configBrowser();

  const dataPDF = {
    data: dayjs().format("DD MMMM, YYYY"),
    dados: convertDataForPDF(event.body),
  };

  try {
    const content = await compile(dataPDF);
    if (browser != undefined) {
      let page = await browser.newPage();
      page.setDefaultTimeout(240000)
      if(content != undefined) {
        await page.setContent(content);
      }

      let pdf = await page.pdf({ format: "A4" });
      pdfBase64 = Buffer.from(pdf.buffer).toString("base64");
      await page.close();
      await browser.close();
      return JSON.stringify({
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: pdfBase64,
        isBase64Encoded: true, 
      })
    }
  } catch (error) {
    console.log("PuppeteerHTMLPDF error", error);
  }
};
