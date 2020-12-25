import { Card } from "./Card";

export class Cards {
  constructor(selector, options = []) {
    this.$root = document.querySelector(selector);
    this.options = options;
    this.cards = [];
    this.selectedCards = [];
    this.title = null;
    this.isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);
    this.init();
    this.titleContentDefault = this.title.textContent;
  }

  init() {
    this.title = document.createElement('h1');
    this.title.textContent = 'Ты сегодня покормил кота?';
    this.title.setAttribute('data-cards', 'title');
    this.cardsWrapper = document.createElement('div');
    this.cardsWrapper.classList.add('cards__wrapper');
    this.$root.append(this.title);
    this.$root.append(this.cardsWrapper);

    const cardOptions = {
      add: this.addCart.bind(this),
      remove: this.removeCart.bind(this),
      isMobile: this.isMobile
    }
    this.options.forEach(card => {
      this.cards.push(new Card(card, cardOptions));
    });
  }

  render() {
    this.cards.forEach(card => this.cardsWrapper.append(card.toHTML()));
  }

  addCart(cart) {
    this.selectedCards.push(cart);
    this.setTitle();
  }
  removeCart(id) {
    this.selectedCards = this.selectedCards.filter(c => id !== c.id);
    this.setTitle();
  }
  setTitle() {
    let content = `Ты выбрал Нямушку `;
    if (this.selectedCards.length) {
      this.selectedCards.forEach((c, i) => {
        if (this.selectedCards.length === 1){
          content += `${c.subtitle}!`;
        } else {
          if (i === this.selectedCards.length - 1) {
            content += `и ${c.subtitle}!`;
          } else if (this.selectedCards.length > 2) {
            content += `${c.subtitle}, `;
          } else {
            content += `${c.subtitle} `;
          }
        }
      })
    } else {
      content = this.titleContentDefault;
    }
    this.title.textContent = content;
  }
}
