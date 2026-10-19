const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3400; // 학번 뒷자리 지정 포트

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// 메모리 저장소
let todos = [
  { id: 1, text: '아침 운동하기' },
  { id: 2, text: '이메일 확인하기' },
  { id: 3, text: '장보기' },
];
let nextId = 4;

// 1. GET /todo
app.get('/todo', (req, res) => {
  res.json(todos);
});

// 2. POST /todo
app.post('/todo', (req, res) => {
  const text = (req.body.text || '').trim();
  if (text) todos.push({ id: nextId++, text });
  res.redirect('/');
});

// 3. PUT /todo/:id (이미지 2번과 동일하게 콜론 : 포함 출력)
app.put('/todo/:id', (req, res) => {
  const id = req.params.id;
  const text = req.body.text || '';
  res.send(`PUT /todo/:${id}, 내용 : ${text} 요청 처리`);
});

// 4. DELETE /todo/:id (이미지 1번과 동일하게 콜론 : 포함 출력)
app.delete('/todo/:id', (req, res) => {
  const id = req.params.id;
  res.send(`DELETE /todo/:${id} 요청 처리`);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
