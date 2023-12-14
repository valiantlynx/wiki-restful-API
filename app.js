const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// if i want to use a static folder for css and images
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
    title: String,
    content: String,
};

const Article = mongoose.model("Article", articleSchema);
/////////////Serve the root html/////////////////////
app.route("/").get(function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

/////////////Serve the article html/////////////////////
app.route("/article").get(function (req, res) {
    res.sendFile(__dirname + "/article.html");
});

/////////////Request the whole articles collection/////////////////////
app
    .route("/articles")
    .get(function (req, res) {
        Article.find({}).sort({ _id: -1 }).exec(function (err, articles) {
            if (!err) {
                res.status(200).send(articles);
            } else {
                res.status(400).send(err);
            }
        });
    })
    .post(function (req, res) {
        if (!req.body.title) {
            res.status(400).send("Please provide a title for the article");
        } else if (!req.body.content) {
            res.status(400).send("Please provide content for the article");
        } else {

            const newArticle = new Article({
                title: req.body.title,
                content: req.body.content,
            });
            newArticle.save(function (err) {
                if (!err) {
                    res.status(200).send("entry received, successfully added a new article");
                } else {
                    res.status(400).send(err);
                }
            });
        }
    })
    .delete(function (req, res) {
        Article.deleteMany({}, function (err) {
            if (!err) {
                res.status(200).send("successfully deleted all articles");
            } else {
                res.status(400).send(err);
            }
        });
    });
///////////////////////////Requests targeting a specific article////////////////////////
app
    .route("/articles/:ArticleTitle")
    .get(function (req, res) {
        Article.findOne(
            { title: req.params.ArticleTitle },
            function (err, article) {
                if (article) {
                    res.status(200).send(article);
                } else {
                    res.status(400).send("No articles with that title was found");
                }
            }
        );
    })
    .put(function (req, res) {
        Article.update(
            { title: req.params.ArticleTitle },
            {
                title: req.body.title,
                content: req.body.content,
            }, //{ overwrite: true },
            function (err) {
                if (!err) {
                    res.status(200).send("successfully updated the article");
                }
            }
        );
    })
    .patch(function (req, res) {
        Article.update(
            { title: req.params.ArticleTitle },
            {
                $set: req.body,
            },
            function (err) {
                if (!err) {
                    res.status(200).send("successfully updated the article");
                } else {
                    res.status(400).send(err);
                }
            }
        );
    })
    .delete(function (req, res) {
        Article.deleteOne({ title: req.params.ArticleTitle }, function (err) {
            if (!err) {
                res.status(200).send("successfully deleted article");
            } else {
                res.status(400).send(err);
            }
        });
    });

app.listen(3000, function () {
    console.log("Server running on port 3000");
});
