import http from 'k6/http';
import { sleep } from 'k6';
import { Counter, Trend } from 'k6/metrics';
import { BASE_URL, orderPizza, checkPizzaResponse } from '../utils/helpers.js';

const pizzaCount = new Counter('quickpizza_pizzas_ordered');
const ingredientCount = new Trend('quickpizza_ingredient_count');

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 10 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    checks: ['rate>0.99'],
    quickpizza_ingredient_count: ['avg<8'],
  },
};

export function setup() {
  const res = http.get(BASE_URL);
  if (res.status !== 200) {
    throw new Error(`QuickPizza is not reachable (status ${res.status})`);
  }
}

export default function () {
  const res = orderPizza();
  checkPizzaResponse(res);

  const pizza = res.json()?.pizza;
  if (pizza) {
    pizzaCount.add(1);
    ingredientCount.add(pizza.ingredients.length);
    console.log(`${pizza.name} (${pizza.ingredients.length} ingredients)`);
  }

  sleep(1);
}
