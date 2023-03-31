const connection = require('./connection');

async function getBoardPages(pageable, res) {
    connection((conn) => {
      let query =`SELECT b.id,
                  b.title,
                  b.content,
                  b.writer_id,
                  u.nickname,
                  b.create_at,
                  b.update_at
              FROM board AS b
              LEFT JOIN member AS u
              ON b.writer_id=u.id
              ORDER BY create_at DESC
              LIMIT ${pageable.page_size}
              OFFSET ${pageable.offset}`;
      conn.query(query, (err, rows, fields) => {
        if (!err) {
          res.send(rows.map((row) => new Board(row)));
        }else{
            console.error(err);
            res.status(500).send();
        }
      });
    });
}

function getBoardDetail( params, res) {
    connection(function (conn){
        let query= `SELECT * FROM board WHERE id = ${params.id}`;
        conn.query(query,(err, rows, fields)=>{
            if(!err){
                res.json(new Board(rows[0]));
            }else{
            res.status(500).send();
            console.error(err);
            }
        });
    });
}

function upDateBoard(request, res){
    console.log(request);
    connection(conn=>{
        let query = `UPDATE board
        SET title = '${request.title}',
        content = '${request.content}',
        update_at = NOW()
        WHERE id=${request.id}`;
        conn.query(query,(err)=>{
            if(!err){
                res.send();
            }else{
                console.error(err);
                res.status(500).send();
            }
        })
    })
}

function writeBoard(request, res){
    connection(conn =>{
        let query = `INSERT INTO board (title,content,writer_id)
        VALUES ('${request.title}','${request.content}',1)`;

        conn.query(query,(err)=>{
            if(!err){
                res.status(201).send();
            }else{
                console.error(err);
                res.status(500).send();
            }
        });
    });
}

function deleteBoard( params, res){
    connection(conn=>{
        let query = `DELETE FROM board WHERE = id = ${params.id}`;
        conn.query(query,err=>{
            if(!err){
                res.send();
            }else{
                console.error(err);
                res.status(500).send();
            }
        })
    })
}

function getTotalCount(pageable,res){

    connection(conn=>{
        conn.query('SELECT COUNT(*) AS total_count FROM board',(err,rows)=>{
            console.log(rows[0].total_count);

            let totalCount = rows[0].total_count;
            let pageNo = pageable.pageNo;
            let pageSize = pageable.pageSize;

            let offset = pageSize*[pageNo-1];
        })
    })
}


class Board {
    constructor(board) {
        this.id = board.id;
        this.title = board.title;
        this.content = board.content;
        this.writer_id = board.writer_id;
        this.nickname = board.nickname;
        this.create_at = new Date(board.create_at);
        this.update_at = board.update_at && new Date(board.update_at);
    }
}

module.exports = { "getBoardPages": getBoardPages , 
                   "getBoardDetail": getBoardDetail, 
                   "upDateBoard":upDateBoard,
                   "writeBoard":writeBoard,
                   "deleteBoard":deleteBoard};
    
