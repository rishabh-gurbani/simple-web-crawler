import fs from 'fs'
import path from "path";

const indexDir = '../index/';
const indexFilePath = path.join(indexDir, 'index.json')

export default function search (query){
    query = query.toLowerCase()
    try {
        if(fs.existsSync(indexFilePath)){
            const indexData = JSON.parse(fs.readFileSync(indexFilePath))
            const frequencies = []
            Object.entries(indexData).forEach(entry => {
                if (entry[1][query]) frequencies.push([entry[0], entry[1][query]])
            })
            if(frequencies.length>0) {
                const match = frequencies.reduce((acc, curr) => (acc[1].length > curr[1].length ? acc : curr));
                console.log(`${match[0]} : ${match[1].length} matches found`)
            }else{
                console.log('No match found')
            }
        }
    } catch (error) {
        console.error('Error finding search index.', error);
    }
}

search('investment')
