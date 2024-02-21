import styles from "./TodoList.module.css";
import { useState } from "react";
import { dustbin, profile } from "../Assest/Assest";

export default function TodoList(props) {
  const { name, username, email, address, phone, id } = props.contact;
  const { deleteContact, updateContact } = props;
  return (
    <div className={styles.TodoList}>
      <div className={styles.details} >
        <div className={styles.userName}>
          <span className={styles.fullname}>{name}</span>
          <span className={styles.nickname}>{username}</span>
        </div>
        <div className={styles.userDetails}>
          <span className="email"> {email}</span>
          <span> {phone}</span>
        </div>
      </div>
      <div className={styles.contactBtn}>
        {/* need to update here for on click */}
        <button className="" onClick={() => updateContact(id)}>
          <img src={profile} alt="edit contact" />
        </button>
        <button className="" onClick={() => deleteContact(id)}>
          <img src={dustbin} alt="delete" />
        </button>
      </div>
    </div>
  );
}
