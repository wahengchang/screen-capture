import { processMultipleUrl, processSingleUrl } from './utils/index.js'
import fs from 'fs';
import ProgressBar from 'progress'
import {uploadPhoto} from './utils/tg.js'
import yargs from 'yargs'
import inquirer from './utils/inquirer.js'
import CONST from './const.js'

(async () => {
    const argv = yargs(process.argv.slice(2))
    .command('reset', 'Clean the temp config after `$capture start` is run', () => {
        inquirer.reset()
        process.exit()
    })
    .command('start', 'Clean the temp config after `$capture start` is run', async (_argv) => {
        const {tg, tgToken,tgChatId, diffSize} = _argv.argv

        if(tg && (!tgToken || !tgChatId) ) {
            throw new Error('[ERROR] both tgToekn and tgChatId are needed')
        }

        const  { type, listPagesFile, singleLineUrl }  = await inquirer.init()

        if (type === CONST['single'] && singleLineUrl) {
            await processSingleUrl(singleLineUrl, {diffSize}, (filePath) => {
                if(tg) {
                    uploadPhoto(filePath, {
                        tgChatId, tgToken
                    })
                }
            })
            return
        }

        if (type === CONST['listOfPages'] && listPagesFile) {

            const _urlList = fs.readFileSync(listPagesFile).toString().split("\n");
            const urlList = [...new Set(_urlList)]
            const onlyDigitChar = listPagesFile.replace(/[^a-zA-Z]/gm, "")
            const tempDir = `_${onlyDigitChar}`

            fs.existsSync(`./${tempDir}`) || fs.mkdirSync(`./${tempDir}`);

            console.log (`[INFO] going to process [${urlList.length} links]`)

            let ticks = 0
            const max = urlList.length
            const multi = diffSize ? 3 : 1
            const bar = new ProgressBar(
                'Rocket launch :bar in :counter',
                { total: max*multi, width: 50 },
            )
            
            await processMultipleUrl(urlList, `./${tempDir}`, {diffSize}, (filePath) => {
                ticks++
                bar.tick({ counter: max*multi - ticks })
                if(tg) {
                    uploadPhoto(filePath, {
                        tgChatId, tgToken
                    })
                }
                if (bar.complete) {
                    console.log('\n🚀')
                }
            })
            return
        }
    })
    .option('diffSize', {
        type: 'boolean',
        description: 'boolean, screenshoots will be captured in 3 different sizes when true'
    })
    .option('tg', {
        type: 'boolean',
        description: 'set FASE to pervent upload screenshot images to telegram'
    })
    .option('tgToken', {
        description: 'telegram token, needed when --tg is on (check out: https://core.telegram.org/bots/api)'
    })
    .option('tgChatId', {
        description: 'telegram chat id, needed when --tg is on (check out: https://core.telegram.org/bots/api)'
    })
    .argv;
})()