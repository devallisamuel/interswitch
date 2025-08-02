const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Hardcoded users data
const users = [
  {
    id: '1',
    username: 'john_doe',
    password: 'password123',
    name: 'John Doe',
    email: 'john.doe@switchbank.com'
  },
  {
    id: '2',
    username: 'jane_smith',
    password: 'password456',
    name: 'Jane Smith',
    email: 'jane.smith@switchbank.com'
  },
  {
    id: '3',
    username: 'admin',
    password: 'admin123',
    name: 'Admin User',
    email: 'admin@switchbank.com'
  }
];

// Hardcoded bank accounts data
const accounts = [
  {
    id: '1',
    userId: '1',
    accountNumber: '1234567890',
    accountType: 'Checking',
    balance: 2500.75,
    bankName: 'Switch Bank'
  },
  {
    id: '2',
    userId: '1',
    accountNumber: '0987654321',
    accountType: 'Savings',
    balance: 15000.00,
    bankName: 'Switch Bank'
  },
  {
    id: '3',
    userId: '2',
    accountNumber: '1122334455',
    accountType: 'Checking',
    balance: 850.25,
    bankName: 'Switch Bank'
  },
  {
    id: '4',
    userId: '2',
    accountNumber: '5544332211',
    accountType: 'Credit',
    balance: -1200.50,
    bankName: 'Switch Bank'
  },
  {
    id: '5',
    userId: '3',
    accountNumber: '9988776655',
    accountType: 'Business',
    balance: 50000.00,
    bankName: 'Switch Bank'
  },
  {
    id: '6',
    userId: '1', // john_doe gets a third account
    accountNumber: '1111222233',
    accountType: 'Investment',
    balance: 25000.00,
    bankName: 'Switch Bank'
  },
  {
    id: '7',
    userId: '2', // jane_smith gets a third account  
    accountNumber: '4444555566',
    accountType: 'Savings',
    balance: 5500.75,
    bankName: 'Switch Bank'
  }
];

// Routes
app.get('/users', (req, res) => {
  const { username, password } = req.query;
  console.log("called")
  if (username && password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      res.json([userWithoutPassword]);
    } else {
      res.json([]);
    }
  } else {
    res.json(users.map(({ password, ...user }) => user));
  }
});

app.get('/accounts', (req, res) => {
  const { userId } = req.query;
  
  if (userId) {
    const userAccounts = accounts.filter(account => account.userId === userId);
    res.json(userAccounts);
  } else {
    res.json(accounts);
  }
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('\nAvailable users:');
  users.forEach(user => {
    console.log(`Username: ${user.username}, Password: ${user.password}`);
  });
});

