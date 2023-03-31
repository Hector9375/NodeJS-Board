const { query, response, request } = require('express');
const express = require('express');
const board = require('../model/board');
const { getBoardPages , getBoardDetail, upDateBoard , deleteBoard, writeBoard } = require('../model/board');
const router = express.Router();

// http://localhost:3030/board/id/1 
router.get('/id/:id',(req,res)=>{
    getBoardDetail(req.params, res);
});

router.post('/',(req,res)=>{
    console.log(req.body);
    writeBoard(req.body,res)
});
// http://localhost:3030/board/id/1
router.patch('/id/:id',(req,res)=>{
    upDateBoard({...req.params,...req.body},res);
});

// http://localhost:3030/board/?pageNo=1&pageSize=2
router.get('/', (req,res)=>{
    // res.json(BOARD);
    let query = req.query;
    getBoardPages(new Pageable(query), res);
});

router.delete('/id/:id',(req,res)=>{
    deleteBoard(req.params, res)
});

// router.post('/title/:title/content/:content/writer/:writer',(req,res)=>{

//     let topNum = BOARD.length == 0 ? 1 : BOARD[BOARD.length-1].num+1

//     let request = {...req.params, "num":topNum, "createAt":new Date()};
    
//     BOARD.push(request);
//     res.json(request);
// });

// router.delete('/num/:num', (req,res)=>{
//     console.log(req.params.num)
//     let index = 0;
//     for(let i = 0; i<BOARD.length;i++){
//         if(BOARD[i].num == req.params.num){
//             index = i;
//             break;
//         }
//     }
//     let delBoadrd = BOARD.splice(index,1);
//     console.log(delBoadrd);
//     res.send();
// });

class Pageable {
    constructor(pageable) {
      this.page_no = pageable.pageNo;
      this.page_size = pageable.pageSize;
      this.offset = pageable.pageSize * (pageable.pageNo - 1);
    }
  }
// http://localhost:3030/sound/dog?name=som&name=backsul
module.exports = router;