import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList({key1}) {
  const [todos, setTodos] = useState([]);
  const [input,setInput]=useState("")
 

  useEffect(() => {
    axios.get('http://localhost:5000/api/todo')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);
  useEffect(()=>{
    axios.get('http://localhost:5000/api/todo')
    .then(response => {
      setTodos(response.data);
    })
    .catch(error => {
      console.error('Error fetching todos:', error);
    });
  },[key1])

 
  const delete1=(id)=>{

    axios.delete(`http://localhost:5000/api/todo/${id}`)
    .then((res)=>{
      setTodos(prevTodos => prevTodos.filter(items => items._id !== id))
    })
    .catch((err)=>{
      return(
        console.log(err)
      )
    })

  }

  const update=(id,input)=>{
    axios.put(`http://localhost:5000/api/todo/${id}`,{text:input})
    .then((res)=>{
      return(
        setTodos(details=>details.map((item)=>{
          return(
             item.id===id ? [...todos,input]:todos
          )
        }))
      )
    })
    .catch((err)=>{
      return(
        console.log(err,"error occurred")
      )
    })
  }


  return (
    // <div>
    //   <h1>Todo List</h1>
    //   <ul>
    //     {todos.map(todo => (
    //       <li key={todo._id}>{todo.text}</li> 
    //     ))}
    //   </ul>
    // </div>
    <div className="todo-list-container"> {/* Apply container class */}
    <h1 className="todo-list-header">Todo List</h1> {/* Apply header class */}
    <ul>
       {todos?.map(todo => (
       <> <li className="todo-item" key={todo._id}>{todo.text}</li> <button onClick={()=>delete1(todo._id)} >Delete</button><input type='text' onChange={(e)=>update(todo._id,e.target.value)} /> </> 
      ))} 
    </ul>
  </div>
  );
}

export default TodoList;
