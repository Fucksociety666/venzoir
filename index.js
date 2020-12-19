const { create, Client } = require('venom-bot')
const fs = require('fs')
const options = require('./options')

//Autosave by Nurutomo
require('./noir.js')
nocache('./noir.js', module => console.log(`'${module}' Updated!`))

const start = async (noir = new Client()) => {

        noir.onAnyMessage((async (message) => {
        require('./noir.js')(noir, message)

        }))
}

function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

create(options(true, start))
    .then(noir => start(noir))
    .catch((error) => console.log(error))