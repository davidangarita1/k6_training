import http from 'k6/http';
import { check } from 'k6';

export const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

export const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `token ${__ENV.API_TOKEN || 'abcdef0123456789'}`,
};

export const RESTRICTIONS = {
  maxCaloriesPerSlice: 500,
  mustBeVegetarian: false,
  excludedIngredients: ['pepperoni'],
  excludedTools: ['knife'],
  maxNumberOfToppings: 6,
  minNumberOfToppings: 2,
};

export function orderPizza() {
  return http.post(`${BASE_URL}/api/pizza`, JSON.stringify(RESTRICTIONS), { headers: HEADERS });
}

export function checkPizzaResponse(res) {
  return check(res, {
    'status is 200': (r) => r.status === 200,
    'content-type is JSON': (r) => r.headers['Content-Type']?.includes('application/json'),
    'response time < 1s': (r) => r.timings.duration < 1000,
    'has pizza name': (r) => r.status === 200 && r.json().pizza?.name !== '',
    'has ingredients array': (r) => r.status === 200 && Array.isArray(r.json().pizza?.ingredients),
    'at least one ingredient': (r) => r.status === 200 && r.json().pizza?.ingredients?.length > 0,
  });
}
