export class WordView {
  constructor() {
    this.wordElement = document.querySelector(".word");
    this.translationButton = document.querySelectorAll(".btn-show-translation")[0];
    this.translationShown = false;
  }

  displayWord(wordObj) {
    this.wordElement.textContent = this.translationShown ? wordObj.translation : wordObj.word;
  }

  toggleTranslation(wordObj) {
    this.translationShown = !this.translationShown;
    this.displayWord(wordObj);
  }

  resetTranslationView() {
    this.translationShown = false;
  }
}
