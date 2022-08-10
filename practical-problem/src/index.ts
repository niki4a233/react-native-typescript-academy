import { ValidationConfig, ValidationResult } from "./validate";

import { User } from "./users.js";
import { FormFieldDict, IdType } from "./shared-types.js";
import { AppStateStore } from "./state-store";

class UsersController {
  usersSection = document.getElementById("users")!;
  erorrsDiv = document.getElementById("errors")!;
  protected adduserForm = document.getElementById(
    "add-user-form"
  )! as HTMLFormElement;
  resetButton = document.getElementById(
    "form-reset-button"
  )! as HTMLButtonElement;

  async init() {
    this.adduserForm.addEventListener("submit", this.handleSubmituser);
    this.resetButton.addEventListener("click", this.resetForm);
    this.adduserForm.addEventListener("change", this.validateForm, true);

    try {
      const allUsers = await UsersAPI.getAllusers();
      AppStateStore.allUsers = allUsers;
      this.showUsers(allUsers);
    } catch (err) {
      this.showError(err);
    }
  }

  // initFormState(formElement: HTMLFormElement) {
  //   const formData = new FormData(formElement);
  //   const np: FormFieldDict<FormFieldState> = {};
  //   formData.forEach((value, key) => {
  //     np[key] = new FormFieldState(ValidStatus.INVALID, ChangedStatus.PRISTINE);
  //   })
  // }

  showUsers(users: User[]) {
    users.forEach((user) => this.addUserDOM(user));
  }

  showError(err: any) {
    this.erorrsDiv.innerHTML = `<div>${err}</div>`;
  }

  addUserDOM(user: User) {
    const userElem = document.createElement("article");
    userElem.setAttribute("id", user.id!.toString());
    userElem.className = "col s12 m6 l4";
    this.updateArticleInnerHtml(userElem, user);
    this.usersSection.insertAdjacentElement("beforeend", userElem);
  }

  updateuserDOM(user: Users) {
    const userElem = document.getElementById(user.id!.toString())!;
    this.updateArticleInnerHtml(userElem, User);
  }

  private updateArticleInnerHtml(userElem: HTMLElement, user: User) {
    userElem.innerHTML = `
        <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="${user.imageUrl}">
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">${user.username}<i class="material-icons right">more_vert</i></span>
          <p>Author: ${user.id}, }</p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${user.username}<i class="material-icons right">close</i></span>
          <p>${user.content}</p>
        </div>
        <div class="card-action">
          <button class="btn waves-effect waves-light" type="button" id="edit${user.id}">Edit
            <i class="material-icons right">send</i>
          </button>
          <button class="btn waves-effect waves-light red lighten-1" type="button" id="delete${user.id}">Delete
            <i class="material-icons right">clear</i>
          </button>
        </div>
        </div>
        `;
    userElem
      .querySelector(`#delete${user.id}`)!
      .addEventListener("click", (event) => this.deleteUser(user.id!));
    userElem
      .querySelector(`#edit${user.id}`)!
      .addEventListener("click", (event) => this.editUser(user));
  }

  editUser(user: User) {
    this.fillUserForm(user);
    window.scrollTo(0, 0);
    AppStateStore.editedUser = user;
  }

  fillUserForm(user: User) {
    let field: keyof User;
    for (field in user) {
      (document.getElementById(field) as HTMLFormElement).value = user[field];
      const label = document.querySelector(
        `#add-user-form label[for=${field}]`
      );
      if (label) {
        label.className = "active";
      }
    }
  }

  handleSubmituser = async (event: SubmitEvent) => {
    try {
      event.preventDefault();
      const user = this.getuserFormSnapshot();

      if (user.id) {
        const updated = await UsersAPI.updateuser(user);
        this.updateuserDOM(updated);
        AppStateStore.editedUser = undefined;
      } else {
        const created = await UsersAPI.addNewuser(user);
        this.addUserDOM(created);
      }
      this.resetForm();
    } catch (err) {
      this.showError(err);
    }
  };

  getuserFormSnapshot(): User {
    const formData = new FormData(this.adduserForm);
    const np: FormFieldDict<string> = {};
    formData.forEach((value, key) => {
      np[key] = value.toString();
    });
    return new User(
      np.title,
      np.content,
      np.tags.split(/\W+/),
      np.imageUrl,
      np.authorId ? parseInt(np.authorId) : undefined,
      parseInt(np.id)
    );
  }

  resetForm = () => {
    if (AppStateStore.editedUser) {
      this.fillUserForm(AppStateStore.editedUser);
    } else {
      this.adduserForm.reset();
    }
  };

  async deleteUser(userID: IdType) {
    try {
      await UsersAPI.deleteuserById(userID);
      document.getElementById(userID!.toString())?.remove();
    } catch (err) {
      this.showError(err);
    }
  }

  validateForm = (event: Event) => {
    const validationResult: ValidationResult<User> = {};
    const config = AppStateStore.UserFormValidationConfig;
    const formSnapshot = this.getuserFormSnapshot();
    let field: keyof ValidationConfig<User>;
    for (field in config) {
      const validator = config[field];
      if (validator !== undefined) {
        try {
          const fieldValue = formSnapshot[field];
          validator(fieldValue ? fieldValue.toString() : "", field);
        } catch (err) {
          validationResult[field] = [err as string];
        }
      }
    }
    this.showValidationErrors(validationResult);
  };

  showValidationErrors(validationResult: ValidationResult<User>) {
    AppStateStore.UserFormErrors = [];
    let field: keyof ValidationResult<User>;
    for (field in validationResult) {
      const filedErrors = validationResult[field];
      if (filedErrors !== undefined) {
        for (const err of filedErrors) {
          AppStateStore.UserFormErrors.push(`${field} -> ${err}<br>`);
        }
      }
    }
    this.showError(AppStateStore.UserFormErrors);
  }
}

const blogsController = new UsersController();

blogsController.init();
