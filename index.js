import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];
      if (action === "Criar Conta") {
        createNewAccount();
      } else if (action === "Consultar Saldo") {
        checkBalance();
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Sacar") {
        withdraw();
      } else if (action === "Sair") {
        exitAccount();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// create a new account
function createNewAccount() {
  console.log(chalk.bgGreen.black("Obrigado por escolher o Accounts"));
  console.log(chalk.green("Defina as opções da conta"));
  buildAccount();
}

function buildAccount() {
  getAccountName().then((accountName) => {
    const filePath = `accounts/${accountName}.json`;

    console.log(
      chalk.bgGreen.black(`Seja bem vindo ao Accounts ${accountName}`)
    );

    if (!fs.existsSync("accounts")) {
      fs.mkdirSync("accounts");
    }

    if (existThisAccount(accountName)) {
      console.log(chalk.yellow(`A conta ${accountName} já existe.`));
    } else {
      fs.writeFileSync(filePath, '{"balance":0}');
      console.log(chalk.bgGreen.black("Conta criada com sucesso"));
    }

    return operation();
  });
}

// check balance
function checkBalance() {
  getAccountName()
    .then((accountName) => {
      if (existThisAccount(accountName)) {
        const balance = convertAccountInObject(accountName).balance;
        console.log(
          chalk.bgGreen.black(
            `O saldo da conta ${accountName} é de R$${balance}`
          )
        );
        operation();
      }
    })
    .catch((err) => {
      console.log(err);
      checkBalance();
    });
}

// deposit an amount
function deposit() {
  console.log(chalk.bgGreen.black("Você deseja fazer um deposito "));

  getAccountName().then((accountName) => {
    if (existThisAccount(accountName)) {
      getAmount("depósito").then((amount) => {
        const account = convertAccountInObject(accountName);
        account.balance = parseFloat(amount) + parseFloat(account.balance);
        fs.writeFileSync(
          `accounts/${accountName}.json`,
          JSON.stringify(account),
          function (err) {
            console.log(err);
          }
        );
        console.log(
          chalk.bgGreen.black(
            `O deposito de R$${amount} foi feito da conta ${accountName}`
          )
        );
        operation();
      });
    } else {
      console.log(chalk.bgRed.black("Conta inexistente"));
      deposit();
    }
  });
}

// withdraw
function withdraw() {
  console.log(chalk.bgGreen.black("Você deseja fazer um saque "));

  getAccountName().then((accountName) => {
    getAmount("saque").then((amount) => {
      const account = convertAccountInObject(accountName);
      if (account.balance >= amount) {
        account.balance = parseFloat(account.balance) - parseFloat(amount);
        fs.writeFileSync(
          `accounts/${accountName}.json`,
          JSON.stringify(account),
          function (err) {
            console.log(err);
          }
        );
        console.log(
          chalk.bgGreen.black(
            `O saque de R$${amount} foi feito da conta ${accountName}`
          )
        );
        operation();
      } else {
        console.log(chalk.bgRed.black("Saldo insuficiente"));
        withdraw();
      }
    });
  });
}

// exit accounts
function exitAccount() {
  console.log(chalk.bgGreen.black("Obrigado por usar o Accounts"));
  process.exit();
}

// general functions
function getAccountName() {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          name: "accountName",
          message: "Qual o nome da conta?",
        },
      ])
      .then((answer) => {
        resolve(answer.accountName);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function existThisAccount(accountName) {
  if (fs.existsSync(`accounts/${accountName}.json`)) {
    return true;
  }
  console.log(chalk.bgRed.black("Conta inexistente"));
  operation();
}

function getAmount(action) {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          name: "amount",
          message: `Informe o valor para o ${action}:`,
        },
      ])
      .then((answer) => {
        resolve(answer.amount);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function convertAccountInObject(accountName) {
  const filePath = `accounts/${accountName}.json`;

  if (fs.existsSync(filePath)) {
    const accountJSON = fs.readFileSync(filePath, {
      encoding: "utf-8",
      flag: "r",
    });
    return JSON.parse(accountJSON);
  } else {
    console.error(`A conta ${accountName} não foi encontrada.`);
  }
}
