import Counter from './counter';
import { isServer } from '../../server/utils/isServer';

if (!isServer()) {
  window.perf_counter = new Counter();
}
