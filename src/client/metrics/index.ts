import Counter from './counter';
import { isServer } from '../../server/utils/isServer';

declare global {
  interface Window {
    perf_counter: any;
  }
}

if (!isServer()) {
  window.perf_counter = new Counter();
}
