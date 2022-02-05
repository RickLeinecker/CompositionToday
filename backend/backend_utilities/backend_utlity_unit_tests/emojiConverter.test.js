const EmojiConverter = require("../emojiConverter");

let emojiConverter = new EmojiConverter();

// thumbs up
test("converts thumbs up emoji to hex \n\t" + "👍" + " to " + "1f44d", () => {
  expect(emojiConverter.convertEmojiToHex("👍")).toBe("1f44d");
});
test("converts thumbs up hex to emoji \n\t" + "1f44d" + " to " + "👍", () => {
  expect(emojiConverter.convertHexToEmoji("1f44d")).toBe("👍");
});

// clapping
test("converts clapping emoji to hex \n\t" + "👏" + " to " + "1f44f", () => {
  expect(emojiConverter.convertEmojiToHex("👏")).toBe("1f44f");
});
test("converts clapping hex to emoji \n\t" + "1f44f" + " to " + "👏", () => {
  expect(emojiConverter.convertHexToEmoji("1f44f")).toBe("👏");
});

// sheet music
test("converts sheet music emoji to hex \n\t" + "🎼" + " to " + "1f3bc", () => {
  expect(emojiConverter.convertEmojiToHex("🎼")).toBe("1f3bc");
});
test("converts sheet music hex to emoji \n\t" + "1f3bc" + " to " + "🎼", () => {
  expect(emojiConverter.convertHexToEmoji("1f3bc")).toBe("🎼");
});

// smiley
test("converts smiley emoji to hex \n\t" + "😀" + " to " + "1f600", () => {
  expect(emojiConverter.convertEmojiToHex("😀")).toBe("1f600");
});
test("converts smiley hex to emoji \n\t" + "1f600" + " to " + "😀", () => {
  expect(emojiConverter.convertHexToEmoji("1f600")).toBe("😀");
});
