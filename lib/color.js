const chalk = require('chalk')
module.exports = color = (text, color) => {
    return !color ? chalk.cyan(text) : chalk.keyword(color)(text)
}