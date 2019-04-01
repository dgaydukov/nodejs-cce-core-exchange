/**
 * List of interfaces for balance service
 */

export interface Balance {
    currency: Currency;
    balance: number;
}

export interface Currency {
    id: string;
    code: string;
    name: string;
}

export interface BalanceHistory {
    userId: string;
    date: Date;
    balance: Balance;
}

export interface User {
    userId: string;
    balances: Balance[];
}