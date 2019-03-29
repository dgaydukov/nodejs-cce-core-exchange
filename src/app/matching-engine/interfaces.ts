

export enum OrderType {
    Sell = 'sell',
    Buy = 'buy',
}

export enum MathType {
    Completed = 'completed',
    Partial = 'partial',
}

export interface Order {
    orderId: string;
    type: OrderType,
    time: Date;
    pairId: string;
    userId: string;
    sellAmount: number;
    buyAmount: number;
    basePrice: number;
}


export interface Match {
    sell: Order;
    buy: Order;
    type: MathType;
}