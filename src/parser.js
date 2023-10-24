import HTMLParser from 'node-html-parser';
import { createLink } from './utils/createLink.js';

export const extractInformation = (domain, html) => {
  const root = HTMLParser.parse(html);

  const rawLinks = root
    .querySelectorAll('a[href]:not([href=""])') // to select 'a' tags with href attribute
    .map((node) => node.attributes['href']);

  // Removes duplicate links
  const setOfLinks = new Set(rawLinks);

  const urls = Array.from(setOfLinks).map((link) => {
    // to check for undefined or null in links array
    if (link) {
      let url;
      if (link.startsWith('http://') || link.startsWith('https://')) {
        try {
          url = createLink(link);
        } catch (e) {
          url = null;
        }
      } else if (link.startsWith('/')) {
        url = createLink(`${domain}${link}`);
      }
      return url;
    }
  });

  return {
    title: root.querySelector('head title')?.rawText.trim(), // remove whitespaces
    body: root.querySelector('body')?.rawText,
    links: urls,
  };
};
