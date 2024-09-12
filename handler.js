// import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer';
import 'dotenv/config';
import Handlebars from 'handlebars';
import fs from 'fs/promises'

Handlebars.registerHelper('grouped_each', function(every, context, options) {
    var out = "", subGroup = [];
    
    for(var i=0, j=context.length; i<j; i++) {
        if(i > 0 && i % every === 0) {
            out += options.fn(subGroup);
            subGroup = [];
        }
        subGroup.push(context[i]);
    }
    
    out += options.fn(subGroup);
    return out;
});

const teste = [{
	"id": 5,
	"status": "Processando",
	"doador": {
		"id": 3,
		"nome": "Teste Nova API ",
		"email": "contato.edusousa1@gmail.com",
		"telefone": "11948738844"
	},
	"caixas": [
		{
			"id": 5,
			"carta": "carta_aa45a64e8e58",
			"url": "url_e1ba5e609a55",
			"quantidade": 1,
			"genero": "F",
			"faixaEtaria": "Criança",
			"itens": [
				"Camiseta",
				"Laptop",
				"Livro de Ficção"
			],
			"etapas": [
				{
					"status": "Pronta para montagem",
					"update": "2024-08-10"
				}
			]
		},
		{
			"id": 6,
			"carta": "carta_aa45a64e8e58",
			"url": "url_e1ba5e609a55",
			"quantidade": 1,
			"genero": "F",
			"faixaEtaria": "Criança",
			"itens": [
				"Camiseta",
				"Laptop",
				"Livro de Ficção"
			],
			"etapas": [
				{
					"status": "Pronta para montagem",
					"update": "2024-08-10"
				}
			]
		}
	]
}]

function generatedDataPDF(params) {
    let vetor = []
    params.forEach(element => {
        element.caixas.forEach(caixaAtual => {

            let pedido = {
                id: element.id,
                doador: {
                    nome: element.doador.nome,
                    telefone: element.doador.telefone
                },
                caixa: {
                    id: caixaAtual.id,
                    carta: caixaAtual.carta,
                    url: caixaAtual.url,
                    quantidade: caixaAtual.quantidade,
                    genero: caixaAtual.genero,
                    faixaEtaria: caixaAtual.faixaEtaria,
                    itens: caixaAtual.itens
                },
            }
            vetor.push(pedido)

        })
    });

    return vetor
}

async function config() {
    let browser;

    if(process.env.ENV === 'dev') {
        browser = await puppeteer.launch();
    } else {
        browser = await puppeteer.launch({
            executablePath: await chromium.executablePath(),
            headless: false,
            defaultViewport: chromium.defaultViewport,
            args: [...chromium.args]
        })
    }

    const html = await fs.readFile('./template.html', 'utf-8')
    const template = Handlebars.compile(html)
	console.log(template)

	let maisUmTeste = generatedDataPDF(teste)
	const dataPDF = {
        data: '2024-09-12',
        dados: maisUmTeste
    }
    const content = template(dataPDF)

    try {
		let page = await browser.newPage()
		await page.setContent(content)

		const pdf = await page.pdf({
			path: "result.pdf",
			format: "A4"
		})


    } catch (error) {
        console.log("PuppeteerHTMLPDF error", error);
    }

	await browser.close()

}

config()

