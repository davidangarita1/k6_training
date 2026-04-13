import { sleep } from 'k6';
import { orderPizza, checkPizzaResponse } from '../utils/helpers.js';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1000', 'p(99)<3000'],
    checks: ['rate>0.95'],
  },
};

export default function () {
  const res = orderPizza();
  checkPizzaResponse(res);
  sleep(Math.random() * 2 + 1);
}
