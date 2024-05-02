# node-accounts

Este código implementa um sistema de contas simples em Node.js utilizando 
prompts interativos com o usuário através do pacote inquirer. O sistema 
permite ao usuário criar uma conta, consultar o saldo, depositar valores,
sacar valores e sair do sistema.

Funcionalidades: 
1- Criar Conta: Permite ao usuário criar uma nova conta. 
2- Consultar Saldo: Permite ao usuário verificar o saldo de sua conta. 
3- Depositar: Permite ao usuário fazer um depósito em sua conta. 
4- Sacar: Permite ao usuário sacar dinheiro de sua conta. 
5- Sair: Permite ao usuário sair do sistema.

Bibliotecas Utilizadas: 
1- inquirer: Utilizado para interagir com o usuário através de prompts. 
2- chalk: Utilizado para colorir a saída no terminal. 
3- fs: Utilizado para operações de sistema de arquivos, como criar 
diretórios, verificar a existência de arquivos, ler e escrever arquivos JSON.

Estrutura do Código:
* operation(): Função principal que inicia a interação com o usuário e encaminha para a ação selecionada.
* createNewAccount(): Função que cria uma nova conta.
* buildAccount(): Função auxiliar para criar uma conta, verificando se ela já existe.
* checkBalance(): Função que verifica o saldo de uma conta.
* deposit(): Função que permite ao usuário fazer um depósito em sua conta.
* withdraw(): Função que permite ao usuário sacar dinheiro de sua conta.
* exitAccount(): Função que encerra o programa.
* getAccountName(): Função que solicita ao usuário o nome da conta.
* existThisAccount(accountName): Função que verifica se uma conta existe.
* getAmount(action): Função que solicita ao usuário um valor.
* convertAccountInObject(accountName): Função que converte o conteúdo de um arquivo JSON em um objeto JavaScript.

Uso: 
1- Antes de executar o script Node.js, certifique-se de ter instalado o Node.js em seu sistema. 
2- Execute o comando npm install no terminal para instalar as dependências necessárias do projeto. 
3- Após a instalação das dependências, execute o script Node.js utilizando o comando node nome_do_arquivo.js. 
4- Selecione a ação desejada no menu. 
5- Siga as instruções fornecidas no prompt para interagir com o sistema.
