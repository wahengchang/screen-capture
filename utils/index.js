import captureWebsite from 'capture-website';
import fs from 'fs';
import path from 'path';

export const processSingleUrl = async (url, config = {}, cb) => {
    const {diffSize = false} = config
    const onlyDigitChar = url.replace(/[^a-zA-Z0-9]/gm,"")
    const timestamp = (new Date()).getTime()

    await captureWebsite.file(url, `./${onlyDigitChar}-${timestamp}-desktop.jpg`, {
        width: 1920,
        fullPage: true,
        inset: 10
    });
    if(cb) {
        cb(`./${onlyDigitChar}-${timestamp}-desktop.jpg`)
    }

    if(!diffSize) { return}

    await captureWebsite.file(url, `./${onlyDigitChar}-${timestamp}-pad.jpg`, {
        width: 1100,
        fullPage: true,
        inset: 10
    });
    if(cb) {
        cb(`./${onlyDigitChar}-${timestamp}-pad.jpg`)
    }

    await captureWebsite.file(url, `./${onlyDigitChar}-${timestamp}-mobile.jpg`, {
        width: 350,
        fullPage: true,
        inset: 10
    });
    if(cb) {
        cb(`./${onlyDigitChar}-${timestamp}-mobile.jpg`)
    }
}

export const processMultipleUrl = async (arrUrl = [], _dir, config = {}, cb) => {
    const {diffSize = false} = config

    if(!arrUrl || !arrUrl.length || arrUrl.length <=0) throw new Error('[ERROR] arrUrl is null')

    const dir = _dir || path.resolve(path.dirname(''))

    fs.existsSync(dir) || fs.mkdirSync(dir);

    const timestamp = (new Date()).getTime()

    for(let i =0 ;i<arrUrl.length; i++) {
        const url = arrUrl[i]
        const onlyDigitChar = url.replace(/[^a-zA-Z0-9]/gm,"")

        await captureWebsite.file(url, `${dir}/${timestamp}/${onlyDigitChar}-desktop.jpg`, {
            width: 1920,
            fullPage: true
        });
        if(cb) {
            cb(`${dir}/${timestamp}/${onlyDigitChar}-desktop.jpg`)
        }

        if(!diffSize) { continue}

        await captureWebsite.file(url, `${dir}/${timestamp}/${onlyDigitChar}-pad.jpg`, {
            width: 1100,
            fullPage: true
        });
        if(cb) {
            cb(`${dir}/${timestamp}/${onlyDigitChar}-pad.jpg`)
        }

        await captureWebsite.file(url, `${dir}/${timestamp}/${onlyDigitChar}-mobile.jpg`, {
            width: 350,
            fullPage: true
        });
        if(cb) {
            cb(`${dir}/${timestamp}/${onlyDigitChar}-mobile.jpg`)
        }
    }

}