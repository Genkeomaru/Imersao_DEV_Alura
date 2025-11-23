let cardContainer = document.querySelector(".card-container");
let dados = [];
let dadosJaCarregados = false;

async function IniciarBusca() {
    if (!dadosJaCarregados) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
            dadosJaCarregados = true;
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            cardContainer.innerHTML = "<p>Erro ao carregar os dados. Tente novamente mais tarde.</p>";
            return;
        }
    }

    let searchTerm = document.querySelector(".search-container input").value.toLowerCase();
    
    let filteredData = dados.filter(dado => {
        const nome = dado.nome ? dado.nome.toLowerCase() : '';
        const descricao = dado.descricao ? dado.descricao.toLowerCase() : '';
        return nome.includes(searchTerm) || descricao.includes(searchTerm);
    });

    renderizarCards(filteredData);
}

function renderizarCards(cards) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes
    if (cards.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }
    for (let card of cards) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${card.nome}</h2>
        <p>Ano: ${card.data_criacao}</p>
        <p>${card.descricao}</p>
        <a href="${card.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

// Carrega todos os cards na inicialização da página
document.addEventListener("DOMContentLoaded", () => {
    IniciarBusca();
});