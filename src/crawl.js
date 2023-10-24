import { extractInformation } from './parser.js';
import { downloadFromURL } from './http-download.js';

export const crawl = async (url) => {
      const {headersObject: headers, body} = await downloadFromURL(url);
      return {headers, extracted: extractInformation(url.origin, body)};
}
