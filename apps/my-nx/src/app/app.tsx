import React, { useEffect, useState } from 'react';
import { IMessage, ITodoList } from '@mobssie-nx/api-interfaces';
import axios from 'axios';

const SERVER_URL = 'http://localhost:4200/api/todo';
export const App = () => {
  const [m, setMessage] = useState<IMessage>({ message: '' });
  const [todoList, setTodoList] = useState([]);

  const fetchData= async ()=> {
    const response = await axios.get(SERVER_URL);
    setTodoList(response.data)
    // fetch('/api/todo')
    //   .then((r) => r.json())
    //   .then((data)=> setTodoList(data));
  }

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitHandler = async (e: any)=> {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;
    await axios.post(SERVER_URL, { text, done })
    fetchData();
    // fetch(SERVER_URL, {
    //   method: 'POST',
    //   headers:{
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     text,
    //     done,
    //   })
    // }).then(()=> fetchData());
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>TODO LIST</h1>
      </div>
      <form onSubmit={onSubmitHandler}>
        <input name="text"/>
        <input name="done" type="checkbox" />
        <input type="submit" value="추가" />
      </form>
      <div>{m.message}</div>
      {todoList?.map((todo: any)=> (
        <div key={todo.id} style={{ display: 'flex'}}>
          <div>{todo.id}</div>
          <div>{todo.text}</div>
          <div>{todo.done ? 'Y' : 'N'}</div>
        </div>
      ))}
    </>
  );
};

export default App;
