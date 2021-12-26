const parzi = require("aoi.js")
var fs = require('fs')
const bot = new parzi.Bot({
    token: process.env.token,//.env dosyasında token yazan variablenin değerine tokeninizi yazın
    prefix:"$getServerVar[prefix]"//ayarlamalı prefix 
})
bot.onMessage()
var reader = fs.readdirSync("./komutlar/").filter(file => file.endsWith(".js"))
for(const file of reader) {    
    const command = require(`./komutlar/${file}`)
    bot.command({
        name: command.name,
        code: command.code,
        aliases: command.aliases
    })
}

////////// Status \\\\\\\\\\
bot.status({
text:"Tokyo Code",
type:"PLAYING",
status:"dnd",
time: 12
})

////////// Variables \\\\\\\\\\
bot.variables({
prefix:".",
log:"",
hex:"BLACK"
})

////////// Loglar \\\\\\\\\\

//Üye log
bot.joinCommand({
  channel:"$getServerVar[log]",
  code:`
 $author[$userTag;$authorAvatar]
 $description[📥 <@$authorID> Sunucuya katıldı.]
 $footer[ID: $authorID $addTimestamp]
 $thumbnail[$authorAvatar]
 $color[$getServerVar[hex]]
 `
  })
bot.onJoined()

bot.leaveCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[$userTag;$authorAvatar]
  $description[📤 <@$authorID> Sunucudan ayrıldı.]
  $footer[ID: $authotID $addTimestamp]
  $thumbnail[$authorAvatar]
  $color[$getServerVar[hex]]
  `
  })
bot.onLeave()

//Ban log
bot.banAddCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[$userTag;$authorAvatar]
  $description[🔒 <@$authorID> Sunucudan yasaklandı.
  
Sebep: **$getBanReason[$authorID]**]
  $footer[ID: $authorID $addTimestamp]
  $thumbnail[$authorAvatar]
  $color[$getServerVar[hex]]
  `
  })
bot.onBanAdd()

bot.banRemoveCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[$userTag;$authorAvatar]
  $description[🔓 <@$authorID> Yasağı kaldırıldı.]
  $footer[ID: $authorID $addTimestamp]
  $thumbnail[$authorAvatar]
  $color[$getServerVar[hex]]
  `
  })
bot.onBanRemove()

//Mesaj log
bot.deletedCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[$userTag;$authorAvatar]
  $description[🗑️ <@$authorID> Bir mesaj sildi.
  
Silinen Mesaj: **$message**]
$footer[ID: $authorID $addTimestamp]
$thumbnail[$authorAvatar]
$color[$getServerVar[hex]]
`
  })
bot.onMessageDelete()

bot.updateCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[$userTag;$authorAvatar]
  $description[✍🏻 <@$authorID> Bir mesajı düzenledi.
  
Eski mesaj: **$oldMessage**

Yeni Mesaj: **$message**]
$footer[ID: $authorID $addTimestamp]
$thumbnail[$authorAvatar]
$color[$getServerVar[hex]]
  `
  })
bot.onMessageUpdate()

//Kanal log
bot.channelCreateCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[$newChannel[name];$serverIcon]
  $description[📌 <#$newChannel[id]> Adlı kanal oluşturuldu.]
  $footer[ID: $newChannel[id] $addTimestamp]
  $thumbnail[$serverIcon]
  $color[$getServerVar[hex]]
  $onlyIf[$getServerVar[log]!=;]
  `
  })
bot.onChannelCreate()

bot.channelDeleteCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[$oldChannel[name];$serverIcon]
  $description[📌 **$newChannel[name]** Adlı kanal silindi.]
  $footer[$serverName $addTimestamp]
  $thumbnail[$serverIcon]
  $color[$getServerVar[hex]]
  $onlyIf[$getServerVar[log]!=;]
  `
  })
bot.onChannelDelete()

//Rol log
bot.roleCreateCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[$newRole[name];$serverIcon]
  $description[📎 <@&$newRole[id]> Adlı rol oluşturuldu.
Rol rengi: **$newRole[hexColor]**

Rol izinleri: **$newRole[permissions]**]
  $footer[ID: $newRole[id] $addTimestamp]
  $thumbnail[$serverIcon]
  $color[$getServerVar[hex]]
  `
  })
bot.onRoleCreate()

bot.roleDeleteCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[$oldRole[name];$serverIcon]
  $description[📎 **$oldRole[name]** adlı rol silindi.]
  $footer[$serverName $addTimestamp]
  $thumbnail[$serverIcon]
  $color[$getServerVar[hex]]
  `
  })
bot.onRoleDelete()

//Emoji log
bot.emojiCreateCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[$newEmoji[name];$newEmoji[url]]
  $description[$newEmoji[emoji] Emojisi eklendi.
  
Emoji adı: **$newEmoji[name]**

Emoji linki: **[Tıkla]($newEmoji[url])**]
  $footer[ID: $newEmoji[id] $addTimestamp]
  $thumbnail[$newEmoji[url]]
  $color[$getServerVar[hex]]
  `
  })
bot.onEmojiCreate()

bot.emojiDeleteCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[$oldEmoji[name];$oldEmoji[url]]
  $description[**$oldEmoji[name]** Adlı emoji silindi.

Emoji linki: **[Tıkla]($oldEmoji[url])**]
  $footer[$serverName $addTimestamp]
  $thumbnail[$oldEmoji[url]]
  $color[$getServerVar[hex]]
  `
  })
bot.onEmojiDelete()

//Ses log
bot.voiceStateUpdateCommand({
  channel:"$getServerVar[log]",
  code:`
$author[$newState[id];$userAvatar[$newState[id]]]
$description[**$newState[id]** adlı kullanıcı <#$newState[channelID]> adlı ses kanalına giriş yaptı.]
$footer[ID: $newState[id] $addTimestamp]
$thumbnail[$userAvatar[$newState[id]]]
$color[$getServerVar[hex]]
$onlyIf[$newState[channelID]!=;]
$onlyIf[$newState[channelID]==;]
`
})

bot.voiceStateUpdateCommand({
  channel:"$getServerVar[log]",
  code:`
$author[$newState[id];$userAvatar[$newState[id]]]
$description[**$newState[id]** adlı kullanıcı <#$newState[channelID]> adlı ses kanalından çıkış yaptı.]
$footer[ID: $newState[id] $addTimestamp]
$thumbnail[$userAvatar[$newState[id]]]
$color[$getServerVar[hex]]
$onlyIf[$newState[channelID]==;]
$onlyIf[$newState[channelID]!=;]
`
})
bot.onVoiceStateUpdate()
