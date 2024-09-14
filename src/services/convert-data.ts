type Box = {
  id: number;
  carta: string;
  url: string;
  quantidade: number;
  genero: "F" | "M";
  faixaEtaria: string;
  itens: Array<string>;
  etapas: Array<object>;
};

type DetailsOrder = {
  id: number;
  status: string;
  doador: {
    id: number;
    nome: string;
    email: string;
    telefone: string;
  };
  caixas: Array<Box>;
};

type DataPDF = {
  id: number;
  doador: {
    nome: string;
    telefone: string;
  };
  caixa: {
    id: number;
    carta: string;
    url: string;
    quantidade: number;
    genero: "F" | "M";
    faixaEtaria: string;
    itens: Array<string>;
  };
};


export default function convertDataForPDF(data: Array<DetailsOrder>): Array<DataPDF> {
  let vetor: Array<DataPDF> = [];

  data.forEach((element) => {
    element.caixas.forEach((caixaAtual) => {
      let pedido: DataPDF = {
        id: element.id,
        doador: {
          nome: element.doador.nome,
          telefone: element.doador.telefone,
        },
        caixa: {
          id: caixaAtual.id,
          carta: caixaAtual.carta,
          url: caixaAtual.url,
          quantidade: caixaAtual.quantidade,
          genero: caixaAtual.genero,
          faixaEtaria: caixaAtual.faixaEtaria,
          itens: caixaAtual.itens,
        },
      };
      vetor.push(pedido);
    });
  });

  return vetor;
}
