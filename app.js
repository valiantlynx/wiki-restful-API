const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);
/////////////Request the whole articles collection/////////////////////
app.route("/articles")
    .get(function(req, res) {
        Article.find({}, function(err, articles) {
            if (!err) {
                res.send(articles)
            } else {
                res.send(err);
            }

        })
    })
    .post(function(req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })
        newArticle.save(function(err) {
            if (!err) {
                res.send("entry received, successfully added a new article")

            } else {
                res.send(err);
            }
        });
    })
    .delete(function(req, res) {
        Article.deleteMany({}, function(err) {
            if (!err) {
                res.send("successfully deleted all articles");
            } else {
                res.send(err);
            }
        });

    });
///////////////////////////Requests targeting a specific article////////////////////////
app.route("/articles/:ArticleTitle")
    .get(function(req, res) {

        Article.findOne({ title: req.params.ArticleTitle }, function(err, article) {
            if (article) {
                res.send(article)
            } else {
                res.send("No articles with that title was found");
            }

        })
    })
    .put(function(req, res) {
        Article.update({ title: req.params.ArticleTitle }, {
                title: req.body.title,
                content: req.body.content
            }, //{ overwrite: true },
            function(err) {
                if (!err) {
                    res.send("successfully updated the article")
                }
            }
        );
    })
    .patch(function(req, res) {
        Article.update({ title: req.params.ArticleTitle }, {
                $set: req.body
            },
            function(err) {
                if (!err) {
                    res.send("successfully updated the article")
                } else {
                    res.send(err);

                }
            }
        );
    })
    .delete(function(req, res) {
        Article.deleteOne({ title: req.params.ArticleTitle }, function(err) {
            if (!err) {
                res.send("successfully deleted all article");
            } else {
                res.send(err);
            }
        });

    });



app.listen(3000, function() {
    console.log("Server running on port 3000")
});