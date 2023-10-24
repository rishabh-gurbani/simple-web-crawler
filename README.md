# Web Crawler in JavaScript

Demo: https://www.loom.com/share/08ee313dfb524875a16fe2cff195ed3a?sid=17ff9861-cae0-41ce-9e6d-54e3e5288081

Start with a page, any page. Crawl a total of 100 pages and create a basic search index for words.

## Setup

Install dependencies by running

```npm install```

to let the program call any URL you can run the local script as
```npm run crawl <url> <number-of-pages>```

the `url` in the above command can be anything if no URL is passed, it fallbacks to an example URL.
the `number-ofpages` in the above command is 100 by default, if no number passed.


## High Level Design

1. Fetch a Page
2. Extract Content: Title of the page, Body of the page
3. Extract all Links
4. Visit all links in a breadth-first manner i.e. links on the current page get visited first, then links from the first link, then from the second link, and so on...
5. Store the content in an organised fashion for retrieval later.
6. Avoid recursion by maintain a list of links already visited.

## Advanced features that can be tackled :

1. Created Search index and ability to search within the crawled websites
2. Watch for cache tags and revisit or update page after expiry
3. Make the script configurable.
