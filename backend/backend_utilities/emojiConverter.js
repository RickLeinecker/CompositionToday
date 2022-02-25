// backend utility to convert emojis

module.exports = class EmojiConverter {
  // convert from emoji to hex string
  convertEmojiToHex(emoji) {
    let hex = emoji.codePointAt(0).toString(16);
    return hex;
  }

  // convert from hex string to emoji
  convertHexToEmoji(hexString) {
    let hexToConvert = parseInt("0x" + hexString);
    let emoji = String.fromCodePoint(hexToConvert);
    return emoji;
  }
};

// test run
// new converter
let emojiConvert = new EmojiConverter();

// emoji to hex
let thumbsUp = emojiConvert.convertEmojiToHex("👍");
let clapping = emojiConvert.convertEmojiToHex("👏");
let sheetMusic = emojiConvert.convertEmojiToHex("🎼");
let smiley = emojiConvert.convertEmojiToHex("😀");

// hex to emoji
console.log(emojiConvert.convertHexToEmoji(thumbsUp));
console.log(emojiConvert.convertHexToEmoji(clapping));
console.log(emojiConvert.convertHexToEmoji(sheetMusic));
console.log(emojiConvert.convertHexToEmoji(smiley));
