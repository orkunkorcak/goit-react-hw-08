import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addContact } from "../../redux/contacts/operations";

const ContactForm = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const initialValues = {
    name: "",
    number: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters required")
      .required("*Required"),
    number: Yup.string()
      .matches(/^[0-9-]+$/, "Only numbers and hyphens are allowed")
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters required")
      .required("*Required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true); 
    try {
      const newContact = {
        name: values.name,
        number: values.number,
      };
      await dispatch(addContact(newContact)).unwrap(); 
      resetForm();
    } catch (error) {
      console.error("Failed to add contact:", error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.contactForm}>
        <label className={css.label}>
          Name
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="div" />
        </label>

        <label className={css.label}>
          Number
          <Field name="number" type="text" />
          <ErrorMessage name="number" component="div" />
        </label>

        <button
          className={css.formButton}
          type="submit"
          disabled={isSubmitting} 
        >
          {isSubmitting ? "Loading..." : "Add contact"} 
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
