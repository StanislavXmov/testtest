import './scss/index.scss';
import { Cards } from './components/Cards';

const items = [
  {
    status: 'default',
    id: 'foieGra',
    label: {
      default: 'Сказочное заморское яство', 
      selectedHover: 'Котэ не одобряет?'
    },
    title: 'Нямушка',
    subtitle: 'с фуа-гра',
    description: '10 порций; мышь в подарок',
    weightCounter: {amount: 0.5, init: 'кг'},
    info: {
      selected: 'Печень утки разварная с артишоками', 
      disabled: 'Печалька с фуа-гра закончился'
    }
  },
  {
    status: 'default',
    id: 'fish',
    label: {
      default: 'Сказочное заморское яство', 
      selectedHover: 'Котэ не одобряет?'
    },
    title: 'Нямушка',
    subtitle: 'c рыбой',
    description: '40 порций; 2 мыши в подарок',
    weightCounter: {amount: 2, init: 'кг'},
    info: {
      selected: 'Головы щучьи с чесноком да свежайшая сёмгушка', 
      disabled: 'Печалька с рыбой закончился'
    }
  },
  {
    status: 'disabled',
    id: 'chicken',
    label: {
      default: 'Сказочное заморское яство', 
      selectedHover: 'Котэ не одобряет?'
    },
    title: 'Нямушка',
    subtitle: 'c курой',
    description: '100 порций; 5 мышей в подарок; заказчик доволен',
    weightCounter: {amount: 5, init: 'кг'},
    info: { 
      selected: 'Филе из цыплят с трюфелями в бульоне', 
      disabled: 'Печалька с курой закончился'
    }
  },
];

const cards = new Cards('.cards', items);
cards.render();