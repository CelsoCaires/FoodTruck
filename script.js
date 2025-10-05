// Função para alterar a quantidade de itens no pedido
function alterarQtd(item, qtd) {
  let input = document.getElementById(`qtd-${item}`);
  let novaQtd = parseInt(input.value) + qtd;
  if (novaQtd >= 0) {
    input.value = novaQtd;
    atualizarTotal(item);
  }
}

// Função para atualizar o total de cada item
function atualizarTotal(item) {
  let qtd = parseInt(document.getElementById(`qtd-${item}`).value);
  let preco = 0;

  if (item === 'margherita') preco = 11.00;
  if (item === 'peperoni') preco = 10.00;
  if (item === 'coca') preco = 4.00;
  if (item === 'fanta-laranja') preco = 4.00;
  if (item === 'fanta-uva') preco = 4.00;
  if (item === 'sprite') preco = 4.00;

  let totalItem = qtd * preco;
  document.getElementById(`total-${item}`).textContent = `Total: R$ ${totalItem.toFixed(2)}`;
  atualizarTotalGeral();
}

// Função para calcular o total geral
function atualizarTotalGeral() {
  let totais = document.querySelectorAll('.total-produto');
  let totalGeral = 0;
  totais.forEach(function (total) {
    let valor = parseFloat(total.textContent.replace('Total: R$ ', ''));
    totalGeral += valor;
  });
  document.getElementById('total-geral').textContent = `R$ ${totalGeral.toFixed(2)}`;
}

// Função para mostrar os campos do cartão
function mostrarCamposCartao() {
  let camposCartao = document.getElementById('dados-cartao');
  camposCartao.style.display = 'block';
}

// Função para detectar a bandeira do cartão (apenas exemplo básico)
function detectarBandeira() {
  let numeroCartao = document.getElementById('numero-cartao').value;
  let bandeira = 'Desconhecida';
  
  if (numeroCartao.startsWith('4')) bandeira = 'Visa';
  if (numeroCartao.startsWith('5')) bandeira = 'Mastercard';
  document.getElementById('bandeira-cartao').textContent = `Bandeira: ${bandeira}`;
}

// Função para enviar o pedido (simulação)
function enviarPedido() {
  alert("Pedido enviado com sucesso!");
}
function verificarMesa() {
  const numeroMesa = document.getElementById('numero-mesa').value;
  const mensagemMesa = document.getElementById('mensagem-mesa');

  if (numeroMesa > 0) {
    mensagemMesa.textContent = `Mesa ${numeroMesa} localizada! Faça seu pedido.`;
  } else {
    mensagemMesa.textContent = 'Por favor, insira um número de mesa válido!';
  }
}
// Carrinho de pedidos
let carrinho = [];

// Função para adicionar ao pedido
function adicionarAoPedido(nomeProduto, precoProduto) {
  const quantidadeProduto = document.querySelector('#quantidade-produto').value;

  if (quantidadeProduto < 1) {
    alert("Quantidade inválida. Adicione pelo menos 1 item.");
    return;
  }

  // Verificar se o produto já existe no carrinho
  const produtoExistente = carrinho.find(item => item.nome === nomeProduto);
  if (produtoExistente) {
    produtoExistente.quantidade += parseInt(quantidadeProduto);
  } else {
    carrinho.push({
      nome: nomeProduto,
      preco: precoProduto,
      quantidade: parseInt(quantidadeProduto)
    });
  }

  atualizarCarrinho();
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
  const carrinhoElement = document.querySelector('#carrinho');
  carrinhoElement.innerHTML = "";  // Limpa o carrinho visual

  carrinho.forEach(item => {
    const itemCarrinho = document.createElement('div');
    itemCarrinho.classList.add('item-carrinho');
    itemCarrinho.innerHTML = `
      <p>${item.nome} - ${item.quantidade} x R$ ${item.preco.toFixed(2)}</p>
      <p>Total: R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
    `;
    carrinhoElement.appendChild(itemCarrinho);
  });

  // Exibir total
  const totalCarrinho = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  document.querySelector('#total-pedido').textContent = `Total: R$ ${totalCarrinho.toFixed(2)}`;
}
