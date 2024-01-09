// Import necessary modules
import { trigger, state, style, animate, transition } from '@angular/animations';

// ...

export const heartAnimation = trigger('heartAnimation', [
  state('inactive', style({
    transform: 'scale(1)',
    color: 'rgb(255,255,255)'
  })),
  state('active', style({
    transform: 'scale(1.2)',
    color: 'rgb(255, 49, 70)'
  })),
  transition('inactive => active', animate('300ms ease-in')),
  transition('active => inactive', animate('300ms ease-out'))
]);