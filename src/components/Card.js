export class Card {
  constructor(options, {add, remove, isMobile}) {
    this.options = options;
    this.isMobile = isMobile;
    this.id = options.id;
    this.state = options.status || 'default';
    this.$element = this.createElement();
    this.$card = this.$element.querySelector('[data-card-main]');
    this.$cardLabel = this.$element.querySelector('[data-card-label]');
    this.$cardInfo = this.$element.querySelector('[data-card-info]');
    this.add = add;
    this.remove = remove;
    this.cardListeners = this.isMobile ? ['click'] : ['click', 'mouseleave', 'mouseenter'];
    this.cardInfoListeners = ['click'];
    this.initListeners(this.$card, 'Card', this.cardListeners);
    this.initListeners(this.$cardInfo, 'CardInfo', this.cardInfoListeners);
    this.checkChanges = false;
    this.selectedHover = false;
  }

  createElement() {
    const $el = document.createElement('article');
    const card = this.options;
    $el.classList.add('card', card.status === 'disabled'? 'card_disabled': 'card_default');
    $el.innerHTML = `
      <div class="card__wrapper ${this.isMobile ? 'no-hover' : ''}" data-card-main>
        <svg>
            <clipPath id="cardPath">
              <path d="M0,44 L44,0 L320,0 L320,480 L10,480 Q0,480 0,470 L0,44 Z"></path>
            </clipPath>
        </svg>
        <div class="card__label" data-card-label>
          ${card.label.default}
        </div>
        <div class="card__title">
          <h2>${card.title}</h2> 
        </div>
        <div class="card__subtitle">
          ${card.subtitle}
        </div>
        <div class="card__descr">
          ${description(card.description)}
        </div>
        <div class="card__weight-counter">
          <div class="amount">${card.weightCounter.amount}</div>
          <div class="init">${card.weightCounter.init}</div>
        </div>
        <img class="card__image" src="cate.png" alt="">
      </div>
      ${this.createInfo(card.info.disabled, card.info.selected)}
  `;
    return $el;
  }

  toHTML() {
  return this.$element;
  }

  initListeners(element, name, listeners) {
    if (this.state === 'disabled') {
      return;
    }
    listeners.forEach(l => {
      const method = `on${name}${capitalize(l)}`;
      this[method] = this[method].bind(this);
      element.addEventListener(l, this[method]);
    });
  }
  removeListeners(element, listeners) {
    listeners.forEach(l => {
      const method = `on${name}${capitalize(l)}`;
      element.removeEventListener(l, this[method]);
    });
  }

  createInfo(disabled, selected) {
    return `
    <div class="card__info" data-card-info>
    ${this.state === 'disabled'
    ? `<p>${disabled }</p>`
    : this.state === 'selected' 
    ? `<p>${selected }</p>` 
    : '<p>Чего сидишь? порадуй котэ, <a href="#" data-button="buy">купи</a></p>'}
    </div>
    `;
  }

  setInfo() {
    this.$cardInfo.innerHTML = `${this.createInfo(this.options.info.disabled, this.options.info.selected)}`;
  }

  onCardClick(e) {
    if (this.state === 'selected') {
      this.state = 'default';
      this.setInfo();
      this.remove(this.id);
    } else {
      this.state = 'selected';
      this.setInfo();
      this.add(this.options);
    }
    this.checkChanges = true;
    if (this.isMobile) {
      this.onCardMouseleave();
    }
  }
  onCardTouchstart(e) {
    this.onCardClick();
  }

  onCardMouseleave(e) {
    if (this.checkChanges) {
      this.checkChanges = !this.checkChanges;
      toggleClass.call(this, this.state === 'selected');
    }
    if (this.selectedHover) {
      this.selectedHover = false;
      this.$cardLabel.textContent = this.options.label.default;
    }
  }
  onCardTouchend(e) {
    this.onCardMouseleave();
  }
  onCardMouseenter(e) {
    if (this.state === 'selected'){
      this.$cardLabel.textContent = this.options.label.selectedHover;
      this.selectedHover = true;
    }
  }
  onCardInfoClick(e) {
    e.preventDefault();
    if (e.target.dataset.button) {
      this.onCardClick();
      this.onCardMouseleave();
    }
  }
  onCardInfoTouchstart(e) {
    this.onCardInfoClick(e);
  }
}

function description(descr) {
  return descr
    .split('').map(s => {
      if (!Number.isNaN(parseInt(s, 10))) {
        return `<strong>${s}</strong>`;
      } else {
        return s;
      }
    }).join('')
    .split('; ').map(d => `<p>${d}</p>`).join('');
}
function capitalize(str) {
  if (typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function toggleClass(bool) {
  if (bool) {
    this.$element.classList.remove('card_default');
    this.$element.classList.add('card_selected');
  } else {
    this.$element.classList.remove('card_selected');
    this.$element.classList.add('card_default');
  } 
}
