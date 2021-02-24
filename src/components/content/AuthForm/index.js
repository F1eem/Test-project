import React from "react";
import { Button, Error, Field, FormWrapper, Header } from "./units";
import { login } from "redux/authReduser";
import { connect } from "react-redux";
import { useInput } from "../../Hooks/useInput";

const AuthForm = ({ login, loginError }) => {
  const email = useInput("", {
    isEmpty: true,
    minLength: 4,
    maxLength: 15,
    isEmail: true,
  });
  const password = useInput("", { isEmpty: true, minLength: 4, maxLength: 15 });
  return (
    <FormWrapper>
      <Header>Authorization</Header>
      {email.isDirty &&
        (email.isEmpty ||
          email.isEmail ||
          email.minLengthError ||
          email.maxLengthError) && (
          <div>
            <Error>{email.isEmpty}</Error>
            <Error> {email.isEmail}</Error>
            <Error>{email.minLengthError}</Error>
            <Error>{email.maxLengthError}</Error>
          </div>
        )}
      <Field
        value={email.value}
        onBlur={email.onBlur}
        onChange={email.onChange}
        placeholder={"Your email"}
      />
      {password.isDirty &&
        (password.isEmpty ||
          password.maxLengthError ||
          password.minLengthError) && (
          <div>
            <Error>{password.isEmpty}</Error>
            <Error> {password.maxLengthError}</Error>
            <Error>{password.minLengthError}</Error>
          </div>
        )}
      <Field
        value={password.value}
        onBlur={password.onBlur}
        onChange={password.onChange}
        placeholder={"Your password"}
        type={"password"}
      />
      {loginError && <Error>{loginError}</Error>}
      <Button
        onClick={() => login(email.value, password.value, false)}
        disabled={!email.inputValid || !password.inputValid}
      >
        Login
      </Button>
    </FormWrapper>
  );
};
const mapStateToProps = ({ auth: { loginError } }) => ({ loginError });

export default connect(mapStateToProps, { login })(AuthForm);
