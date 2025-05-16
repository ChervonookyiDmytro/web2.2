export class WordModel {
  constructor(username = null) {
    this.username = username || localStorage.getItem("activeUser") || "guest";
    this.storageKey = `words_${this.username}`;
    this.words = [];
    this.currentIndex = 0;
  }

  getCurrentWord() {
    return this.words[this.currentIndex];
  }

  markAsKnown() {
    this.words[this.currentIndex].known = true;
    this.saveToStorage();
  }

  nextWord() {
    this.currentIndex = (this.currentIndex + 1) % this.words.length;
  }

  saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.words));
  }

  loadFromStorage() {
    const data = localStorage.getItem(this.storageKey);
    if (data) this.words = JSON.parse(data);
  }

  async loadFromFileIfEmpty() {
    if (!localStorage.getItem(this.storageKey)) {
      const response = await fetch('data/words.json');
      const data = await response.json();
      this.words = data.map(item => ({ ...item, known: false }));
      this.saveToStorage();
    } else {
      this.loadFromStorage();
    }
  }

  getKnownCount() {
    return this.words.filter(w => w.known).length;
  }

  getTotalCount() {
    return this.words.length;
  }
}
