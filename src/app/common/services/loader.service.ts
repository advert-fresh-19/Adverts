import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {LoaderState} from 'src/app/common/ui-components/loader/loader.component';

@Injectable()
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show(): void {
    document.body.style.overflowY = 'hidden';
    this.loaderSubject.next(<LoaderState>{ show: true });
  }
  hide(): void {
      document.body.style.overflowY = 'scroll';
      this.loaderSubject.next(<LoaderState>{ show: false });
  }
}
