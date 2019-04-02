require('dotenv').config();
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as HttpStatus from 'http-status-codes';
const cors = require('@koa/cors');

import MatchingEngine from './matching-engine/matching';
import BalanceService from './balance-service/balance';

const app = new Koa();
const router = new Router({
    prefix: '/v1'
});

app.use(cors());
app.use(bodyParser());

app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
        await next();
    } catch (error) {
        ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
        error.status = ctx.status;
        ctx.body = { error };
        ctx.app.emit('error', error, ctx);
    }
});

router.get('/', async (ctx: Koa.Context) => {
    ctx.body = 'API for core exchange v1';
});

app.use(router.routes());


(async()=>{
    await app.listen(process.env.APP_PORT);
    console.log(`core exchange is running... `);
})();


/**
 * We use init function to test the project
 */
const balancer = new BalanceService();
const numberOfUsers = 1000;
const currencies = [
    {
        id: '4648639a-f1aa-42ee-997e-70a4cf925198',
        code: 'BTC',
        name: 'Bitcoin',
    },
    {
        id: '5eabb8dc-15fc-469c-a003-b5d8a20bbff8',
        code: 'ETH',
        name: 'Ethereum',
    }
];
const tradePairs = [
    {
        pairId: '5985aa36-cda7-4545-8577-8a3157507385',
        buy: currencies[0],
        sell: currencies[1],
        baseRate: 10,
    }
];
balancer.init(numberOfUsers, currencies, tradePairs);


const engine = new MatchingEngine(balancer);
const numberOfOrders = 10000;
const timeInterval = 30;
engine.init(numberOfOrders, timeInterval);
engine.run();