import {crawl} from "./crawl.js";
import {createLink} from "./utils/createLink.js";
import saveWebsiteContent from "./utils/saveWebsiteContent.js";
import shouldRevisit from "./utils/shouldRevisit.js";
import {logProgress, loadProgress} from "./recovery.js";
import createSearchIndex from "./searchIndex.js";

const args = process.argv.slice(2);

const url =
    args[0] && createLink(args[0])
        ? createLink(args[0])
        : createLink(
            'https://info.pagnis.in/blog/2020/10/13/basic-financial-hygiene/'
        );

const n = args[1] ?? 50;

// ignore actions
const blockList = ['www.addtoany.com'];

const notInBlockList = (toCheck) => !blockList.find(uri => toCheck?.href.includes(uri))

const {queue, visited} = loadProgress(url.href)
if(queue.length === 0 ) queue.push(url);

while (queue.length > 0 && visited.length < n) {
    const url = queue.shift();

    if (!visited.includes(url.href)) {
        console.log(`Progress: ${visited.length}/${n}`);
        console.log(`Currently at: ${url.href}`);

        const shouldVisitOrRevisit = await shouldRevisit(url.href)
        let headers, extracted

        if(shouldVisitOrRevisit[0]){
            const result = await crawl(url);
            headers = result.headers
            extracted = result.extracted
            saveWebsiteContent(url.href, { headers, extracted });
            createSearchIndex(url.href, extracted.body)
        }else{
            const result = shouldVisitOrRevisit[1]
            headers = result.headers
            extracted = result.extracted
            extracted.links = extracted.links.map(link => new URL(link))
        }

        visited.push(url.href);

        const toExtract = extracted.links.filter(uri => uri && !visited.includes(uri) && !queue.includes(uri) && notInBlockList(uri));
        queue.push(...toExtract);

        logProgress(visited[0], queue, visited)
    }
}

console.log(`visited`);
console.log(visited);
