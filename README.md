# Gestão de Pedidos

Este é um projeto de Gestão de Pedidos que inclui funcionalidades para cadastro e gerenciamento de produtos, clientes e pedidos, além de uma seção financeira para controlar as vendas. O projeto utiliza HTML, CSS e JavaScript, e é gerenciado com Git.

## Funcionalidades

### 1. Cadastro de Produtos
- **Campos**: Nome, Descrição, Preço, Quantidade
- **Botão de Cadastro**: Adiciona o produto à lista de produtos cadastrados.
- **Visualização**: Produtos cadastrados são exibidos em uma seção separada.

### 2. Cadastro de Clientes
- **Campos**: Nome, Email, Telefone, Endereço
- **Botão de Cadastro**: Adiciona o cliente à lista de clientes cadastrados.
- **Visualização**: Clientes cadastrados são exibidos a partir do `localStorage`.

### 3. Cadastro de Pedidos
- **Campos**: Seleção de Produto, Quantidade, Preço, Método de Pagamento
- **Botão de Cadastro**: Adiciona o pedido à lista de pedidos.
- **Visualização**: Pedidos cadastrados são exibidos na seção de pedidos.

### 4. Vendas
- **Tabela de Vendas**:
  - **Colunas**: ID, Produto, Quantidade, Valor, Data, Pagamento, Endereço de Entrega, Entregue, Ações
  - **Botões de Ação**: Editar, Excluir
- **Filtragem**: Permite filtrar vendas por data.
- **Paginação**: Navegação entre registros com botões "Anterior" e "Próximo".

### 5. Financeiro
- **Tabela Financeira**:
  - **Colunas**: ID, Cliente, Produto, Quantidade, Valor, Data, Método de Pagamento, Status
  - **Botões de Ação**: Editar, Excluir
- **Filtragem**: Permite filtrar por data.
- **Botão de Limpeza**: Limpa todos os dados financeiros do `localStorage`.

### 6. Tema Escuro/Claro
- **Botão de Alternância**: Permite alternar entre o tema escuro e claro.
- **Armazenamento**: A preferência de tema é salva no `localStorage`.

## Estrutura de Arquivos

- `index.html`: Página principal de entrada.
- `cadastroProduto.html`: Página para cadastro de produtos.
- `cadastroClientes.html`: Página para cadastro de clientes.
- `cadastroPedidos.html`: Página para cadastro de pedidos.
- `vendas.html`: Página para visualização e gerenciamento de vendas.
- `financeiro.html`: Página para controle financeiro.
- `style.css`: Estilos para o projeto.
- `script.js`: Script principal para funcionalidades gerais.
- `cadastroProduto.js`: Script para funcionalidades da página de cadastro de produtos.
- `cadastroClientes.js`: Script para funcionalidades da página de cadastro de clientes.
- `cadastroPedidos.js`: Script para funcionalidades da página de cadastro de pedidos.
- `vendas.js`: Script para funcionalidades da página de vendas.
- `financeiro.js`: Script para funcionalidades da página financeira.

## Como Usar

1. **Clone o Repositório**

    ```bash
    git clone https://github.com/davidpablo99/Gestao-de-Pedidos.git
    ```

2. **Instale Dependências**

   O projeto não possui dependências externas além das bibliotecas inclusas via CDN.

3. **Abra o Projeto**

   Abra o arquivo `index.html` em um navegador para visualizar o projeto em funcionamento.

## Contribuição

1. Faça um fork do repositório.
2. Crie uma branch para sua nova funcionalidade ou correção:
   
    ```bash
    git checkout -b minha-nova-funcionalidade
    ```

3. Faça as alterações e comite-as:
   
    ```bash
    git add .
    git commit -m "Descrição das alterações"
    ```

4. Empurre para o repositório remoto:
   
    ```bash
    git push origin minha-nova-funcionalidade
    ```

5. Abra um pull request no GitHub.

## Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).

## Contato

Se tiver dúvidas ou precisar de suporte, entre em contato através de [seu-email@example.com](mailto:seu-email@example.com).

