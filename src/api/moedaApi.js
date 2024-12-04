import api from './api';  

export const obterCotacaoDeMoeda = async (moeda, dataCotacao) => {
  try {
    const dataFormatada = dataCotacao.split('/').reverse().join('-'); // Exemplo: '11-01-2024'
    
    const url = `/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${moeda}'&@dataCotacao='${dataFormatada}'&$top=1&$format=json`;
    
    const response = await api.get(url);
    
    if (response.data.value && response.data.value.length > 0) {
      return response.data.value[0];  
    } else {
      console.error(`Não foi possível obter a cotação para a moeda ${moeda}`);
      return null;
    }
  } catch (error) {
    console.error(`Erro ao obter a cotação de ${moeda}: `, error.response ? error.response.data : error.message);
    return null;
  }
};
