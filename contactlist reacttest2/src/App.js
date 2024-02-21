import TodoForm from "./Component/TodoForm";
import { useEffect, useState } from "react";
import TodoListContainer from "./Component/TodoListContainer";
import { addTodo } from "./Assest/Assest";

function App() {
  const [allData, setAllData] = useState([]);
  const [isupdateData, setIsupdateData] = useState(false);
  const [updateDataValue, setupdateDataValue] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        const data = await response.json();
        setAllData(data);
        //console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addHandler = async (value) => {
    if (!isupdateData) {
      const temp = {
        id: allData.length + 1,
        ...value,
      };

      try {
        const gettingData = await addContactApi(temp);
        setAllData([gettingData, ...allData]);
      } catch (error) {
        console.error("Error adding contact:", error);
      }
    } else {
      const notupdateData = allData.filter((contact) => contact.id !== value.id);
      try {
        const gettingData = await updateContactApi(value.id, value);
        console.log(gettingData);
        setAllData([gettingData, ...notupdateData]);
        setIsupdateData(false);
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    }

  };
  const updateContacthandler = async (id) => {
    setIsupdateData(true);
    const updatedContact = allData.filter((contact, index) => contact.id === id);
    //console.log(updatedContact);
    setupdateDataValue(updatedContact);
  };

  const deleteContact = async (id) => {
    const updatedContact = allData.filter((contact) => contact.id !== id);

    try {
      await deleteContactApi(id);
      setAllData([...updatedContact]);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateContactApi = async (id, value) => {
    try {
      const contactupdate = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(value),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        },
      ).then((response) => response.json());
      return contactupdate;
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const addContactApi = async (value) => {
    try {
      const addContact = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          body: JSON.stringify(value),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        },
      ).then((response) => response.json());

      return addContact;
    } catch (error) {
      throw new Error("Error adding todo:", error);
    }
  };
  const deleteContactApi = async (id) => {
    try {
      await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        },
      );
    } catch (error) {
      throw new Error("Error deleting todo:", error);
    }
  };
  return (
    <>
      <TodoForm addHandler={addHandler} isupdate={isupdateData} updateData={updateDataValue} />
      {<TodoListContainer
        data={allData}
        updateContact={updateContacthandler}
        deleteContact={deleteContact}
      />}
    </>
  );
}

export default App;
