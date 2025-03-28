document.addEventListener("DOMContentLoaded", function () {
  // Script simples para alternar o menu
  function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
  }
  toggleMenu();
});

document.addEventListener("DOMContentLoaded", function () {
  let carrinho = [];
  // Seleciona todos os botões
  const btnAddCarrinho = document.querySelectorAll(".addCarrinho");

  // Percorre cada botão e adiciona um evento de clique
  btnAddCarrinho.forEach((botao) => {
    botao.addEventListener("click", function () {
      // Pega a div onde o botão está (o card da pizza)
      let estiloPizza = botao.parentElement;

      let imagem = estiloPizza.querySelector("img").src;
      let nome = estiloPizza.querySelector("h3").innerText;

      let precoAtual = estiloPizza
        .querySelector("p")
        .firstChild.textContent.trim();
      precoAtual = precoAtual.replace("R$", "").trim(); // Remove o "R$" e espaços

      let precoAntigo = estiloPizza.querySelector("p span").innerText;

      let itemExistente = carrinho.find((item) => item.nomeItem === nome);

      if (itemExistente) {
        itemExistente.quantidade++;
      } else {
        let itemCarrinho = {
          imagem: imagem,
          nomeItem: nome,
          precoItem: parseFloat(precoAtual).toFixed(2),
          quantidade: 1,
        };
        carrinho.push(itemCarrinho);
      }

      iconeCarrinho.style.color = "red";
      atualizarCarrinho();
    });
  });

  const iconeCarrinho = document.querySelector("#icone-carrinho");
  let carrinhoModal = document.querySelector(".carrinho");
  const fecharModal = document.querySelector("#fechar-carrinho");

  iconeCarrinho.addEventListener("click", function () {
    carrinhoModal.style.display = "flex";
  });

  fecharModal.addEventListener("click", function () {
    carrinhoModal.style.display = "none";
  });

  let btnFinalizarCompra = document.querySelector(".finalizar-compra");
  let carrinhoContainer = document.getElementById("carrinho-itens");
  let precoTotal = document.getElementById("preco-total");

  function atualizarCarrinho() {
    let total = 0;
    // Limpa o carrinho antes de adicionar os itens (para não duplicar)
    carrinhoContainer.innerHTML = "";

    if (carrinho.length === 0) {
      carrinhoContainer.innerHTML = "<p>Carrinho Vazio</p>"; // Exibe mensagem se não houver itens
      precoTotal.textContent = ""; // Esconde o total
      btnFinalizarCompra.style.display = "none";
      iconeCarrinho.style.color = "white";

      return; // Sai da função para evitar adicionar itens inexistentes
    }

    // Percorre o array do carrinho e adiciona ao HTML
    carrinho.forEach((item, index) => {
      let div = document.createElement("div");
      div.innerHTML = `
        <img src="${item.imagem}" width="50">
        <span>${item.nomeItem}</span>
        <span> R$ ${item.precoItem}</span>
        <span>Qtd: ${item.quantidade}</span>
         <button class="remover-btn" data-index="${index}">Remover</button>
      `;
      carrinhoContainer.appendChild(div);

      total += parseFloat(item.precoItem) * item.quantidade;
    });

    if (carrinho.length === 0) {
      precoTotal.textContent = ""; // Esconde o total quando o carrinho estiver vazio
    } else {
      precoTotal.textContent = `Total: R$${total.toFixed(2)}`;
      btnFinalizarCompra.style.display = "block";
    }

    document.querySelectorAll(".remover-btn").forEach((botao) => {
      botao.addEventListener("click", function () {
        let index = this.getAttribute("data-index"); // Obtém o índice do item
        removerDoCarrinho(index); // Remove do carrinho
      });
    });
  }

  btnFinalizarCompra.addEventListener("click", function () {
    carrinho = [];
    carrinhoContainer.innerHTML = "<p>Carrinho Vazio</p>"; // Exibe mensagem se não houver itens
    precoTotal.textContent = ""; // Esconde o total
    btnFinalizarCompra.style.display = "none";
    iconeCarrinho.style.color = "white";
    carrinhoModal.style.display = "none";

    let toast = document.getElementById("toast");
    toast.classList.add("mostrar");

    setTimeout(() => {
      toast.classList.remove("mostrar");
    }, 4000);
  });

  function removerDoCarrinho(index) {
    carrinho.splice(index, 1); // Remove 1 item na posição "index"
    atualizarCarrinho(); // Atualiza a lista do carrinho na tela
  }

  atualizarCarrinho();

  const menuBtn = document.querySelector("#menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  menuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("show");
  });
});
