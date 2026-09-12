import { UAParser } from 'ua-parser-js';

export default function parseUserAgent(ua) {
  if (!ua) return { os: null, browser: null, model: null };

  const parser = new UAParser(ua);
  const os = parser.getOS(); // { name, version }
  const browser = parser.getBrowser(); // { name, version }
  const device = parser.getDevice(); // { model, type, vendor }

  return {
    os: os.name && os.version ? `${os.name} ${os.version}` : os.name || null,
    browser: browser.name || null,
    model: device.model || device.type || null,
  };
}
