document.addEventListener('DOMContentLoaded', () => {
    const formCadastroProduto = document.getElementById('form-cadastro-produto');
    const nomeInput = document.getElementById('nome');
    const descricaoInput = document.getElementById('descricao');
    const precoInput = document.getElementById('preco');
    const tbodyProdutos = document.getElementById('tbody-produtos');
    const btnLimparProdutos = document.getElementById('btn-limpar-produtos');

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    let produtoIndex = null;

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
    // Função para exibir produtos cadastrados
    function exibirProdutos() {
        tbodyProdutos.innerHTML = '';
        produtos.forEach((produto, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.descricao}</td>
                <td>${produto.preco.toFixed(2)}</td>
                <td>
                    <button class="editar" data-index="${index}">Editar</button>
                    <button class="excluir" data-index="${index}">Excluir</button>
                </td>
            `;
            tbodyProdutos.appendChild(tr);
        });

        // Adicionar eventos de editar e excluir
        document.querySelectorAll('.editar').forEach(btn => {
            btn.addEventListener('click', (event) => {
                produtoIndex = event.target.dataset.index;
                const produto = produtos[produtoIndex];

                // Preencher os inputs com os dados do produto para edição
                nomeInput.value = produto.nome;
                descricaoInput.value = produto.descricao;
                precoInput.value = produto.preco;

                // Mudar o botão para "Atualizar" ao invés de "Cadastrar"
                formCadastroProduto.querySelector('button[type="submit"]').textContent = 'Atualizar';
            });
        });

        document.querySelectorAll('.excluir').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                produtos.splice(index, 1);
                localStorage.setItem('produtos', JSON.stringify(produtos));
                exibirProdutos();
            });
        });
    }

    // Função para adicionar ou atualizar um produto
    formCadastroProduto.addEventListener('submit', (e) => {
        e.preventDefault();

        const novoProduto = {
            nome: nomeInput.value,
            descricao: descricaoInput.value,
            preco: parseFloat(precoInput.value)
        };

        if (produtoIndex !== null) {
            // Atualizar o produto existente
            produtos[produtoIndex] = novoProduto;
            produtoIndex = null;
            formCadastroProduto.querySelector('button[type="submit"]').textContent = 'Cadastrar';
        } else {
            // Adicionar um novo produto
            produtos.push(novoProduto);
        }

        // Salvar no localStorage
        localStorage.setItem('produtos', JSON.stringify(produtos));
        exibirProdutos();

        // Limpar o formulário
        formCadastroProduto.reset();
    });

    // Limpar todos os produtos
    btnLimparProdutos.addEventListener('click', () => {
        localStorage.removeItem('produtos');
        produtos = [];
        exibirProdutos();
    });

    // Exibir produtos ao carregar a página
    exibirProdutos();
});
