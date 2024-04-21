import { useState } from "react"; // Import useState
import { ErrorMessage, Field, Formik } from "formik";
import Modal from "./Modal";
import { db } from "../config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import * as yup from "yup";

const contactSchemaValidation = yup.object().shape({
  name: yup.string().required("Bhai  apna naam fill kar de"),
  email: yup
    .string()
    .email("Invalid Email")
    .required("Bhai apna email fill kar de"),
});

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const [formData, setFormData] = useState({ name: "", email: "" }); // Initialize formData state

  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      toast.success("contact added successfully");
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };
  const UpdateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact updated successfully");
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? { name: contact.name, email: contact.email }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values, { resetForm }) => {
            // Destructure resetForm from Formik
            console.log("Form submitted with values:", values);
            isUpdate ? UpdateContact(values, contact.id) : addContact(values);

            resetForm(); // Reset form after submission
          }}
        >
          {(
            { handleSubmit } // Destructure handleSubmit from Formik
          ) => (
            <form
              className="flex flex-col p-1 gap-4"
              onSubmit={(e) => {
                // Handle form submission manually
                e.preventDefault(); // Prevent default form submission behavior
                handleSubmit(); // Call handleSubmit manually
              }}
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <Field name="name" className="border h-10" />
                <div className="text-xs text-red-500">
                  <ErrorMessage name="name" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className="border h-10" />
                <div className="text-xs text-red-500">
                  <ErrorMessage name="email" />
                </div>
              </div>

              <button
                type="submit"
                className="bg-orange px-3 py-1.5 self-end border"
              >
                {isUpdate ? "Update" : "add"} Contact
              </button>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
