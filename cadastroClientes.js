document.addEventListener('DOMContentLoaded', () => {
    const formCliente = document.getElementById('form-cliente');
    const tbodyClientes = document.getElementById('tbody-clientes');
    const btnLimparClientes = document.getElementById('btn-limpar-clientes');

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
    function atualizarClientes() {
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        tbodyClientes.innerHTML = '';

        clientes.forEach((cliente, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.endereco}</td>
                <td>
                    <button type="button" class="editar" data-index="${index}">Editar</button>
                    <button type="button" class="excluir" data-index="${index}">Excluir</button>
                </td>
            `;
            tbodyClientes.appendChild(tr);
        });

        adicionarEventosClientes();
    }

    function adicionarEventosClientes() {
        document.querySelectorAll('.editar').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                editarCliente(index);
            });
        });

        document.querySelectorAll('.excluir').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                excluirCliente(index);
            });
        });
    }

    function editarCliente(index) {
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const cliente = clientes[index];

        document.getElementById('nome').value = cliente.nome;
        document.getElementById('email').value = cliente.email;
        document.getElementById('telefone').value = cliente.telefone;
        document.getElementById('endereco').value = cliente.endereco;

        clientes.splice(index, 1);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        atualizarClientes();
    }

    function excluirCliente(index) {
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        clientes.splice(index, 1);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        atualizarClientes();
    }

    btnLimparClientes.addEventListener('click', () => {
        localStorage.removeItem('clientes');
        atualizarClientes();
    });

    formCliente.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const endereco = document.getElementById('endereco').value;

        const novoCliente = {
            nome,
            email,
            telefone,
            endereco
        };

        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        clientes.push(novoCliente);
        localStorage.setItem('clientes', JSON.stringify(clientes));

        formCliente.reset();
        atualizarClientes();
    });

    atualizarClientes();
});
