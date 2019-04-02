import { guid, getRand } from '../helpers';
import { OrderType, Order, Match } from './interfaces';
import BalanceService from '../balance-service/balance';
import { TradePair } from '../balance-service/interfaces';


export default class MatchingEngine{
    service: BalanceService;
    tradePair: TradePair;
    /**
     * The sorting for the sell is descending and for the buy is ascending
     */
    sellOrders: Order[];
    buyOrders: Order[];
    matchedOrders: Match[];
    
    constructor(service: BalanceService, tradePair: TradePair){
        this.service = service;
        this.tradePair = tradePair;
        this.sellOrders = [];
        this.buyOrders = [];
        this.matchedOrders = [];
    }

    /**
     * How many orders should be set during specified time interval
     * @param numberOfOrders 
     * @param timeInterval 
     */
    init(numberOfOrders: number, timeInterval: number){
        const step = Math.ceil(numberOfOrders/timeInterval);
        const interval = setInterval(()=>{
            if(timeInterval === 0){
                clearInterval(interval);
            }
            timeInterval--;
            for(let i = 0; i < step; i++){
                this.fillSellOrders();
                this.fillBuyOrders();
            }
        }, 1000);
    }


    addOrder(type: OrderType, list: Order[], userId: string, basePrice: number, sellAmount: number, buyAmount: number){
        const item = {
            orderId: guid(),
            type,
            time: new Date(),
            pairId: this.tradePair.pairId,
            userId,
            sellAmount,
            buyAmount,
            basePrice,
        }
        const len = list.length
        let index = len;
        for(let i = 0; i < len; i++){
            if(list[i].basePrice >= item.basePrice){
                index = i;
                break;
            }
        }
        list.splice(index, 0, item);
    }

    fillSellOrders(){
        const userId = '';
        const sellAmount = getRand(1, 10);
        const basePrice = this.tradePair.baseRate/2 + getRand(0, this.tradePair.baseRate);
        this.addOrder(OrderType.Sell, this.sellOrders, userId, basePrice, sellAmount, basePrice * sellAmount);
    }

    fillBuyOrders(){
        const userId = '';
        const buyAmount = getRand(1, 10) * this.tradePair.baseRate;
        const basePrice = this.tradePair.baseRate - getRand(0, this.tradePair.baseRate/2);
        this.addOrder(OrderType.Buy, this.buyOrders, userId, basePrice, buyAmount, buyAmount * basePrice);
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
        this.runEngine(5);
    }
}


