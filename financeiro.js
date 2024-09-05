document.addEventListener('DOMContentLoaded', () => {
    // Seleção dos elementos
    const tbodyFinanceiro = document.getElementById('tbody-financeiro');
    const btnFiltrar = document.getElementById('filtrar');
    const btnLimpar = document.getElementById('btn-limpar-financeiro');
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

    // Função para carregar dados financeiros
    function carregarDadosFinanceiros() {
        const dadosFinanceiros = JSON.parse(localStorage.getItem('financeiro')) || [];
        tbodyFinanceiro.innerHTML = ''; // Limpa o conteúdo atual

        dadosFinanceiros.forEach((dado, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${dado.cliente}</td>
                <td>${dado.produto}</td>
                <td>${dado.quantidade}</td>
                <td>${dado.valor}</td>
                <td>${dado.data}</td>
                <td>${dado.metodoPagamento}</td>
                <td>${dado.status}</td>
                <td>
                    <button type="button" class="editar" data-id="${index}">Editar</button>
                    <button type="button" class="excluir" data-id="${index}">Excluir</button>
                </td>
            `;
            tbodyFinanceiro.appendChild(tr);
        });
    }

    // Função para filtrar dados por data
    function filtrarPorData() {
        const dataFiltro = document.getElementById('filtro-data').value;
        const dadosFinanceiros = JSON.parse(localStorage.getItem('financeiro')) || [];
        
        const dadosFiltrados = dadosFinanceiros.filter(dado => dado.data === dataFiltro);
        tbodyFinanceiro.innerHTML = ''; // Limpa o conteúdo atual
        
        dadosFiltrados.forEach((dado, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${dado.cliente}</td>
                <td>${dado.produto}</td>
                <td>${dado.quantidade}</td>
                <td>${dado.valor}</td>
                <td>${dado.data}</td>
                <td>${dado.metodoPagamento}</td>
                <td>${dado.status}</td>
                <td>
                    <button type="button" class="editar" data-id="${index}">Editar</button>
                    <button type="button" class="excluir" data-id="${index}">Excluir</button>
                </td>
            `;
            tbodyFinanceiro.appendChild(tr);
        });
    }

    // Função para limpar armazenamento
    function limparArmazenamento() {
        localStorage.removeItem('financeiro');
        carregarDadosFinanceiros(); // Atualiza a tabela após limpar
    }

    // Adicionando eventos aos botões
    btnFiltrar.addEventListener('click', filtrarPorData);
    btnLimpar.addEventListener('click', limparArmazenamento);

    // Carregar dados ao iniciar a página
    carregarDadosFinanceiros(); 
});
