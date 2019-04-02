import { guid, getRand } from '../helpers';
import { OrderType, Order, Match } from './interfaces';
import BalanceService from '../balance-service/balance';


export default class MatchingEngine{
    service: BalanceService;
    /**
     * The sorting for the sell is descending and for the buy is ascending
     */
    sellOrders: Order[];
    buyOrders: Order[];
    matchedOrders: Match[];

    constructor(service: BalanceService){
        this.service = service;
        this.sellOrders = [];
        this.buyOrders = [];
        this.matchedOrders = [];
    }

    init(){
        
    }


    addOrder(type: OrderType, list: Order[], userId: string, basePrice: number, sellAmount: number, buyAmount: number){
        const item = {
            orderId: guid(),
            type,
            time: new Date(),
            pairId: this.CryptoPair.id,
            userId,
            sellAmount,
            buyAmount,
            basePrice,
        }
        const len = list.length;
        let index = len;
        for(let i = 0; i < len; i++){
            if(list[i].basePrice >= item.basePrice){
                index = i;
                break;
            }
        }
        list.splice(index, 0, item);
    }

    fillSellOrders(n: number){
        setInterval(()=>{
            const userId = this.userIdList[getRand(0, this.userNumber)];
            const sellAmount = getRand(1, 10);
            const basePrice = this.CryptoPair.basePrice/2 + getRand(0, this.CryptoPair.basePrice);
            this.addOrder(OrderType.Sell, this.sellOrders, userId, basePrice, sellAmount, basePrice * sellAmount);
        }, n * 10**3);
    }

    fillBuyOrders(n: number){
        setInterval(()=>{
            const userId = this.userIdList[getRand(0, this.userNumber)];
            const buyAmount = getRand(1, 10) * this.CryptoPair.basePrice;
            const basePrice = this.CryptoPair.basePrice - getRand(0, this.CryptoPair.basePrice/2);
            this.addOrder(OrderType.Buy, this.buyOrders, userId, basePrice, buyAmount, buyAmount * basePrice);
        }, n * 10**3);
    }


    runEngine(n: number){
        let _sell, _buy;
        setInterval(()=>{
            console.log(
                this.buyOrders.length,
                this.sellOrders.length,
                this.matchedOrders.length,
            )
            const sell = _sell || this.sellOrders.shift();
            const buy = _buy || this.buyOrders.shift();
            if(sell.basePrice === buy.basePrice){
                // TODO: change users' balances
                if(sell.sellAmount > buy.sellAmount){
                    sell.sellAmount = sell.sellAmount - buy.sellAmount;
                    sell.buyAmount = sell.buyAmount - buy.buyAmount;
                    _sell = sell;
                    this.matchedOrders.push(buy);
                }
                else if(sell.sellAmount < buy.sellAmount){
                    buy.sellAmount = buy.sellAmount - sell.sellAmount;
                    buy.buyAmount = buy.buyAmount - sell.buyAmount;
                    _buy = buy;
                    this.matchedOrders.push(sell);
                }
                else{
                    this.matchedOrders.push(buy);
                    this.matchedOrders.push(sell);
                }
            }
        }, n * 10**3); 
    }


    run(){
        this.fillSellOrders(1);
        this.fillBuyOrders(1);
        this.runEngine(5);
    }
}


