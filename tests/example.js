import { sleep } from 'k6';
import { orderPizza, checkPizzaResponse } from '../utils/helpers.js';

export default function () {
  const res = orderPizza();
  checkPizzaResponse(res);
  console.log(`Pizza: ${res.json().pizza.name}`);
  sleep(1);
}