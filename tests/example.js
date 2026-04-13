import { sleep } from 'k6';
import { orderPizza, checkPizzaResponse } from '../utils/helpers.js';

export default function () {
  const res = orderPizza();
  checkPizzaResponse(res);
  const name = res.json()?.pizza?.name;
  if (name) console.log(`Pizza: ${name}`);
  sleep(1);
}