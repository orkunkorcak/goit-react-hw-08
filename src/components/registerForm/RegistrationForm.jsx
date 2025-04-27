import { register } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import css from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        register({
          name: values.username,
          email: values.email,
          password: values.password,
        })
      );
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className={css.title}>Registration Page</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div>
              <label htmlFor="username">Username</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={css.button}
            >
              {isSubmitting ? "Loading..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegistrationForm;
