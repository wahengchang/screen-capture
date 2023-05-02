import FormData from 'form-data'
import axios from 'axios'
import fs from 'fs'

export const uploadPhoto = async(filePath, config = {}) => {
    try {
        const {tgToken, tgChatId} = config
        const TELEGRAM_API = `https://api.telegram.org/bot${tgToken}`
        const formData = new FormData();
        
        formData.append('chat_id', tgChatId);
        formData.append('photo', fs.createReadStream(filePath));
    
        const response = await axios.post(`${TELEGRAM_API}/sendPhoto`, formData, {
            headers: formData.getHeaders(),
        });
    } catch (err) {
        console.log(err);
    }
}

export default {
    uploadPhoto
}