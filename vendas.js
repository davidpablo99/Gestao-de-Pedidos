document.addEventListener('DOMContentLoaded', () => {
    const tbodyVendas = document.getElementById('tbody-vendas');
    const btnLimparPedidos = document.getElementById('btn-limpar-pedidos');
    const filtroData = document.getElementById('filtro-data');
    const btnFiltrar = document.getElementById('filtrar');
    const btnAnterior = document.getElementById('anterior');
    const btnProximo = document.getElementById('proximo');

    let vendas = JSON.parse(localStorage.getItem('vendas')) || [];
    let dataAtual = new Date();

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
    // Função para formatar a data como DD/MM/AAAA
    function formatarData(data) {
        return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    // Função para exibir as vendas com base na data
    function exibirVendas(filtro) {
        tbodyVendas.innerHTML = '';

        const vendasFiltradas = filtro ? vendas.filter(venda => formatarData(new Date(venda.data)) === filtro) : vendas;

        vendasFiltradas.forEach((venda, index) => {
            venda.pedidos.forEach(pedido => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${pedido.produto}</td>
                    <td>${pedido.quantidade}</td>
                    <td>${pedido.preco.toFixed(2)}</td>
                    <td>${formatarData(new Date(venda.data))}</td>
                    <td>${venda.pagamento}</td>
                    <td>${venda.endereco || 'Não se aplica'}</td>
                    <td><input type="checkbox" ${venda.entrega === 'entregasim' ? 'checked' : ''} data-index="${index}"></td>
                    <td>
                        <button class="editar" data-index="${index}">Editar</button>
                        <button class="excluir" data-index="${index}">Excluir</button>
                    </td>
                `;
                tbodyVendas.appendChild(tr);
            });
        });

        adicionarEventos();
    }

    // Função para adicionar eventos nos botões de editar, excluir e checkbox
    function adicionarEventos() {
        document.querySelectorAll('.editar').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                // Lógica para editar o pedido
            });
        });

        document.querySelectorAll('.excluir').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                vendas.splice(index, 1);
                localStorage.setItem('vendas', JSON.stringify(vendas));
                exibirVendas();
            });
        });

        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (event) => {
                const index = event.target.dataset.index;
                vendas[index].entrega = event.target.checked ? 'entregasim' : 'entreganao';
                localStorage.setItem('vendas', JSON.stringify(vendas));
            });
        });
    }

    // Evento de filtro por data
    btnFiltrar.addEventListener('click', () => {
        const dataSelecionada = filtroData.value;
        if (dataSelecionada) {
            exibirVendas(formatarData(new Date(dataSelecionada)));
        }
    });

    // Navegar entre as datas usando os botões "Anterior" e "Próximo"
    btnAnterior.addEventListener('click', () => {
        dataAtual.setDate(dataAtual.getDate() - 1);
        filtroData.value = dataAtual.toISOString().split('T')[0];
        exibirVendas(formatarData(dataAtual));
    });

    btnProximo.addEventListener('click', () => {
        dataAtual.setDate(dataAtual.getDate() + 1);
        filtroData.value = dataAtual.toISOString().split('T')[0];
        exibirVendas(formatarData(dataAtual));
    });

    // Exibir vendas ao carregar a página
    exibirVendas();

    // Limpar todos os pedidos
    btnLimparPedidos.addEventListener('click', () => {
        localStorage.removeItem('vendas');
        vendas = [];
        exibirVendas();
    });
});
