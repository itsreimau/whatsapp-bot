const bot = require('@aidulcandra/simple-wa-bot')

// Jangan lupa untuk memulai bot setelah memprogram respons
bot.start()

// Daripada bot.start(), Anda dapat menguji bot Anda di konsol menggunakan ini
// bot.test()

// Menerima teks yang sama persis dan membalas
bot.receive("Hello").reply("Hi there")

// Menerima teks dengan nilai kesamaan (nilai 0 sampai 1)
bot.receive("Hello").similarity(0.6)
    .reply("Hi there")

// Abaikan huruf besar-kecil
bot.receive("Good morning").ignoreCase()
    .reply("Good morning to you too!")

// Abaikan huruf besar-kecil dan periksa kesamaannya
bot.receive("How are you?")
    .ignoreCase()
    .similarity(0.7)
    .reply("I'm fine")

// Balas dengan gambar
bot.receive("send pic")
    .reply() // Insert string for caption
    .image("https://url.to/your/image")
// Or path to your local image

// Multi input (akan merespons salah satunya)
bot.receive(["text1", "text2", "text3"]).reply("Yes")

// Hanya balas dalam obrolan pribadi
bot.receive("hello").privateOnly().reply("hi")

// Hanya merespons dalam obrolan grup
bot.receive("hello").groupOnly().reply("hi")

// Hanya merespons di ruang obrolan tertentu
bot.receive("hello").in("ABCDE@g.us").reply("hi")

// Hanya tanggapi ID tertentu
bot.receive("hello").from("6282123456789@s.whatsapp.net").reply("hi")
bot.receive("hello").from("xxx@s.wa.net", "yyy@s.wa.net").reply("hi")
bot.receive("hello").from([
    "6282123456789@s.whatsapp.net",
    "123456789ABCDE@g.us",
    "6282987654321@s.whatsapp.net"
]).reply("hi")

// Merespon teks yang dimulai dengan substring tertentu
bot.receiveBeginning("Do you").ignoreCase().reply("Maybe")

// Merespon teks yang mengandung substring tertentu
bot.receiveContaining("ice cream").ignoreCase().reply("Did you say ICE CREAM???")

// Merespon teks yang diakhiri dengan substring tertentu
bot.receiveEnding("?").ignoreCase().reply("You were asking?")

// Menguji pesan masuk pada pola RegEx
bot.receive(/Do you know .+ \?/i).reply("No.")

// Pencocokan pola RegEx, gunakan <<number>> untuk menyisipkan kecocokan yang diambil (dalam urutan mulai dari 1)
bot.receive(/My name is (\w+)/).reply("Nice to meet you, <<1>>!")

// Kondisi khusus (harus memasukkan fungsi)
let isActive = true

function checkActive() {
    return isActive
}
bot.receive("hey").if(checkActive).reply("heyo")
bot.receive("test").if(function() {
    return true
}).reply("test back")

// Balasan acak
bot.receive("Hi").ignoreCase().replyRandom("Hey", "Hello", "Sup?") // Can input array

// Respon default jika tidak ada program yang dijalankan
bot.defaultResponse("I don't understand.")

// Fungs run
bot.receive("date").run(function(message) {
    const name = message.sender.name
    const date = Date()
    message.reply(`Hello, ${name}! Today's date is ${date}`)
})

// Argumen kedua dari fungsi run adalah larik kecocokan yang ditangkap saat menggunakan RegEx sebagai input
bot.receive(/my name is (\w+)/i).run(function(message, matches) {
    message.reply(`Hello, ${matches[0]}!`)
})

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright("Update 'config.js'"))
    delete require.cache[file]
    require(file)
})