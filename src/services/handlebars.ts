import Handlebars from "handlebars";
import fs from "fs/promises";

Handlebars.registerHelper("grouped_each", function (every, context, options) {
  var out = "",
    subGroup = [];

  for (var i = 0, j = context.length; i < j; i++) {
    if (i > 0 && i % every === 0) {
      out += options.fn(subGroup);
      subGroup = [];
    }
    subGroup.push(context[i]);
  }

  out += options.fn(subGroup);
  return out;
});

export default async function compile(dataPDF: any): Promise<string | null> {
  try {
    const html = await fs.readFile("template-pdf.html", "utf-8");
    const template = Handlebars.compile(html);
    const content = template(dataPDF);
    return content;
  } catch (err) {
    console.log(err);
    return null;
  }
}
