// Create web server
// 1. Create a web server
// 2. Set up a route handler
// 3. Listen for incoming requests
// 4. Process incoming requests
// 5. Return a response
// 6. Listen on a port
// 7. Use the node package manager to install dependencies
// 8. Use the node package manager to run the server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto'); // randomBytes is a function
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

// GET request to /posts/:id/comments
app.get('/posts/:id/comments', (req, res) => {
  // res.send(Object.values(commentsByPostId));
  res.send(commentsByPostId[req.params.id] || []);
});

// POST request to /posts/:id/comments
app.post('/posts/:id/comments', (req, res) => {
  // Generate a random id for the comment
  const commentId = randomBytes(4).toString('hex');
  // Get the content of the comment from the request body
  const { content } = req.body;
  // Get the list of comments for the post
  const comments = commentsByPostId[req.params.id] || [];
  // Add the new comment to the list of comments
  comments.push({ id: commentId, content });
  // Save the list of comments to the post
  commentsByPostId[req.params.id] = comments;
  // Send the new comment back to the requester
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
