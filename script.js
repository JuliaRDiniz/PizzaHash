document.addEventListener("DOMContentLoaded", function () {
  let carrinho = [];

  const btnAddCarrinho = document.querySelectorAll(".addCarrinho");

  btnAddCarrinho.forEach((botao) => {
    botao.addEventListener("click", function () {
      // Pega a div onde o botão está (o card da pizza)
      let estiloPizza = botao.parentElement;

      let imagem = estiloPizza.querySelector("img").src;
      let nome = estiloPizza.querySelector("h3").innerText;

      let precoAtual = estiloPizza
        .querySelector("p")
        .firstChild.textContent.trim();
      precoAtual = precoAtual.replace("R$", "").trim();

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

    carrinhoContainer.innerHTML = "";

    if (carrinho.length === 0) {
      carrinhoContainer.innerHTML = "<p>Carrinho Vazio</p>";
      precoTotal.textContent = "";
      btnFinalizarCompra.style.display = "none";
      iconeCarrinho.style.color = "white";

      return;
    }

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
      precoTotal.textContent = "";
    } else {
      precoTotal.textContent = `Total: R$${total.toFixed(2)}`;
      btnFinalizarCompra.style.display = "block";
    }

    document.querySelectorAll(".remover-btn").forEach((botao) => {
      botao.addEventListener("click", function () {
        let index = this.getAttribute("data-index");
        removerDoCarrinho(index);
      });
    });
  }

  btnFinalizarCompra.addEventListener("click", function () {
    carrinho = [];
    carrinhoContainer.innerHTML = "<p>Carrinho Vazio</p>";
    precoTotal.textContent = "";
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
    carrinho.splice(index, 1);
    atualizarCarrinho();
  }

  atualizarCarrinho();

  const menuBtn = document.querySelector("#menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  menuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("show");
  });
});
