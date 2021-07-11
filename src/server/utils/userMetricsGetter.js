export default class UserMetricsGetter {
  constructor(userAgent) {
    this.ua = userAgent;
  }

  isTouchDevice() {
    return this.ua && /\b(Android|iPhone|iPad|Windows Phone|Opera Mobi|Kindle|BackBerry|PlayBook)\b/i.test(this.ua);
  }

  detectOperatingSystem() {
    if (/Win/.test(this.ua)) {
      return 'Windows';
    } else if (/(like Mac)|(iPhone OS)|(Darwin)/i.test(this.ua)) {
      return 'iOS';
    } else if (/Mac/.test(this.ua)) {
      return 'MacOS';
    } else if (/Android/i.test(this.ua)) {
      return 'Android';
    } else if (/(X11|Linux)/.test(this.ua)) {
      return 'Linux';
    }
    return 'Unknown OS';
  }
}
