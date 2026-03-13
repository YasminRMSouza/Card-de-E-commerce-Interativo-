// =====================
//       CARROSSEL
// =====================
const track = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    // 1. Atualiza o índice atual
    currentIndex = index;

    // 2. Move o trilho de imagens
    // Multiplica o índice por 100% para mover o trilho horizontalmente
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // 3. Atualiza os pontinhos ativos
    document.querySelector('.dot.active').classList.remove('active');
    dot.classList.add('active');
  });
});

// ===========================================
//     LÓGICA DE INTERATIVIDADE DO PROCUTO
// ===========================================

// --- ESTADO DA APLICAÇÃO ---
const precoBase = 499.99; // valor fixo do tênis
let quantidadeProduto = 1; // começa sempre em 1
let tamanhoSelecionado = null; // começa vazio, pois o usuário ainda não escolheu

// --- SELETORES DO DOM ---
// Capturando os elementos onde vamos injetar texto
const displayPreco = document.querySelector('.card-price');
const displayQuantidade = document.querySelector('.quantity-display');

// Capturando os botões que o usuário vai clicar
const botoesQuantidade = document.querySelectorAll('.quantity-btn');
const btnMenos = botoesQuantidade[0]; // primeiro botão do NodeList
const btnMais = botoesQuantidade[1]; // segundo botão do NodeList
const botoesTamanho = document.querySelectorAll('.size-btn');
const btnComprar = document.querySelector('.add-to-cart-btn');

// --- SELETORES DE MODAL ---
const modalOverlay = document.getElementById('successModal');
const modalText = document.getElementById('modalText');
const btnBuyNowModal = document.getElementById('buyNowModalBtn');
const btnAddToCartModal = document.getElementById('addToCartModalBtn')


// ===========================================
//     LÓGICA DE SELEÇÃO DE TAMANHO
// ===========================================

botoesTamanho.forEach(botao => {
  botao.addEventListener('click', () => {
    
    // 1- Varre todos os botões e tira a pintura azul (classe 'active') de quem tiver
    botoesTamanho.forEach(b => b.classList.remove('active'));

    // 2- Pinta de azul APENAS o botão que acabou de ser clicado
    botao.classList.add('active')

    // 3- Guarda a numeração (ex.: 39) na nossa variável de estado
    tamanhoSelecionado = botao.innerText;
  });
});

// ===========================================
//     LÓGICA DE QUANTIDADE E PREÇO
// ===========================================

// Função central que recalcula tudo e joga no HTML
function atualizarTela() {
  // atualiza o número 1 para o novo valor
  displayQuantidade.innerText = quantidadeProduto;

  // calcula a matemática básica
  const total = precoBase * quantidadeProduto;

  // formata o número do JS (499.99) para a moeda local (R$ 499,99)
  displayPreco.innerText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'});
}

// o que acontece ao clicar no botão +
btnMais.addEventListener('click', () => {
  quantidadeProduto++; // adiciona 1 à variável
  atualizarTela(); // chama a função para mudar o visual
});

// o que acontece ao clicar no botão -
btnMenos.addEventListener('click', () => {
  if (quantidadeProduto > 1 ) { // regra de negócio (validação): não deixar comprar 0 ou -1 tênis
    quantidadeProduto--; // subtrai 1 da variável
    atualizarTela(); // chama a função para mudar o visual
  }
});

// ===========================================
//     AÇÃO FINAL (BOTÃO DE COMPRA)
// ===========================================
btnComprar.addEventListener('click', () => {

  // validação: se a variável continua "null" (vazia), o usuário esqueceu de clicar num tamanho
  if (!tamanhoSelecionado) {
    alert('Por favor, selecione um tamanho antes de adicionar ao carrinho!');
    return; // o comando 'return' mata a execução aqui, impedindo que o código continue
  }

  // se o código chegou até aqui, é porque a validação passou!
  const totalFinal = precoBase * quantidadeProduto;
  const totalFormatado = totalFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'});

  // 1- em vez do alert, injetamos a mensagem dentro do <p> do modal
  modalText.innerHTML = `Você adicionou <strong>${quantidadeProduto} tênis tamanho ${tamanhoSelecionado}</strong> ao carrinho. <br><br>Total: <strong>${totalFormatado}</strong>`;

  // 2- adicionamos a classe 'active' para fazer o display: none virar display: flex
  modalOverlay.classList.add('active');
});

/// --- LÓGICA DOS BOTÕES DO MODAL ---

// 1. O que acontece ao clicar em "Adicionar ao carrinho"
btnAddToCartModal.addEventListener('click', () => {
  modalOverlay.classList.remove('active'); // fecha o modal
});

// 2. O que acontece ao clicar em "Comprar agora"
btnBuyNowModal.addEventListener('click', () => {
  
  // Trocamos o título e o texto do modal
  document.querySelector('.modal-title').innerText = '⏳ Processando...';
  modalText.innerHTML = 'Redirecionando você para a tela de pagamento seguro. Aguarde um instante.';

  // Escondemos os botões para o usuário não clicar em mais nada enquanto carrega
  document.querySelector('.modal-actions').style.display = 'none';

  // Iniciamos o cronômetro de 2 segundos (2000 milissegundos)
  setTimeout(() => {

    // Na vida real, aqui entraria o comando para mudar de págino:
    // window.location.href = 'link da página de pagamento.html'

    // como estamos simulando, vamos fechar o modal
    modalOverlay.classList.remove('active');

    // D) (Opcional) Limpamos a "bagunça" para o caso de o usuário abrir o modal de novo depois
    document.querySelector('.modal-title').innerText = '🎉 Sucesso!';
    document.querySelector('.modal-actions').style.display = 'flex';
  }, 2000); // 2000 = 2 segundos de espera

});

// Bônus: fechar o modal se o usuário clicar fora da caixa branca (no fundo escuro)
modalOverlay.addEventListener('click', (evento) => {
  if (evento.target === modalOverlay) {
    modalOverlay.classList.remove('active');
  }
});