var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var Jimp = require("jimp");
var app = express();
var gm = require('gm');
var Busboy = require('busboy');
var formidable = require('formidable');
var Datastore = require('nedb')
    , db = new Datastore({ filename: 'datafile.db', autoload: true });

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/node_modules',  express.static( path.join(__dirname, '/node_modules')));

function insertOrUpdate(method, req, res){

    var form = new formidable.IncomingForm(),
        files = [],
        fields = [];

    form.uploadDir = './uploads';
    form.keepExtensions = true;

    form
        .on('field', function(field, value) {

            if (field === 'authors'){
                fields[field] = value.split(",");
            }
            else
                fields[field] = value;
        })
        .on('file', function(field, file) {

            files[field] = file;
            var pathFile = __dirname + '\\'+ file.path;

            Jimp.read(pathFile, function (err, image) {
                image.resize(500, Jimp.AUTO)            // resize
                    .write(pathFile); // save
            });
        })
        .on('end', function() {

            var path = '';

            if (files['frontPagePic']){
                path = files['frontPagePic'].path;
            }

            var doc = {bookName: fields['bookName']
                , authors: fields['authors']
                , location: fields['location']
                , inputDate: new Date()
                , publishYear: fields['publishYear']
                , noPages: fields['noPages']
                , category: fields['category']
                , frontPagePic: path
            };

            if (method === 'update'){

                if (!files['frontPagePic']){
                    db.findOne({ _id: fields['_id'] }, function (err, docs) {
                        doc.frontPagePic = docs.frontPagePic;
                    });
                }
                db.update({ _id: fields['_id'] }, doc, {}, function (err, numReplaced) {
                    numReplaced === 1 ? res.send({success:true}) : res.send({success:false});
                });
            }
            else {
                db['insert'](doc, function (err, newDoc) {
                    if (newDoc){
                        res.send({success:true, book: newDoc});
                    }
                    else {
                        res.send({success:false, err});
                    }
                });
            }


        });

    form.parse(req);
}

app.get('/api/get/categories', function (req, res) {
    var cat = {categories: ['', 'Krimi', 'Romance', 'Scifi']};
    res.json(cat);
});

app.post('/api/get/book', function (req, res) {

    var colName = req.body.selectVal;
    var value = req.body.inputVal;
    var limit = req.body.limit;

    var obj = {}
    obj[colName] = value
    var cnt = 0

    db.count( obj, function (err, count) {
        cnt = count
    });
    db.find( obj ).limit(limit).exec(function (err, docs) {
        res.json({success:true, book: docs, sum: cnt, page: 0, lastSearch: obj});
    });
});

app.post('/api/paginate/book', function (req, res) {

    var lastSearch = req.body.lastSearch;
    var limit = req.body.limit;
    var skip = limit * req.body.page;
    var page = req.body.page;

    db.find( lastSearch ).skip(skip).limit(limit).exec(function (err, docs) {
        res.json({success:true, book: docs, page});
    });
});

app.get('/api/get/rand/books', function (req, res) {
    var num = Math.floor(Math.random() * 10);

    db.find({}).skip(num).limit(10).exec(function (err, docs) {
        var pag = -1;
        if (docs)
            res.json({success:true, docs, sum: 10, page: pag, lastSearch: {}});
        else
            res.json({success:false, err});
    });
});

app.get('/api/get/bookId/:id', function (req, res) {

    var id = req.params.id;

    db.findOne({ _id: id }, function (err, docs) {

        res.json({success:true, book: docs});
    });


});

app.get('/api/delete/book/:id', function (req, res) {

    var id = req.params.id;

    db.remove({ _id: id }, {}, function (err, numRemoved) {

        if (err)
            res.json({success:false, id, err});

        if (numRemoved === 1)
            res.json({success:true, id});
    });


});

app.post('/api/insert/book', function(req, res) {

    insertOrUpdate('insert', req, res);

});

app.post('/api/update/book', function (req, res) {

    insertOrUpdate('update', req, res);
});


app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});