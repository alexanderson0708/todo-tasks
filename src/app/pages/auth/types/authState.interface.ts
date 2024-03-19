import { BackendErrorsInterface } from '../../../shared/types/backendErrors.inteface';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
  currentUser: CurrentUserInterface | null | undefined;
  users: CurrentUserInterface[] | [];
}
