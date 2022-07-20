import * as express from 'express';
import { Message } from '@mobssie-nx/api-interfaces';

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const greeting: Message = { message: 'Welcome to api!' };


let id = 2;
const todoList = [{
  id: 1,
  text: '할일 1',
  done: false,
}];


app.get('/api', (req, res) => {
  res.send(greeting);
});

app.get('/api/todo', (req, res)=> {
  res.json(todoList);
})

app.post('/api/todo', (req, res)=> {
  const { text, done } = req.body;
  todoList.push({
    id: id++,
    text,
    done,
  });
  return res.send('success'); 
})

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
