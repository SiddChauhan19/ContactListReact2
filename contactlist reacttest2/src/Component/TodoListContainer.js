import TodoList from "./TodoList";
export default function TodoListContainer(props) {
  const { data, updateContact, deleteContact } = props;
  //console.log("data");
  //console.log(data);
  return (
    <div className="TodoListContainer">
      {data.map((contact, index) => (
        <TodoList
          key={index}
          contact={contact}
          updateContact={updateContact}
          deleteContact={deleteContact}
        />
      ))}
    </div>
  );
}
