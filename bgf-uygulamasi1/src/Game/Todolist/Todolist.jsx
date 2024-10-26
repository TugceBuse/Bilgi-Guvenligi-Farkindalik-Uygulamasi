import "./Todolist.css";
import { useState , useEffect} from "react";

export const useTodoList = () => {
    const [isTodoListOpen, setIsTodoListOpen] = useState(false);
    
    const openTodoList = () => {
        setIsTodoListOpen(true);
    };
    
    const closeTodoList = () => {
        setIsTodoListOpen(false);
    };
    
    return { isTodoListOpen, openTodoList, closeTodoList };
    }


    

const Todolist = ({closeTodoList}) => {

    //TodoList doldurma
    const [todos, setTodos] = useState([
        { text: "Diğer uygulamaları kullanabilmek için yeni kurulan Wifi'ı yapilandir ve şifresini belirle", completed: false },
        { text: 'Yapılacak 2', completed: false },
        { text: 'Yapılacak 3', completed: false },
    ]);
      // Bileşen yüklendiğinde localStorage'dan verileri oku
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
        setTodos(storedTodos);
        }
    }, []);

        //Todolist içindeki checkbox'ın işlevi
    const handleCheckboxChange = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

  return (
    <div className="Todolist-window">
        
        <div className="Todolist-header">
            <h2>To-Do List</h2>
            <button className="Todolist-close" onClick={closeTodoList}>×</button>
        </div>
        <div className="Todolist-content">
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className={todo.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxChange(index)}
              />
              {todo.text}
            </li>
          ))}
        </ul>
        </div>

    </div>
  );
}

export default Todolist;