import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';


@Component({
  selector: 'sb-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: { subscriptSizing: 'dynamic' } as MatFormFieldDefaultOptions,
  }],
})
export class InputComponent {

  @ViewChild('input', { static: true })
  input?: ElementRef;

  @Output()
  submit: EventEmitter<string> = new EventEmitter();

  onSubmit(): void {
    const input: HTMLTextAreaElement = this.input?.nativeElement;
    const value = input?.value;
    if (value) {
      this.submit.emit(value);
      input.value = '';
    }
  }

  onEnterSubmit(event: Event): void {
    event.preventDefault();
    this.onSubmit();
  }

  reset(): void {
    if (this.input) {
      this.input.nativeElement.value = '';
    }
  }

}
