const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3400;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// POST /todo/1?_method=PUT → PUT /todo/1 로 처리
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// 메모리 저장 (서버 재시작 시 초기화)
let todos = [
  { id: 1, text: '아침 운동하기' },
  { id: 2, text: '이메일 확인하기' },
  { id: 3, text: '장보기' },
];
let nextId = 4;

// 1. 목록 조회 (GET)
app.get('/todo', (req, res) => {
  res.json(todos);
});

// 2. 항목 추가 (POST)
app.post('/todo', (req, res) => {
  const text = (req.body.text || '').trim();
  if (text) todos.push({ id: nextId++, text });
  res.redirect('/');
});

// 3. 항목 수정 (PUT)
app.put('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const text = (req.body.text || '').trim();

  const todo = todos.find((t) => t.id === id);
  if (todo && text) {
    todo.text = text;
  }
  res.redirect('/');
});

// 4. 항목 삭제 (DELETE)
app.delete('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  todos = todos.filter((t) => t.id !== id);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});