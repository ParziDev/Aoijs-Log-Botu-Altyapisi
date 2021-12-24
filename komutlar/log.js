module.exports = {
  name:"log",
  code:`
  $if[$message[1]==ayarla]
  $reply[$messageID;✅ Log ayarlandı!;yes]
  $setServerVar[log;$mentionedChannels[1]]
  $onlyIf[$mentionedChannels[1]!=;❎ Log kanalını etiketleyin.]
  $onlyIf[$getServerVar[log]==;❎ Log zaten ayarlanmış.]
  $endif
 
  $if[$message[1]==sıfırla]
  $reply[$messageID;✅ Log sıfırlandı!;yes]
  $setServerVar[log;]
  $onlyIf[$getServerVar[log]!=;❎ Log zaten ayarlanmamış.]
  $endif
  $onlyIf[$checkContains[$toLowercase[$message[1]];ayarla;sıfırla]==true;❎ **ayarla** veya **sıfırla** seçeneklerini kullan. \`Örn: $getServerVar[prefix]log ayarla #log\`]
  $onlyPerms[admin;❎ Bunun için **Yönetici** iznin olmalı]
  `
  }
