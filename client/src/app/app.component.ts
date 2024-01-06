import { Component } from '@angular/core';

interface Human {
  head: {
    eyes?: string;
    mouth: boolean;
  }
  arms: number;
  legs: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor() {
    const me: Human = {
      arms: 2,
      legs: 2,
      head: {
        eyes: 'dark',
        mouth: true,
      }
    };

    const notMe = {} as Human;

    let dude: Human = {
      arms: 2,
      legs: 2,
      head: {
        eyes: undefined,
        mouth: true,
      }
    };

    if (me.head.eyes !== null && me.head.eyes !== undefined) {
      console.log(123)
    }

    if (notMe?.head?.eyes) {
      console.log(notMe?.head?.eyes)
    }

    if (dude?.head?.eyes) {
      console.log(dude?.head?.eyes)
    }
  }
  title = 'sandbox';
}
