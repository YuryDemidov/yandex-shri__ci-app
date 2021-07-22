type OS = 'Windows' | 'iOS' | 'MacOS' | 'Android' | 'Linux' | 'Unknown OS';

export default class UserMetricsGetter {
  ua?: string;

  constructor(userAgent: string | undefined) {
    this.ua = userAgent;
  }

  isTouchDevice(): boolean {
    return !!this.ua && /\b(Android|iPhone|iPad|Windows Phone|Opera Mobi|Kindle|BackBerry|PlayBook)\b/i.test(this.ua);
  }

  detectOperatingSystem(): OS {
    if (!this.ua) {
      return 'Unknown OS';
    }

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
