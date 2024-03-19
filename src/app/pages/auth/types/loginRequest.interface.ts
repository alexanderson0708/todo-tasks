import { FormControl } from '@angular/forms';

export interface LoginRequestInterface {
  user: {
    email: string | null;
    password: string | null;
  };
}
export interface LoginFormInterface {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
