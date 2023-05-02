# screen-capture
This project provides an easy-to-use command-line interface for generating screenshots of websites using Node.js. 
It leverages the powerful Puppeteer library to launch a headless Chrome browser and capture a screenshot of any URL that is passed as an argument.


## Install
To install the project, you'll need to have Node.js and npm (Node Package Manager) or Yarn installed on your system. Then, follow these steps:
 - Clone this repository to your local machine by running `$ git clone git@github.com:wahengchang/screen-capture.git`
 - Run `$ npm install` or `$ yarn install` to install the project's dependencies.

## To Run
To generate a screenshot, simply run the generate-screenshot.js script with the URL you want to capture as the first argument. You can also specify an output file path (relative to the project root) as the second argument, like this:
```
$ node main.js start
? Would you like to screenshoot a single page, or a list of pages? (Use arrow keys)
❯ Single 
  List of Pages 
```

for more configuration

```
Commands:
  main.js reset  Clean the temp config after `$capture start` is run
  main.js start  Clean the temp config after `$capture start` is run

Options:
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
  --diffSize  boolean, screenshoots will be captured in 3 different sizes when t
              rue                                                      [boolean]
  --tg        set FASE to pervent upload screenshot images to telegram [boolean]
  --tgToken   telegram token, needed when --tg is on (check out: https://core.te
              legram.org/bots/api)
  --tgChatId  telegram chat id, needed when --tg is on (check out: https://core.
              telegram.org/bots/api)
```