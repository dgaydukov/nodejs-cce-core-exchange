interface UserBalance {
    userId: string;
    balance: number;
}

interface BalanceHistory {
    date: Date;
    balance: UserBalance;
}