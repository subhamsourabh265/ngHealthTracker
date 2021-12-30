import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scaleY(95%)' }),
      animate('0.5s', style({ opacity: 1, transform: 'scaleY(100%)' })),
    ]),
    transition(':leave', [
      animate('0.5s', style({ opacity: 0, transform: 'scaleY(-100%)' })),
    ]),
]);
