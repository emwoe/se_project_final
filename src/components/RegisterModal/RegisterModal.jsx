import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function RegisterModal({
  handleModalClose,
  activeModal,
  handleRegistration,
  handleLoginClick,
  isLoading,
}) {
  const { values, isValid, errors, handleChange, resetForm } =
    useFormAndValidation();

  const handleSubmit = (evt) => {
    console.log("Submitting!");
    evt.preventDefault();
    if (!isValid) {
      return;
    }
    handleRegistration({
      email: values.email,
      password: values.password,
      name: values.name,
    });
    resetForm();
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Saving..." : "Next"}
      secondbuttonText="or Log in"
      onSecondClick={handleLoginClick}
      name="register"
      handleModalClose={handleModalClose}
      isOpen={activeModal === "register"}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      {errors.username && (
        <span className="modal__input-error_active">{errors.username}</span>
      )}
      <input
        type="text"
        name="username"
        className="modal__input"
        id="username"
        placeholder="Username"
        onChange={handleChange}
        value={values.username || ""}
        required
        minLength="2"
        maxLength="40"
      ></input>
      {errors.email && (
        <span className="modal__input-error_active">{errors.email}</span>
      )}
      <input
        type="email"
        name="email"
        className="modal__input"
        id="email"
        placeholder="Email"
        onChange={handleChange}
        value={values.email || ""}
        required
      ></input>
      {errors.password && (
        <span className="modal__input-error_active">{errors.password}</span>
      )}
      <input
        type="password"
        name="password"
        className="modal__input"
        id="password"
        placeholder="Password"
        onChange={handleChange}
        value={values.password || ""}
        required
        minLength="8"
        maxLength="40"
      ></input>
      {errors.passwordcheck && (
        <span className="modal__input-error_active">
          {errors.passwordcheck}
        </span>
      )}
      <input
        type="password"
        name="passwordcheck"
        className="modal__input"
        id="passwordcheck"
        placeholder="Password again"
        onChange={handleChange}
        value={values.passwordcheck || ""}
        required
        minLength="8"
        maxLength="40"
      ></input>
    </ModalWithForm>
  );
}

export default RegisterModal;
