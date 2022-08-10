import { User } from "./users.js";
import { FormState, ValidationConfig, Validators } from "./validate.js";

export interface AppState {
  editedUser: User | undefined;
  allUsers: User[];
  UserFormValidationConfig: ValidationConfig<User>;
  UserFormErrors: string[];
  UserFormState: FormState<User>;
}

export const AppStateStore: AppState = {
  editedUser: undefined,
  allUsers: [],
  UserFormValidationConfig: {
    username: Validators.required(),
  },
  UserFormErrors: [],
  UserFormState: {},
};
