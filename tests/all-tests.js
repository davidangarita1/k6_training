import http from 'k6/http';
import { sleep } from 'k6';
import { Counter, Trend } from 'k6/metrics';
import { BASE_URL, orderPizza, checkPizzaResponse } from '../utils/helpers.js';

const pizzaCount = new Counter('quickpizza_pizzas_ordered');
const ingredientCount = new Trend('quickpizza_ingredient_count');

export const options = {
  scenarios: {
    smoke: {
      executor: 'constant-vus',
      vus: 1,
      duration: '10s',
      exec: 'smoke',
      tags: { scenario: 'smoke' },
    },
    load: {
      executor: 'ramping-vus',
      startTime: '15s',
      stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 10 },
        { duration: '20s', target: 0 },
      ],
      exec: 'load',
      tags: { scenario: 'load' },
    },
    stress: {
      executor: 'ramping-vus',
      startTime: '2m30s',
      stages: [
        { duration: '30s', target: 20 },
        { duration: '1m', target: 50 },
        { duration: '30s', target: 0 },
      ],
      exec: 'stress',
      tags: { scenario: 'stress' },
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1000', 'p(99)<3000'],
    checks: ['rate>0.95'],
    quickpizza_ingredient_count: ['avg<8'],
    'http_req_duration{scenario:smoke}': ['p(95)<800'],
    'http_req_duration{scenario:load}': ['p(95)<800'],
    'http_req_duration{scenario:stress}': ['p(95)<1000'],
    'checks{scenario:smoke}': ['rate>0.99'],
    'checks{scenario:load}': ['rate>0.99'],
    'checks{scenario:stress}': ['rate>0.95'],
  },
};

export function setup() {
  const res = http.get(BASE_URL);
  if (res.status !== 200) {
    throw new Error(`QuickPizza is not reachable (status ${res.status})`);
  }
}

export function smoke() {
  const res = orderPizza();
  checkPizzaResponse(res);
  const name = res.json()?.pizza?.name;
  if (name) console.log(`[smoke] ${name}`);
  sleep(1);
}

export function load() {
  const res = orderPizza();
  checkPizzaResponse(res);

  const pizza = res.json()?.pizza;
  if (pizza) {
    pizzaCount.add(1);
    ingredientCount.add(pizza.ingredients.length);
    console.log(`[load] ${pizza.name} (${pizza.ingredients.length} ingredients)`);
  }

  sleep(1);
}

export function stress() {
  const res = orderPizza();
  checkPizzaResponse(res);
  sleep(Math.random() * 2 + 1);
}
