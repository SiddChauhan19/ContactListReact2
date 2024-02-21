import { useState, useEffect, useRef } from "react";
import { contact } from "../Assest/Assest";
import styles from "./TodoForm.module.css";

export default function TodoForm(props) {
  const { addHandler, isupdate, updateData } = props;
  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  useEffect(() => {
    if (isupdate && updateData) {
      console.log(updateData);
      nameRef.current.value = updateData[0].name;
      usernameRef.current.value = updateData[0].username;
      emailRef.current.value = updateData[0].email;
      phoneRef.current.value = updateData[0].phone;
    }
  }, [isupdate, updateData]);

  const submithandle = (e) => {
    e.preventDefault();
    let temp = {
      name: nameRef.current.value,
      username: usernameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
    };
    if (isupdate) {
      temp = {
        id: updateData[0].id,
        ...temp
      }
    }
    addHandler(temp);
    nameRef.current.value = "";
    usernameRef.current.value = "";
    emailRef.current.value = "";
    phoneRef.current.value = "";
  };

  return (
    <form onSubmit={(e) => submithandle(e)} className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h1>Contact List</h1>
      </div>
      <div className={styles.innerForm}>
        <div className={styles.formInput}>
          <div className={styles.name}>
            <input type="text" placeholder="First Name" ref={nameRef} required />
            <input type="text" placeholder="User/Nick Name" ref={usernameRef} required />
          </div>
          <div className={styles.details}>
            <input type="email" placeholder="Email Id" ref={emailRef} required />
            <input type="tel" placeholder="Phone Number" ref={phoneRef} required />
          </div>
          <div className={styles.submitBtn}>
            <button type="submit">
              <img src={contact} alt="add contact" />
              <span>Add Contact</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
