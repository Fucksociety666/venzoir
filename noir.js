//CREDIT TO NOIR : github.com/noire-xv

//Require Module
const fs = require('fs')
const axios = require("axios");
const moment = require("moment");
const color = require('./lib/color')
const speed = require('performance-now')

//JSON
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'))

  let { 
    self,
    prefix,
    vhtear //Buy your apikey in vhtear.com & put it to setting.json
    } = setting

//Client Start
module.exports = noir = async (noir, message) => {
try{

	const { 
	id,	
        type,
        from,
        to,
        t,
        author, 
        sender,
        chat, 
        chatId, 
        caption, 
        isMedia, 
        mimetype,
        isGroupMsg,
        quotedMsg, 
        quotedMsgObj,
        mentionedJidList 
        } = message

    const your = sender && sender.isMe ? to : from
    const { name } = chat
    let { pushname, verifiedName } = sender
    pushname = pushname || verifiedName
    let { body } = message
    const commands = caption || body || ''
    const command = commands.toLowerCase().split(' ')[0] || ''
    const time = moment(t * 1000).format('DD/MM HH:mm:ss')
    const args =  commands.split(' ')
    const isCmd = command.startsWith(prefix)
    const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'

//Function
const msgs = (message) => {
    if (command.startsWith(`${prefix}`)) { 
        if (message.length >= 10){
            return `${message.substr(0, 15)}`
            }else{
            return `${message}`
            }
        }
    }

function yourSelf () {
    if(self == true) {
        return false
    }else{
        return true
        }
    }

    const yourNumber = 'Your Number' //Owner Number
    const isYours = yourNumber.includes(sender.id)
    const yourName = 'NOIR' //Owner Name

    //SELF Switch
    if (body == `${prefix}public`) {
        if (!isYours) return
        if(setting.self === false) return noir.reply(your, 'Public Mode is recently on!', id)
        setting.self = false
        self = false
        fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null, 2))
        noir.reply(your, '𝗣𝗨𝗕𝗟𝗜𝗖 𝗠𝗢𝗗𝗘!', id)
    }

    //Example Feature

    //Configuration Menu
    if (isYours && command.startsWith(`${prefix}`)) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mCMD\x1b[1;37m]', time, color(msgs(command)), 'from', color(yourName), 'in', color(name))
	if (yourSelf() || isYours){
    	switch (command) {
        case prefix+'self':
            if (!isYours) return
            if (setting.self === true) return noir.reply(your, 'Self Mode is recently on!', id)            
            setting.self = true
            self = true
            fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null, 2))
            noir.reply(your, '𝗦𝗘𝗟𝗙 𝗠𝗢𝗗𝗘!', id)
            break
        case prefix+'setprefix':
            if (!isYours) return noir.reply(your, 'Only Owner', id)
            const pref = body.slice(11) 
            setting.prefix = `${pref}`
            prefix = `${pref}`
            fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null,2))
            noir.reply(your, `Success change prefix to : " ${pref} "`, id)
            break
        case prefix+'ping':
            const timestamp = speed();
            const latensi = speed() - timestamp
            noir.reply(your, `Ping: ${latensi.toFixed(4)}ms`, id)
            break

        //Fun Menu -EXAMPLE
        case prefix+'tahta':
            const harta = body.slice(7)
            if (!harta) return noir.reply(your, 'Text?', id)
            if (harta.length > 7) return noir.reply(your, 'Max 7!', id)
            noir.sendText(your, 'Downloading...', id)
            await noir.sendImage(your, `https://api.vhtear.com/hartatahta?text=${harta}&apikey=${vhtear}`,`${harta}.jpg`,``, id)        
            break        
   	}
}	

} catch (err) {
        console.log(color('[ERROR]', 'red'), err)	
    }
}
