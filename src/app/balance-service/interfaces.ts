/**
 * List of interfaces for balance service
 */

export interface UserBalance {
    userId: string;
    balance: number;
}

export interface BalanceHistory {
    date: Date;
    balance: UserBalance;
}