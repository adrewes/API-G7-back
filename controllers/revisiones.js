var revisiones = require('../db/revisiones')

module.exports = {
    create(req, res) {

        var doc = req.body;
        revisiones.save(doc, function (err, doc) {

            if (err) {
                console.log(err)
                res.status(500)
                // res.send("Error connecting to db")
                res.send(err)
            } else {
                res.status(201).send(doc)
            }
        });
    },

    list(req, res) {
        return revisiones.select({
            idEncuesta: { $eq: req.params.idEncuesta } }, function(err, docs) {

                if (err) {
                    console.log(err)
                    res.status(500)
                    res.send("Error connecting to db")
                } else {
                    if (docs.length == 0) {
                        res.status(404)
                    }
                    console.log("Retrieved revisiones = %d", docs.length)
                    res.send(docs)
                }
            });
    }
    /*     find(req, res) {
            return encuestas.select({idEncuesta:{ $eq: req.params.idEncuesta} },function (err, docs) {
    
                if (err) {
                    console.log(err)
                    res.status(500)
                    res.send("Error connecting to db")
                } else {
                    if (docs.length == 0) {
                        res.status(404)
                    }
                    console.log("Retrieved encuestas = %d", docs.length)
                    res.send(docs)
                }
            });
        }, */
};