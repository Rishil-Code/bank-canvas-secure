
import { toast } from "@/components/ui/use-toast";

export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  senderId: string;
  receiverId: string;
  amount: number;
  timestamp: Date;
  type: 'transfer' | 'deposit' | 'withdrawal';
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface SecurityLog {
  id: string;
  userId: string;
  activityType: 'login' | 'login_failed' | 'transfer' | 'signup' | 'logout' | 'suspicious';
  timestamp: Date;
  description: string;
  ipAddress: string;
  severity: 'low' | 'medium' | 'high';
}

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    username: 'jaya',
    email: 'jaya@example.com',
    balance: 5000.00,
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    username: 'alex',
    email: 'alex@example.com',
    balance: 3500.50,
    createdAt: new Date('2023-02-10'),
  },
  {
    id: '3',
    username: 'sarah',
    email: 'sarah@example.com',
    balance: 7200.25,
    createdAt: new Date('2023-03-05'),
  }
];

// Mock transactions
const mockTransactions: Transaction[] = [
  {
    id: 't1',
    senderId: '1',
    receiverId: '2',
    amount: 250.00,
    timestamp: new Date('2023-04-10T14:30:00'),
    type: 'transfer',
    description: 'Rent payment',
    status: 'completed',
  },
  {
    id: 't2',
    senderId: '3',
    receiverId: '1',
    amount: 75.25,
    timestamp: new Date('2023-04-09T09:45:00'),
    type: 'transfer',
    description: 'Dinner split',
    status: 'completed',
  },
  {
    id: 't3',
    senderId: '1',
    receiverId: '3',
    amount: 120.00,
    timestamp: new Date('2023-04-05T16:20:00'),
    type: 'transfer',
    description: 'Concert tickets',
    status: 'completed',
  },
  {
    id: 't4',
    senderId: '2',
    receiverId: '1',
    amount: 400.00,
    timestamp: new Date('2023-04-01T11:15:00'),
    type: 'transfer',
    description: 'Freelance work',
    status: 'completed',
  },
  {
    id: 't5',
    senderId: '1',
    receiverId: '1',
    amount: 1000.00,
    timestamp: new Date('2023-03-28T10:00:00'),
    type: 'deposit',
    description: 'Salary deposit',
    status: 'completed',
  },
];

// Mock security logs
const mockSecurityLogs: SecurityLog[] = [
  {
    id: 's1',
    userId: '1',
    activityType: 'login',
    timestamp: new Date('2023-04-10T14:25:00'),
    description: 'Successful login',
    ipAddress: '192.168.1.1',
    severity: 'low',
  },
  {
    id: 's2',
    userId: '1',
    activityType: 'login_failed',
    timestamp: new Date('2023-04-10T14:24:30'),
    description: 'Failed login attempt',
    ipAddress: '192.168.1.1',
    severity: 'medium',
  },
  {
    id: 's3',
    userId: '1',
    activityType: 'transfer',
    timestamp: new Date('2023-04-10T14:30:10'),
    description: 'Fund transfer to Alex',
    ipAddress: '192.168.1.1',
    severity: 'low',
  },
  {
    id: 's4',
    userId: '1',
    activityType: 'suspicious',
    timestamp: new Date('2023-04-09T02:15:00'),
    description: 'Login attempt from unknown location',
    ipAddress: '45.67.89.10',
    severity: 'high',
  },
];

// Mock Auth API
export const mockAuthApi = {
  currentUser: null as User | null,

  login: (username: string, password: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if credentials match our test user
        if (username === 'jaya' && password === 'ntr') {
          const user = mockUsers.find(u => u.username === username);
          if (user) {
            mockAuthApi.currentUser = user;
            // Log successful login
            mockSecurityApi.addSecurityLog({
              userId: user.id,
              activityType: 'login',
              description: 'Successful login',
              ipAddress: '192.168.1.1',
              severity: 'low'
            });
            resolve(user);
          } else {
            resolve(null);
          }
        } else {
          // Log failed login
          if (mockAuthApi.currentUser) {
            mockSecurityApi.addSecurityLog({
              userId: mockAuthApi.currentUser.id,
              activityType: 'login_failed',
              description: `Failed login attempt for user: ${username}`,
              ipAddress: '192.168.1.1',
              severity: 'medium'
            });
          }
          resolve(null);
        }
      }, 800);
    });
  },

  signup: (username: string, email: string, password: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if username already exists
        const existingUser = mockUsers.find(u => u.username === username);
        if (existingUser) {
          resolve(null);
          return;
        }

        const newUser: User = {
          id: `user_${Date.now()}`,
          username,
          email,
          balance: 1000.00, // Initial balance
          createdAt: new Date(),
        };

        mockUsers.push(newUser);
        mockAuthApi.currentUser = newUser;
        
        // Log signup
        mockSecurityApi.addSecurityLog({
          userId: newUser.id,
          activityType: 'signup',
          description: 'New account created',
          ipAddress: '192.168.1.1',
          severity: 'low'
        });
        
        resolve(newUser);
      }, 800);
    });
  },

  logout: (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (mockAuthApi.currentUser) {
          // Log logout
          mockSecurityApi.addSecurityLog({
            userId: mockAuthApi.currentUser.id,
            activityType: 'logout',
            description: 'User logged out',
            ipAddress: '192.168.1.1',
            severity: 'low'
          });
          mockAuthApi.currentUser = null;
        }
        resolve(true);
      }, 300);
    });
  },

  getCurrentUser: (): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAuthApi.currentUser);
      }, 300);
    });
  },

  isAuthenticated: (): boolean => {
    return mockAuthApi.currentUser !== null;
  }
};

// Mock Banking API
export const mockBankingApi = {
  getBalance: (userId: string): Promise<number> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === userId);
        resolve(user ? user.balance : 0);
      }, 500);
    });
  },

  transferFunds: (senderId: string, receiverUsername: string, amount: number, description: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Find sender and receiver
        const sender = mockUsers.find(u => u.id === senderId);
        const receiver = mockUsers.find(u => u.username === receiverUsername);

        if (!sender || !receiver) {
          toast({
            title: "Transfer Failed",
            description: "Could not find one of the accounts",
            variant: "destructive"
          });
          reject(new Error("Could not find one of the accounts"));
          return;
        }

        if (sender.balance < amount) {
          toast({
            title: "Insufficient Funds",
            description: "You don't have enough balance for this transfer",
            variant: "destructive"
          });
          reject(new Error("Insufficient funds"));
          return;
        }

        // Update balances
        sender.balance -= amount;
        receiver.balance += amount;

        // Create transaction record
        const transaction: Transaction = {
          id: `t_${Date.now()}`,
          senderId: sender.id,
          receiverId: receiver.id,
          amount,
          timestamp: new Date(),
          type: 'transfer',
          description,
          status: 'completed'
        };

        mockTransactions.push(transaction);
        
        // Log security event
        mockSecurityApi.addSecurityLog({
          userId: sender.id,
          activityType: 'transfer',
          description: `Transfer of $${amount} to ${receiver.username}`,
          ipAddress: '192.168.1.1',
          severity: 'low'
        });
        
        toast({
          title: "Transfer Successful",
          description: `$${amount} has been sent to ${receiver.username}`,
        });

        resolve(true);
      }, 800);
    });
  },

  getTransactions: (userId: string): Promise<Transaction[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userTransactions = mockTransactions.filter(t => 
          t.senderId === userId || t.receiverId === userId
        ).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        
        resolve(userTransactions);
      }, 500);
    });
  }
};

// Mock Security API
export const mockSecurityApi = {
  getSecurityLogs: (userId: string): Promise<SecurityLog[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userLogs = mockSecurityLogs
          .filter(log => log.userId === userId)
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        resolve(userLogs);
      }, 500);
    });
  },

  addSecurityLog: (logData: Omit<SecurityLog, 'id' | 'timestamp'>): void => {
    const newLog: SecurityLog = {
      id: `s_${Date.now()}`,
      timestamp: new Date(),
      ...logData,
    };
    mockSecurityLogs.push(newLog);
  }
};
