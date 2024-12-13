import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function LoginModal({
  handleModalClose,
  activeModal,
  handleLogin,
  handleRegClick,
  isLoading,
}) {
  const { values, errors, isValid, handleChange } = useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) {
      return;
    }
    handleLogin({ email: values.loginemail, password: values.loginpassword });
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText={isLoading ? "Saving..." : "Log in"}
      secondbuttonText="or Sign up"
      onSecondClick={handleRegClick}
      name="login"
      handleModalClose={handleModalClose}
      isOpen={activeModal === "login"}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      {errors.loginemail && (
        <span className="modal__input-error_active">{errors.loginemail}</span>
      )}
      <input
        type="email"
        name="loginemail"
        className="modal__input"
        id="loginemail"
        placeholder="Email"
        onChange={handleChange}
        value={values.loginemail || ""}
        required
      ></input>
      {errors.loginpassword && (
        <span className="modal__input-error_active">
          {errors.loginpassword}
        </span>
      )}
      <input
        type="password"
        name="loginpassword"
        className="modal__input"
        id="loginpassword"
        placeholder="Password"
        onChange={handleChange}
        value={values.loginpassword || ""}
        required
        minLength="8"
        maxLength="40"
      ></input>
    </ModalWithForm>
  );
}

export default LoginModal;
