document.addEventListener('DOMContentLoaded', () => {
    const formPedido = document.getElementById('form-pedido');
    const produtoSelect = document.getElementById('produto');
    const quantidadeInput = document.getElementById('quantidade');
    const precoInput = document.getElementById('preco');
    const btnAdicionarPedido = document.getElementById('btn-adicionar-pedido');
    const tbodyPedidos = document.getElementById('tbody-pedidos');
    const btnCadastrarPedido = document.getElementById('btn-cadastrar-pedido');
    const enderecoEntrega = document.getElementById('endereco-entrega');
    const radioSim = document.getElementById('entregasim');
    const radioNao = document.getElementById('entreganao');
    const enderecoInput = document.getElementById('endereco');

    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    const themeToggleButton = document.getElementById('theme-toggle');
    
    // Função para aplicar o tema
    function applyTheme(isDarkMode) {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            themeToggleButton.textContent = '🌙'; // Ícone para tema claro🌙
        } else {
            document.body.classList.remove('dark-mode');
            themeToggleButton.textContent = '🌕'; // Ícone para tema escuro🌕
        }
    }

    // Verificar a preferência do tema no localStorage
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    applyTheme(isDarkMode);

    // Alternar o tema ao clicar no botão
    themeToggleButton.addEventListener('click', () => {
        const currentIsDarkMode = document.body.classList.contains('dark-mode');
        applyTheme(!currentIsDarkMode);
        localStorage.setItem('dark-mode', !currentIsDarkMode);
    });
    // Carregar produtos no select
    function carregarProdutos() {
        produtoSelect.innerHTML = '<option value="" selected>Selecione um produto</option>';
        produtos.forEach(produto => {
            const option = document.createElement('option');
            option.value = produto.nome;
            option.textContent = produto.nome;
            produtoSelect.appendChild(option);
        });
    }
    carregarProdutos();

    // Atualizar o campo de preço quando o produto é selecionado
    produtoSelect.addEventListener('change', () => {
        const nomeProduto = produtoSelect.value;
        const produtoSelecionado = produtos.find(produto => produto.nome === nomeProduto);
        if (produtoSelecionado) {
            precoInput.value = produtoSelecionado.preco.toFixed(2);
            calcularValorTotal(); // Atualiza o valor total ao mudar o produto
        } else {
            precoInput.value = '';
        }
    });

    // Calcular valor total baseado na quantidade e preço
    function calcularValorTotal() {
        const preco = parseFloat(precoInput.value);
        const quantidade = parseInt(quantidadeInput.value, 10);
        if (!isNaN(preco) && !isNaN(quantidade)) {
            const valorTotal = quantidade * preco;
            document.getElementById('valor-total').textContent = valorTotal.toFixed(2);
        } else {
            document.getElementById('valor-total').textContent = '0.00';
        }
    }

    // Atualiza o valor total quando a quantidade muda
    quantidadeInput.addEventListener('input', calcularValorTotal);

    // Adicionar pedido
    btnAdicionarPedido.addEventListener('click', (event) => {
        event.preventDefault();

        const produto = produtoSelect.value;
        const quantidade = parseInt(quantidadeInput.value, 10);
        const preco = parseFloat(precoInput.value);

        if (!produto || isNaN(quantidade) || isNaN(preco)) {
            alert('Preencha todos os campos corretamente.');
            return;
        }

        const valorTotal = quantidade * preco;
        const pedido = { produto, quantidade, preco, valorTotal };

        pedidos.push(pedido);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        exibirPedidos();
        formPedido.reset();
        document.getElementById('valor-total').textContent = '0.00'; // Limpa o valor total
    });

    // Exibir pedidos
    function exibirPedidos() {
        tbodyPedidos.innerHTML = '';
        pedidos.forEach((pedido, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${pedido.produto}</td>
                <td>${pedido.quantidade}</td>
                <td>${pedido.preco.toFixed(2)}</td>
                <td>${pedido.valorTotal.toFixed(2)}</td>
                <td>
                    <button class="editar" data-index="${index}">Editar</button>
                    <button class="excluir" data-index="${index}">Excluir</button>
                </td>
            `;
            tbodyPedidos.appendChild(tr);
        });

        // Adicionar eventos de editar e excluir
        document.querySelectorAll('.editar').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                const pedido = pedidos[index];
                produtoSelect.value = pedido.produto;
                quantidadeInput.value = pedido.quantidade;
                precoInput.value = pedido.preco.toFixed(2);
                calcularValorTotal(); // Atualiza o valor total ao editar
                pedidos.splice(index, 1);
                localStorage.setItem('pedidos', JSON.stringify(pedidos));
                exibirPedidos();
            });
        });

        document.querySelectorAll('.excluir').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                pedidos.splice(index, 1);
                localStorage.setItem('pedidos', JSON.stringify(pedidos));
                exibirPedidos();
            });
        });
    }
    exibirPedidos();

    // Mostrar campo de endereço de entrega
    radioSim.addEventListener('change', () => {
        enderecoEntrega.style.display = 'block';
    });

    radioNao.addEventListener('change', () => {
        enderecoEntrega.style.display = 'none';
    });

    // Cadastrar pedido
    btnCadastrarPedido.addEventListener('click', () => {
        const pagamento = document.querySelector('input[name="pagamento"]:checked').id;
        const entrega = document.querySelector('input[name="entrega"]:checked').id;
        const observacoes = document.getElementById('observacoes').value;
        const endereco = enderecoInput.value;

        const pedidoFinalizado = {
            pedidos,
            pagamento,
            entrega,
            endereco: enderecoEntrega.style.display === 'block' ? endereco : 'Não se aplica',
            observacoes,
            data: new Date().toISOString() // Adiciona a data atual corretamente
        };

        // Salvar o pedido finalizado no localStorage ou enviar para um servidor
        let vendas = JSON.parse(localStorage.getItem('vendas')) || [];
        vendas.push(pedidoFinalizado);
        localStorage.setItem('vendas', JSON.stringify(vendas));

        // Limpar lista de pedidos e armazenamento local
        localStorage.removeItem('pedidos');
        pedidos = [];
        exibirPedidos();
    });

    // Adicionar um ouvinte de evento para o botão de cadastrar pedido
    document.getElementById('btn-cadastrar-pedido').addEventListener('click', () => {
        // Zerar os campos de input dentro da seção de checkout
        document.querySelectorAll('#checkout input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        document.getElementById('endereco').value = '';
        document.getElementById('observacoes').value = '';

        // Ocultar o campo de endereço de entrega
        document.getElementById('endereco-entrega').style.display = 'none';

        // Limpar a lista de pedidos
        document.getElementById('tbody-pedidos').innerHTML = '';
        document.getElementById('lista-de-pedidos').style.display = 'none';
    });
});
