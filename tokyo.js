const aoijs = require("aoi.js")
const bot = new aoijs.Bot({
token: process.env.token, 
prefix: "$getServerVar[prefix]", 
intents: "all" 
}) 

const loader = new aoijs.LoadCommands(bot)
loader.load(bot.cmd,"./komutlar/")

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
 $author[1;$userTag;$authorAvatar]
 $description[1;📥 <@$authorID> Sunucuya katıldı.]
 $footer[1;ID: $authorID $addTimestamp]
 $thumbnail[1;$authorAvatar]
 $color[1;$getServerVar[hex]]
 `
  })
bot.onJoin()

bot.leaveCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[1;$userTag;$authorAvatar]
  $description[1;📤 <@$authorID> Sunucudan ayrıldı.]
  $footer[1;ID: $authotID $addTimestamp]
  $thumbnail[1;$authorAvatar]
  $color[1;$getServerVar[hex]]
  `
  })
bot.onLeave()

//Ban log
bot.banAddCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[1;$userTag;$authorAvatar]
  $description[1;🔒 <@$authorID> Sunucudan yasaklandı.
  
Sebep: **$getBanReason[$authorID]**]
  $footer[1;ID: $authorID $addTimestamp]
  $thumbnail[1;$authorAvatar]
  $color[1;$getServerVar[hex]]
  `
  })
bot.onBanAdd()

bot.banRemoveCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[1;$userTag;$authorAvatar]
  $description[1;🔓 <@$authorID> Yasağı kaldırıldı.]
  $footer[1;ID: $authorID $addTimestamp]
  $thumbnail[1;$authorAvatar]
  $color[1;$getServerVar[hex]]
  `
  })
bot.onBanRemove()

//Mesaj log
bot.deletedCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[1;$userTag;$authorAvatar]
  $description[1;🗑️ <@$authorID> Bir mesaj sildi.
  
Silinen Mesaj: **$message**]
$footer[1;ID: $authorID $addTimestamp]
$thumbnail[1;$authorAvatar]
$color[1;$getServerVar[hex]]
`
  })
bot.onMessageDelete()

bot.updateCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[1;$userTag;$authorAvatar]
  $description[1;✍🏻 <@$authorID> Bir mesajı düzenledi.
  
Eski mesaj: **$oldMessage**

Yeni Mesaj: **$message**]
$footer[1;ID: $authorID $addTimestamp]
$thumbnail[1;$authorAvatar]
$color[1;$getServerVar[hex]]
  `
  })
bot.onMessageUpdate()

//Kanal log
bot.channelCreateCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[1;$newChannel[name];$serverIcon]
  $description[1;📌 <#$newChannel[id]> Adlı kanal oluşturuldu.]
  $footer[1;ID: $newChannel[id] $addTimestamp]
  $thumbnail[1;$serverIcon]
  $color[1;$getServerVar[hex]]
  $onlyIf[$getServerVar[log]!=;]
  `
  })
bot.onChannelCreate()

bot.channelDeleteCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[1;$oldChannel[name];$serverIcon]
  $description[1;📌 **$newChannel[name]** Adlı kanal silindi.]
  $footer[1;$serverName $addTimestamp]
  $thumbnail[1;$serverIcon]
  $color[1;$getServerVar[hex]]
  $onlyIf[$getServerVar[log]!=;]
  `
  })
bot.onChannelDelete()

//Rol log
bot.roleCreateCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[1;$newRole[name];$serverIcon]
  $description[1;📎 <@&$newRole[id]> Adlı rol oluşturuldu.
Rol rengi: **$newRole[hexColor]**

Rol izinleri: **$newRole[permissions]**]
  $footer[1;ID: $newRole[id] $addTimestamp]
  $thumbnail[1;$serverIcon]
  $color[1;$getServerVar[hex]]
  `
  })
bot.onRoleCreate()

bot.roleDeleteCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[1;$oldRole[name];$serverIcon]
  $description[1;📎 **$oldRole[name]** adlı rol silindi.]
  $footer[1;$serverName $addTimestamp]
  $thumbnail[1;$serverIcon]
  $color[1;$getServerVar[hex]]
  `
  })
bot.onRoleDelete()

//Emoji log
bot.emojiCreateCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[1;$newEmoji[name];$newEmoji[url]]
  $description[1;$newEmoji[emoji] Emojisi eklendi.
  
Emoji adı: **$newEmoji[name]**

Emoji linki: **[Tıkla]($newEmoji[url])**]
  $footer[1;ID: $newEmoji[id] $addTimestamp]
  $thumbnail[1;$newEmoji[url]]
  $color[1;$getServerVar[hex]]
  `
  })
bot.onEmojiCreate()

bot.emojiDeleteCommand({
  channel:"$getServerVar[log]",
  code:`
  $author[1;$oldEmoji[name];$oldEmoji[url]]
  $description[1;**$oldEmoji[name]** Adlı emoji silindi.

Emoji linki: **[Tıkla]($oldEmoji[url])**]
  $footer[1;$serverName $addTimestamp]
  $thumbnail[1;$oldEmoji[url]]
  $color[1;$getServerVar[hex]]
  `
  })
bot.onEmojiDelete()

//Ses log
bot.voiceStateUpdateCommand({
  channel:"$getServerVar[log]",
  code:`
$author[1;$newState[id];$userAvatar[$newState[id]]]
$description[1;**$newState[id]** adlı kullanıcı <#$newState[channelID]> adlı ses kanalına giriş yaptı.]
$footer[1;ID: $newState[id] $addTimestamp]
$thumbnail[1;$userAvatar[$newState[id]]]
$color[1;$getServerVar[hex]]
$onlyIf[$newState[channelID]!=;]
$onlyIf[$newState[channelID]==;]
`
})

bot.voiceStateUpdateCommand({
  channel:"$getServerVar[log]",
  code:`
$author[1;$newState[id];$userAvatar[$newState[id]]]
$description[1;**$newState[id]** adlı kullanıcı <#$newState[channelID]> adlı ses kanalından çıkış yaptı.]
$footer[1;ID: $newState[id] $addTimestamp]
$thumbnail[1;$userAvatar[$newState[id]]]
$color[1;$getServerVar[hex]]
$onlyIf[$newState[channelID]==;]
$onlyIf[$newState[channelID]!=;]
`
})
bot.onVoiceStateUpdate()
