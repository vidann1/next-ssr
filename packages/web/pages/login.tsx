import { Button, Form } from "semantic-ui-react";
import Router from "next/router";
import { Formik, Field } from "formik";
import { registerSchema } from "@ssr/common";
import { InputField } from "../components/formik-fields/InputField";
import { ErrorMessage } from "../components/ErrorMessage";
import { normalizeErrors } from "../utils/normalizeErrors";
import { Mutation } from "react-apollo";
import { LoginMutation, LoginMutationVariables } from "../lib/schema-types";
import { loginMutation } from "../graphql/user/mutation/login";

interface FormValues {
  usernameOrEmail: string;
  password: string;
}
/*
todo:
[] fix error messages
*/

export default () => (
  <Mutation<LoginMutation, LoginMutationVariables> mutation={loginMutation}>
    {mutate => (
      <Formik<FormValues>
        initialValues={{
          usernameOrEmail: "",
          password: ""
        }}
        onSubmit={async (input, { setErrors, setSubmitting }) => {
          const response = await mutate({
            variables: { input }
          });

          if (
            response &&
            response.data &&
            response.data.login.errors &&
            response.data.login.errors.length
          ) {
            setSubmitting(false);
            return setErrors(normalizeErrors(response.data.login.errors));
          } else {
            Router.push("/home");
          }
        }}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name="usernameOrEmail"
              label="Email or Username"
              placeholder="Email or Username"
              component={InputField}
            />
            <Field
              name="password"
              label="Password"
              placeholder="Password"
              component={InputField}
              type="password"
            />
            <ErrorMessage errors={errors} />
            <Button disabled={isSubmitting} type="submit">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    )}
  </Mutation>
);
