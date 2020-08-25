const fs = require("fs");

var db = [];

module.exports = function(app){
    app.get("/api/notes",function(req,res){
        db = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
        if(db.length){
            let id=1;
            for(i of db){
                i.id = id;
                id++;
            }
        }
        
        return res.json(db);
    });
    
    app.post("/api/notes", function(req, res) {
        db.push(req.body);
        
        let id=1;
        for(i of db){
            i.id = id;
            id++;
        }
        fs.writeFileSync('./db/db.json',JSON.stringify(db),'utf8');
        res.json(db);
    });

    app.delete("/api/notes/:id", function(req,res){
        let queryID = req.params.id;
        db = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
        if(db.length === 1){
            db=[];
        }
        else{
            for(i in db){
                if(queryID == db[i].id){
                    db.splice(i,1);
                }
            }
        }
        fs.writeFileSync('./db/db.json',JSON.stringify(db),'utf8');
        res.send();
    });
}