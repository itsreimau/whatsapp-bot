console.log('Starting...')
let path = require('path')
let fs = require('fs')
let package = require('./package.json')
const CFonts = require('cfonts')
CFonts.say('Lightweight\nWhatsApp Bot', {
    font: 'chrome',
    align: 'center',
    gradient: ['red', 'magenta']
})
CFonts.say(`'${package.name}' By @${package.author.name || package.author}`, {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
})

var isRunning = false
var mainModule = require('./main.js')

/**
 * Mulai ulang modul utama
 */
function restart() {
    if (isRunning) return

    isRunning = true
    CFonts.say('Restarting...', {
        font: 'console',
        align: 'center',
        gradient: ['red', 'magenta']
    })

    // Bongkar modul utama
    delete require.cache[require.resolve('./main.js')]

    // Mulai modul utama lagi
    mainModule = require('./main.js')
    isRunning = false
}

// Perhatikan perubahan pada file modul utama
fs.watchFile('./main.js', () => {
    fs.unwatchFile('./main.js')
    restart()
})

// Menangani penghentian proses
process.on('SIGINT', () => {
    console.log('Shutting down...')
    process.exit()
})