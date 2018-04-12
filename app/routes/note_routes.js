//Lets make the first route to create the note
var ObjectID = require('mongodb').ObjectId

module.exports = function(app, db){
//Read Note Route
app.get('/notes/:id', (req,res) =>{
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').findOne(details , (err,item) =>{
            if (err){
                res.send({'error': 'An Error has occured'});

            } else{
                res.send(item);
            }
        });

});



//Delete Note Route
app.delete('/notes/:id', (req,res) => {
       const id = req.params.id;
       const details = {'_id': new ObjectID(id)};
       db.collection('notes').remove(details,  (err,item) =>{

        if(err){
            res.send({'error': 'An error has occured'});

        }
        else{
            res.send(`Note ${id} has been deleted`);
        }
       });
});

//Update Note Route
app.put('/notes/:id', (req,res) =>{
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const note = { text: req.body.body, title: req.body.title};
        db.collection('notes').update(details, note, (err,item) => {

               if(err){
                   res.send({'error': 'An error has occured'});
               } else{
                   res.send(item);
               }
        });
});

   //Create Note Route
    app.post('/notes', (req,res) =>{
const note = {text: req.body.body, title: req.body.title};

db.collection('notes').insert(note, (err,result) => {
    if (err) {
        res.send({'error': 'An Error has occurred'});
    } else{
        res.send(result.ops[0])
    }
});


    });
};