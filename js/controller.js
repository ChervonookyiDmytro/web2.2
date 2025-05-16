import { WordModel } from "./model.js";
import { WordView } from "./view.js";

document.addEventListener("DOMContentLoaded", () => {
  const model = new WordModel();
  const view = new WordView();

  model.loadFromFileIfEmpty().then(() => {
    view.displayWord(model.getCurrentWord());

    document.querySelector(".btn-show-translation").addEventListener("click", () => {
      view.toggleTranslation(model.getCurrentWord());
    });

    document.querySelector(".next-word-btn").addEventListener("click", () => {
      model.nextWord();
      view.resetTranslationView();
      view.displayWord(model.getCurrentWord());
    });

    document.querySelector(".i-know-this-word-btn").addEventListener("click", () => {
      model.markAsKnown();
      model.nextWord();
      view.resetTranslationView();
      view.displayWord(model.getCurrentWord());
    });
  });
});
