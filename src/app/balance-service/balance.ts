import { Currency, BalanceHistory, TradePair, User } from "./interfaces";
import { guid, getRand } from "../helpers";


export default class BalanceService {
    currencies: Currency[];
    tradePairs: TradePair[];
    history: BalanceHistory[];
    users: User[]

    constructor(){
        this.history = [];
        this.users = [];
    }

    init(numberOfUsers: number, currencies: Currency[], tradePairs: TradePair[]){
        this.currencies = currencies;
        this.tradePairs = tradePairs;

        /**
         * generate users with random balances
         */
        for(let i = 0; i < numberOfUsers; i++){
            const user = {
                userId: guid(),
                balances: [],
            }
            this.currencies.map(currency=>{
                // 50% change to include currency into balance
                if(Math.round(Math.random()) === 1){
                    const balance = {
                        currency,
                        balance: getRand(1, 1000),
                    };
                    user.balances.push(balance);
                }
            });
            this.users.push(user);
        }
    }

    getTotalBalance(){
        // clone currencies
        const balances: any = [...this.currencies];
        balances.map(curr=>{
            curr.users = 0;
            curr.balance = 0;
            this.users.map(user=>{
                const balance = user.balances.find(k=>k.currency.id===curr.id);
                if(balance){
                    curr.users++;
                    curr.balance += balance.balance;
                }
            })
        });
        return balances;
    }

    getUserIds(){
        return this.users.map(k=>k.userId);
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