import fs from 'fs'
import path from "path";

const indexDir = '../index/';
const indexFilePath = path.join(indexDir, 'index.json')

export default function createSearchIndex(url, content) {
    if(!content) return
    const words = content.toLowerCase().split(/\s+/);

    const index = {};

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (!index[word]) {
            index[word] = [];
        }
        index[word].push(i);
    }

    const indexedData = { url, index };

    saveIndex(indexedData);
}

function saveIndex(data) {
    try {
        if (!fs.existsSync(indexDir)) {
            fs.mkdirSync(indexDir, { recursive: true });
        }

        const indexData = fs.existsSync(indexFilePath) ? JSON.parse(fs.readFileSync(indexFilePath)) : {};

        indexData[data.url] = data.index

        fs.writeFileSync(indexFilePath, JSON.stringify(indexData, null, 2));
        console.log(`Search index saved.`);
    } catch (error) {
        console.error('Error saving the search index:', error);
    }
}
