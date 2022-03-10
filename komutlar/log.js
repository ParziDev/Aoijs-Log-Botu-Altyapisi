module.exports = {
  name:"log",
  $if:"v4",
  code:`
  $if[$message[1]==ayarla]
  ✅ Log ayarlandı!
  $setServerVar[log;$mentionedChannels[1]]
  $onlyIf[$mentionedChannels[1]!=undefined;❎ Log kanalını etiketleyin.]
  $onlyIf[$getServerVar[log]==;❎ Log zaten ayarlanmış.]
  $endif
 
  $if[$message[1]==sıfırla]
  ✅ Log sıfırlandı!
  $setServerVar[log;]
  $onlyIf[$getServerVar[log]!=;❎ Log zaten ayarlanmamış.]
  $endif
  $onlyIf[$checkContains[$toLowercase[$message[1]];ayarla;sıfırla]==true;❎ **ayarla** veya **sıfırla** seçeneklerini kullan. \`Örn: $getServerVar[prefix]log ayarla #log\`]
  $onlyPerms[admin;❎ Bunun için **Yönetici** iznin olmalı]
  `
  }
