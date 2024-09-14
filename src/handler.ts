import configBrowser from "./services/puppeteer-browser";
import dayjs from "dayjs";
import convertDataForPDF from "./services/convert-data";
import compile from "./services/handlebars";

export const handler = async (event: any, res: any) => {
  let pdfBase64;
  let browser = await configBrowser();

  const dataPDF = {
    data: dayjs().format("DD MMMM, YYYY"),
    dados: convertDataForPDF(event.body),
  };
  const content = await compile(dataPDF);

  try {
    let page = await browser.newPage();
    await page.setContent(content);

    let pdf = await page.pdf({ format: "A4" });
    pdfBase64 = Buffer.from(pdf.buffer).toString("base64");
    await page.close();
    await browser.close();

    res.contentType("application/pdf");
    res.send(Buffer.from(pdfBase64, 'base64'));

  } catch (error) {
    console.log("PuppeteerHTMLPDF error", error);
  }
};

