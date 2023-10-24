import fetch from 'node-fetch';
import doesContentExist from "./doesContentExist.js"

// returns true if need to revisit based on Etag info.
// if no need to visit, returns cached content
async function shouldRevisit(url) {
    const content = doesContentExist(url)
    const lastETag = content.headers?.etag
    if(!lastETag) return [true]

    try {
        const response = await fetch(url, {
            headers: {
                'If-None-Match': lastETag
            }
        });

        if (response.status === 304) {
            console.log('Content not modified. Using cached data.');
            return [false, content];
        }

        return true;
    } catch (error) {
        console.error('Error fetching URL:', error);
        return [true];
    }
}

export default shouldRevisit

// console.log(await shouldRevisit('https://info.pagnis.in/blog/2020/10/13/basic-financial-hygiene/'))
