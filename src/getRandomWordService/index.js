import got from "got";
import translate from "@vitalets/google-translate-api";

export const getRandomWord = async () => {
  try {
    const RANDOM_WORD_API_URL =
      "https://random-word-api.herokuapp.com/word?lang=en";

    const [randomWord] = await got.get(RANDOM_WORD_API_URL).json();
    console.log(`Random word: [${randomWord}]`);

    const plWord = await translate(randomWord, { to: "pl" });
    const ruWord = await translate(randomWord, { to: "ru" });
    const byWord = await translate(randomWord, { to: "be" });

    const translatedWord = {
      en: randomWord,
      pl: plWord.text,
      ru: ruWord.text,
      by: byWord.text,
    };
    console.log(
      `Translated words: [${JSON.stringify(translatedWord, null, 2)}]`
    );

    return `<div>
        ${Object.keys(translatedWord)
          .map((key) => {
            return `<p>
              ${key}: ${translatedWord[key]}
            </p>`;
          })
          .join(" ")}
      </div>`;
  } catch (e) {
    console.error(`Error while getting random word: [${e.message}]`);
  }
};
