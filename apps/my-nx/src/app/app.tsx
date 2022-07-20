import React, { useEffect, useState } from 'react';
import { IMessage, ITodoList } from '@mobssie-nx/api-interfaces';

export const App = () => {
  const [m, setMessage] = useState<IMessage>({ message: '' });
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  useEffect(() => {
    fetch('/api/todo')
      .then((r) => r.json())
      .then((data)=> setTodoList(data));
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>TODO LIST</h1>
      </div>
      <div>{m.message}</div>
      {todoList.map((todo: any)=> (
        <div key={todo.id}>
          <div>{todo.id}</div>
          <div>{todo.text}</div>
          <div>{todo.done}</div>
        </div>
      ))}
    </>
  );
};

export default App;
