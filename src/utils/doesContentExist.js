import {dirname, join} from "path";
import fs from "fs";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function cleanDirectoryName(url) {
    return url.replace(/https:\/\//, '').replace(/[^a-z0-9]/gi, '_');
}

export default function doesContentExist(url) {
    const { origin, pathname } = new URL(url);
    const segments = pathname.split('/').filter(Boolean);

    const topLevelDir = cleanDirectoryName(origin);

    let currentDirectory = join(__dirname, '../../', 'content', topLevelDir);

    if (!fs.existsSync(currentDirectory)) {
        return false;
    }

    for (const segment of segments) {
        currentDirectory = join(currentDirectory, cleanDirectoryName(segment));

        if (!fs.existsSync(currentDirectory)) {
            return false;
        }
    }

    const contentPath = join(currentDirectory, 'content.json');
    if (fs.existsSync(contentPath)){
        const content = fs.readFileSync(contentPath, 'utf-8');
        return (JSON.parse(content)?? false);
    }
    return false
}

// console.log(doesContentExist('https://info.pagnis.in/blog/2020/10/13/basic-financial-hygiene/'))
