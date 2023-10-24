import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function cleanDirectoryName(url) {
    return url.replace(/https:\/\//, '').replace(/[^a-z0-9]/gi, '_');
}

export default async function saveWebsiteContent(url, content) {
    const { origin, pathname } = new URL(url);
    const segments = pathname.split('/').filter(Boolean);

    const topLevelDir = cleanDirectoryName(origin);

    let currentDirectory = join(__dirname, '../..', 'content', topLevelDir);

    if (!fs.existsSync(currentDirectory)) {
        fs.mkdirSync(currentDirectory, { recursive: true });
    }

    for (const segment of segments) {
        currentDirectory = join(currentDirectory, cleanDirectoryName(segment));

        if (!fs.existsSync(currentDirectory)) {
            fs.mkdirSync(currentDirectory, { recursive: true });
        }
    }

    const contentPath = join(currentDirectory, 'content.json');
    fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));

    // console.log(`Saved content for ${url} at ${contentPath}`);
}
