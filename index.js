const express = require('express');
const cors = require('cors');
const common = require('./router/common');
const app = express();

const port = 3030;

// cors 접근 설정
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// router 설정
app.use('/board', require('./router/board'));
// app.use('/users', require('./router/users'));

app.listen(port, ()=>{
    console.log(`[SEVER] listen port: ${port}`);
})