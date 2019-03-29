

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