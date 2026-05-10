import exp from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { ArticleModel } from "../models/ArticleModel.js";
export const userApp = exp.Router();

//Read active articles of all authors
userApp.get("/articles", verifyToken("USER", "AUTHOR"), async (req, res) => {
  //read artcles
  const articlesList = await ArticleModel
    .find({ isArticleActive: true })
    .populate("author", "firstName lastName email profileImageUrl");
  //send res
  res.status(200).json({ message: "artciles", payload: articlesList });
});

//Read one article
userApp.get("/article/:articleId", verifyToken("USER", "AUTHOR"), async (req, res) => {
  const { articleId } = req.params;
  const query =
    req.user.role === "AUTHOR"
      ? { _id: articleId, $or: [{ isArticleActive: true }, { author: req.user.id }] }
      : { _id: articleId, isArticleActive: true };

  const article = await ArticleModel
    .findOne(query)
    .populate("author", "firstName lastName email profileImageUrl")
    .populate("comments.user", "firstName lastName email profileImageUrl");

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.status(200).json({ message: "article", payload: article });
});

//Add comment to an article
userApp.put("/articles", verifyToken("USER"), async (req, res) => {
  //get body from req
  const { articleId, comment } = req.body;
  //check article
  const articleDocument = await ArticleModel
                          .findOne({ _id: articleId, isArticleActive: true })
                           .populate("comments.user");

  console.log(articleDocument);
  //if article nbot found
  if (!articleDocument) {
    return res.status(404).json({ message: "Article not found" });
  }
  //get user id
  const userId = req.user?.id;
  //add comment to comments array of articleDocument
  articleDocument.comments.push({ user: userId, comment: comment });
  //save
  await articleDocument.save();
  await articleDocument.populate("comments.user", "firstName lastName email profileImageUrl");
  //send res
  res.status(200).json({ message: "Comment added successfully", payload: articleDocument });
});
