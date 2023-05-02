import fs from 'fs';
import inquirer from 'inquirer'
import CONST, {tempConfigFilename} from '../const.js'

const questions = [
    {
        type: "list",
        name: "type",
        message: "Would you like to screenshoot a single page, or a list of pages?",
        choices: [CONST['single'], CONST['listOfPages']]
    },
    {
        type: "input",
        name: "singleLineUrl",
        message: "What is the Url?",
        when(answers) {
            return answers.type === CONST['single']
        }
    },
    {
        type: "input",
        name: "listPagesFile",
        message: "What is the location of url list.txt?",
        when(answers) {
            return answers.type === CONST['listOfPages']
        }
    },
    {
        type: "list",
        name: "isSave",
        message: "Do you wanna save the setting?",
        choices: ['y', 'n'],
        when(answers) {
            return answers.type
        }
    },
]


export const init = async () => {
    fs.existsSync(`./${tempConfigFilename}`) || fs.writeFileSync(`./${tempConfigFilename}`, '{}', 'utf8');
    const { type, listPagesFile, singleLineUrl } = JSON.parse(fs.readFileSync(`./${tempConfigFilename}`));
    let answers

    if (!type) {
        answers = await inquirer.prompt(questions)
        const { isSave } = answers

        if (isSave && isSave === 'y') {
            fs.writeFileSync(`./${tempConfigFilename}`, JSON.stringify(answers), 'utf8')
        }
    }

    return {
        type: type || (answers && answers.type),
        listPagesFile: listPagesFile || (answers && answers.listPagesFile),
        singleLineUrl: singleLineUrl || (answers && answers.singleLineUrl)
    }
}

export const reset = () => {
    return fs.existsSync(`./${tempConfigFilename}`) && fs.unlinkSync(`./${tempConfigFilename}`)
}

export default {
    init,
    reset
}