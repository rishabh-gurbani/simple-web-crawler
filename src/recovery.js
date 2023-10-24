import fs from 'fs'
import path from 'path'

const logDir = '../logs/';
const logFilePath = path.join(logDir, 'progress.log');

export function logProgress(initialUrl, queue, visited) {
    try {
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        let log = {};

        if (fs.existsSync(logFilePath)) {
            const data = fs.readFileSync(logFilePath, 'utf-8');
            log = JSON.parse(data);
        }

        log[initialUrl] = {
            queue: queue,
            visited: visited,
        };

        fs.writeFileSync(logFilePath, JSON.stringify(log, null, 2));

        console.log(`Progress logged for ${initialUrl}`);
    } catch (error) {
        console.error('Error logging progress:', error);
    }
}

export function loadProgress(initialUrl) {
    try {
        if (!fs.existsSync(logFilePath)) {
            console.log('No previous progress found. Starting web crawling from the beginning...');
            return { queue: [], visited: [] };
        }

        const data = fs.readFileSync(logFilePath, 'utf-8');
        const log = JSON.parse(data);

        const progress = log[initialUrl];

        if (progress) {
            console.log('Resuming crawling from the last known state...')
            progress.queue = progress.queue.map(url => new URL(url))
            return progress;
        } else {
            console.log('No previous progress found. Starting web crawling from the beginning...');
            return { queue: [], visited: [] };
        }
    } catch (error) {
        console.error('Error loading progress:', error);
        console.log('No previous progress found. Starting web crawling from the beginning...');
        return { queue: [], visited: [] };
    }
}

