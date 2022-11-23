'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAccount;
console.log(currentAccount);

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount.pin === Number(inputLoginPin.value)) {
    // Display balance
    const displayBalance = function (acc) {
      acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
      console.log(acc.balance);
      labelBalance.textContent = `${acc.balance} EURO`;
    };
    // Funds in
    const displayFundsIn = function (movements) {
      const sumIn = movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
      labelSumIn.textContent = `${sumIn}€`;
    };
    // Funds out
    const displayFundsOut = function (movements) {
      const sumOut = movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
      labelSumOut.textContent = `${Math.abs(sumOut)}€`;
    };
    // Intrests from funds when is more than 1 EUR.
    const intrest = function (movements) {
      const intrests = movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * 1.2) / 100)
        .filter((intr, i, arr) => {
          console.log(`${arr}`);
          return intr >= 1;
        })
        .reduce((acc, dep) => acc + dep, 0);
      labelSumInterest.textContent = `${intrests}€`;
    };

    // Display movements
    // Sort movements
    const sortItem = function (acc) {
      acc.movements.sort((a, b) => a - b);
    };
    const displayMovements = function (movements) {
      containerMovements.innerHTML = ' ';
      movements.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
            <div class="movements__row">
                  <div class="movements__type movements__type--${type}">${
          i + 1
        } ${type}</div>
                  <div class="movements__date">3 days ago</div>
                  <div class="movements__value">${mov}€</div>
                </div>
            `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
      });
    };

    btnTransfer.addEventListener('click', function (e) {
      e.preventDefault();
      const amount = Number(inputTransferAmount.value);
      const reciverAccount = accounts.find(
        acc => acc.username === inputTransferTo.value
      );
      inputTransferAmount.value = inputTransferTo.value = '';
      if (
        amount > 0 &&
        amount <= currentAccount.balance &&
        reciverAccount?.username !== currentAccount.username
      ) {
        reciverAccount.movements.push(amount);
        currentAccount.movements.push(-amount);
        updateUI(currentAccount);
      }
    });

    //Calling functions.
    const updateUI = (acc) => {
      displayMovements(acc.movements);
      displayBalance(acc);
    };
    updateUI(currentAccount);
    displayFundsIn(currentAccount.movements);
    displayFundsOut(currentAccount.movements);
    intrest(currentAccount.movements);
  } else {
    console.log('Błędny pin.');
  }
});

btnClose.addEventListener('click', function(e)
{
  e.preventDefault();
  if(inputCloseUsername?.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    inputCloseUsername.value = inputClosePin.value = '';
    console.log('Account was closed');
    const indexAcc = accounts.findIndex(acc => acc.username === currentAccount.username);
    
      console.log(indexAcc);
      accounts.splice(indexAcc, 1);
      containerApp.style.opacity = 0;
    
  }
})


// Funkcja tworząca inicjały użytkownika.
const createUserInitials = function (acct) {
  acct.forEach(function (acctRow) {
    acctRow.username = acctRow.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserInitials(accounts);
console.log(accounts);

console.log(account1.movements.sort((a, b) => a - b));
