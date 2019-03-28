import { guid, getRand } from './helpers';

enum OrderType {
    Sell = 'sell',
    Buy = 'buy',
}

enum MathType {
    Completed = 'completed',
    Partial = 'partial',
}

interface Order {
    orderId: string;
    type: OrderType,
    time: Date;
    pairId: string;
    userId: string;
    sellAmount: number;
    buyAmount: number;
    basePrice: number;
}


interface Match {
    sell: Order;
    buy: Order;
    type: MathType;
}

interface UserBalance {
    userId: string;
    balance: number;
}

/**
 * basePrice means that for every btc you get 10 eth
 */
const CryptoPair = {
    id: '20d2f0f3-dd63-4cd2-9c33-0ca4654918f3',
    name: 'btc/eth',
    basePrice: 10,
}

const genGuids = (n: number) => {
    const arr = [];
    for(let i = 0; i < n; i++){
        arr.push(guid());
    }
    return arr;
}

/**
 * pregenerate an array of N users
 */
const userNumber = 10**2;
const userIdList = genGuids(userNumber);

/**
 * The sorting for the sell is descending and for the buy is ascending
 */
const sellOrders = [];
const buyOrders = [];
const matchedOrders = [];

const addOrder = (type: OrderType, list: Order[], userId: string, basePrice: number, sellAmount: number, buyAmount: number) => {
    const item = {
        orderId: guid(),
        type,
        time: new Date(),
        pairId: CryptoPair.id,
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

const fillSellOrders = (n: number) => {
    setInterval(()=>{
        const userId = userIdList[getRand(0, userNumber)];
        const sellAmount = getRand(1, 10);
        const basePrice = CryptoPair.basePrice/2 + getRand(0, CryptoPair.basePrice);
        addOrder(OrderType.Sell, sellOrders, userId, basePrice, sellAmount, basePrice * sellAmount);
    }, n * 10**3);
}

const fillBuyOrders = (n: number) => {
    setInterval(()=>{
        const userId = userIdList[getRand(0, userNumber)];
        const buyAmount = getRand(1, 10) * CryptoPair.basePrice;
        const basePrice = CryptoPair.basePrice - getRand(0, CryptoPair.basePrice/2);
        addOrder(OrderType.Buy, buyOrders, userId, basePrice, buyAmount, buyAmount * basePrice);
    }, n * 10**3);
}


const runEngine = (n: number) => {
    let _sell, _buy;
    setInterval(()=>{
        const sell = _sell || sellOrders.shift();
        const buy = _buy || buyOrders.shift();
        if(sell.basePrice === buy.basePrice){
            
        }
        
    }, n * 10**3); 
}


const run = () => {
    fillSellOrders(1);
    fillBuyOrders(1);
    runEngine(5);
}




run()



/**
 * just to be sure, our app is never stopping
 */
setInterval(()=>{}, 10**6);