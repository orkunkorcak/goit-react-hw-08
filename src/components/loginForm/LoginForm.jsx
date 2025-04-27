import { logIn } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import css from "./LoginForm.module.css";

const LoginForm = () => {
    const dispatch = useDispatch();
    
    const initialValues = {
        email: "",
        password: "",
    };
    
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
    });
    
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
        await dispatch(logIn(values));
        } catch (error) {
        console.error("Login error:", error);
        } finally {
        setSubmitting(false);
        }
    };
    
    return (
      <>
        <h1 className={css.title}>Login Page</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={css.form}>
              <div className={css.field}>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className={css.input} />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </div>
              <div className={css.field}>
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" className={css.input} />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.error}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={css.button}
              >
                {isSubmitting ? "Loading..." : "Log In"}
              </button>
            </Form>
          )}
        </Formik>
      </>
    );
}
    export default LoginForm;