const urlLoterias = [
    { url: "https://loteriascaixa-api.herokuapp.com/api/megasena/latest", id: "megaSena" },
    { url: "https://loteriascaixa-api.herokuapp.com/api/duplasena/latest", id: "duplaSena" },
    { url: "https://loteriascaixa-api.herokuapp.com/api/quina/latest", id: "Quina" },
    { url: "https://loteriascaixa-api.herokuapp.com/api/federal/latest", id: "federal" },
    { url: "https://loteriascaixa-api.herokuapp.com/api/lotofacil/latest", id: "lotofacil" },
    { url: "https://loteriascaixa-api.herokuapp.com/api/lotomania/latest", id: "lotomania" },
    { url: "https://loteriascaixa-api.herokuapp.com/api/maismilionaria/latest", id: "maisMilionaria" },
    { url: "https://loteriascaixa-api.herokuapp.com/api/supersete/latest", id: "superSete" },
    { url: "https://loteriascaixa-api.herokuapp.com/api/diadesorte/latest", id: "diaSorte" },
    { url: "https://loteriascaixa-api.herokuapp.com/api/timemania/latest", id: "timeMania" }
];



async function buscarResultado() {
    for (const loteria of urlLoterias) {
        try {
            const resposta = await fetch(loteria.url, {
                method: "GET",
                headers: {
                    "Accept": "*/*"
                }
            });

            if (!resposta.ok) {
                throw new Error('Erro na requisição: ' + resposta.status);
            }

            const dados = await resposta.json();
            const concurso = dados.concurso;
            const dataConcurso = dados.data;
            let dezenas;

            if (loteria.id === "duplaSena") {

                const dezenasPrimeiroSorteio = dados.dezenas.slice(0, 6).join(', ');
                const dezenasSegundoSorteio = dados.dezenas.slice(6, 12).join(', ');
                dezenas = `Dezenas do primeiro sorteio: ${dezenasPrimeiroSorteio} <br> Dezenas do segundo sorteio: ${dezenasSegundoSorteio}`;
            } else {
                dezenas = dados.dezenas.join(', ');
            }

            let ganhadoresEpremioInfo = '';
            const faixaPrincipal = dados.premiacoes[0];

            if (faixaPrincipal.ganhadores === 0) {
                const valorAcumuladoTotal = dados.valorEstimadoProximoConcurso;
                ganhadoresEpremioInfo = `Não houve ganhadores, valor estimado para o próximo concurso R$${valorAcumuladoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            } else {
                ganhadoresEpremioInfo = `Número de ganhadores: ${faixaPrincipal.ganhadores}, valor do prêmio recebido: R$${faixaPrincipal.valorPremio.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }

            const card = document.getElementById(loteria.id);
            card.querySelector('.descriptionCard:nth-of-type(1)').textContent += ` ${concurso}`;
            card.querySelector('.descriptionCard:nth-of-type(2)').textContent += ` ${dataConcurso}`;
            card.querySelector('.descriptionCard:nth-of-type(3)').innerHTML += ` ${dezenas}`;
            card.querySelector('.descriptionCard:nth-of-type(5)').innerHTML += ` ${ganhadoresEpremioInfo}`;

            if (loteria.id === "maisMilionaria") {
                const trevo = dados.trevos;
                card.querySelector('.descriptionCard:nth-of-type(4)').textContent += ` ${trevo}`;
            }

            if (loteria.id === "diaSorte") {
                const diaSorte = dados.mesSorte;
                card.querySelector('.descriptionCard:nth-of-type(4)').textContent += ` ${diaSorte}`;
            }

            if (loteria.id === "timeMania") {
                const time = dados.timeCoracao;
                card.querySelector('.descriptionCard:nth-of-type(4)').textContent += ` ${time}`;
            }

        } catch (error) {
            console.error('Erro:', error);
        }
    }
}

buscarResultado();
