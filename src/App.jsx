import "./App.css";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from "./components/NotFoundContact";

function App() {
  const [contact, setcontact] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContact = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,

              ...doc.data(),
            };
          });
          // console.log(cont)
          setcontact(contactList);
          return contactList;
        });
      } catch (error) {}
    };
    getContact();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,

          ...doc.data(),
        };
      });

      const filteredContacts = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      // console.log(cont)
      setcontact(filteredContacts);
      return filterContacts;
    });
  };
  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />

        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FiSearch className="text-3xl ml-1 text-white absolute " />
            <input
              onChange={filterContacts}
              type="text"
              className="border bg-transparent border-white rounded-md h-10 flex-grow text-white pl-9"
            />
          </div>
          <div>
            <FaCirclePlus
              onClick={onOpen}
              className="text-5xl text-white cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-4 gap-3 flex flex-col">
          {contact.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contact.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;
