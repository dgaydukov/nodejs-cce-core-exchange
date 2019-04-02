import { Currency, BalanceHistory, TradePair, User } from "./interfaces";


export default class BalanceService {
    numberOfUsers: number;
    currencies: Currency[];
    tradePairs: TradePair[];
    history: BalanceHistory[];
    users: User[]

    constructor(){
        this.history = [];
    }

    init(numberOfUsers: number, currencies: Currency[], tradePairs: TradePair[]){
        this.numberOfUsers = numberOfUsers;
        this.currencies = currencies;
        this.tradePairs = tradePairs;
    }

    getUserBalance(userId: string, currencyId: string){
        const user = this.users.find(k=>k.userId === userId);
        if(!user){
            throw new Error(`User hasn't been found`);
        }
        const balance = user.balances.find(k=>k.currency.id === currencyId);
        return balance ? balance.balance : 0;
    }

    setUserBalance(userId: string, currencyId: string, amount: number){
        const user = this.users.find(k=>k.userId === userId);
        if(!user){
            throw new Error(`User hasn't been found`);
        }
        const balance = user.balances.find(k=>k.currency.id === currencyId);
        if(balance){
            balance.balance = amount;
        }
        else{
            const currency = this.currencies.find(k=>k.id == currencyId);
            if(!currency){
                throw new Error(`Trying to set balance for currency outside of the available list`);
            }
            user.balances.push({currency, balance: amount})
        }
    }
}