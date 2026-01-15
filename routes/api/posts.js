const debug = require("../../utils/debug")("app:posts");

let posts = [
  { title: "post 3", body: "this is post 3" },
  { title: "post 2", body: "this is post 2" },
  { title: "post 1", body: "this is post 1" },
];

const index = (req, res, next) => {
  const limit = req.query.limit * 1 || 2;
  const page = req.query.page * 1 || 1;
  const begin = (page - 1) * limit;
  const end = begin + limit;

  res.json(posts.slice(begin, end));
};

const create = (req, res, next) => {
  const { title, body } = req.body;
  const post = { title, body };

  if (!title || !body) {
    res.status(400).send("paramaters missing");
  }

  posts = [post, ...posts];

  res.status(201).json(post);
};

module.exports = {
  index,
  create,
};
