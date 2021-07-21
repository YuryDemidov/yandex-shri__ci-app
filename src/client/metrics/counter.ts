import { MetricsSampleAdditional } from './analytics';

/**
 * Лимит на число счетчиков в одном запросе
 */
const MAX_BATCH_COUNTERS: number = 42;

/**
 * Интервал в миллисекундах, в течение которого счётчики склеиваются
 */
const COUNTERS_BATCH_TIMEOUT: number = 15;

export default class Counter {
  guid: string;
  reqid: string;
  page: string;
  additional: MetricsSampleAdditional;
  _initiated: boolean;
  _indexes: any;
  _countersBatchData: any;
  _counterTimerId: number | unknown;
  counterUrl: string;

  constructor() {
    this.guid = '';
    this.reqid = '';
    this.page = '';
    this.additional = {};

    this._initiated = false;
    this._indexes = {};
    this._countersBatchData = [];
    this._counterTimerId = null;

    this.counterUrl = 'https://shri.yandex/hw/stat/send';
  }

  init(guid: string, reqid: string, page: string) {
    if (guid && reqid && page) {
      this.guid = guid;
      this.reqid = reqid;
      this.page = page;

      this._initiated = true;
    }
  }

  setAdditionalParams(additionalParams: MetricsSampleAdditional) {
    this.additional = Object.assign({}, additionalParams);
  }

  /**
   * Отправка счётчика. Основной транспорт - sendBeacon, запасной - XMLHttpRequest. Быстро поступающие одиночные события
   * накапливаются и отправляются пачками по MAX_BATCH_COUNTERS штук.
   */
  send(name: string, value: number) {
    if (!this._initiated) {
      console.warn('counter is not initiated');

      return;
    }

    typeof this._counterTimerId === 'number' && window.clearTimeout(this._counterTimerId);

    if (!this._indexes[name]) {
      this._indexes[name] = 0;
    }

    const counterData = {
        counterId: this.guid,
        requestId: this.reqid,
        page: this.page,
        name: name,
        value: value,
        index: this._indexes[name],
        additional: this.additional,
      },
      self = this;

    this._countersBatchData.push(counterData);

    this._indexes[name]++;

    if (this._countersBatchData.length < MAX_BATCH_COUNTERS) {
      this._counterTimerId = window.setTimeout(function () {
        self.sendBatchRequest();
      }, COUNTERS_BATCH_TIMEOUT);
    } else {
      this.sendBatchRequest();
    }
  }

  sendBatchRequest() {
    const data = JSON.stringify(this._countersBatchData);

    this._countersBatchData = [];
    this._counterTimerId = null;

    const sendBeaconPostAvailable = () => navigator.sendBeacon;
    const sendBeaconResult =
      sendBeaconPostAvailable() &&
      navigator.sendBeacon(this.counterUrl, new Blob([data], { type: 'application/json' }));

    if (!sendBeaconResult) {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', this.counterUrl);
      xhr.send(data);
    }
  }
}
