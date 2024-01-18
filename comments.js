// Create web server
// Start server: node comments.js
// Test in browser: http://localhost:3000/comments?postId=1

// Import modules
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

// Create server
http.createServer(function (req, res) {
    // Get query string
    var q = url.parse(req.url, true);
    var qdata = q.query;

    // Get post id
    var postId = qdata.postId;

    // Check if post id is defined
    if (postId) {
        // Read comments file
        fs.readFile('comments.json', function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end('404 Not Found');
            }

            // Parse comments file
            var comments = JSON.parse(data);

            // Filter comments by post id
            comments = comments.filter(function (comment) {
                return comment.postId == postId;
            });

            // Write response
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(comments));
            return res.end();
        });
    } else {
        // Get post data
        var body = '';
        req.on('data', function (data) {
            body += data;
        });

        // Process post data
        req.on('end', function () {
            // Parse post data
            var post = qs.parse(body);

            // Read comments file
            fs.readFile('comments.json', function (err, data) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    return res.end('404 Not Found');
                }

                // Parse comments file
                var comments = JSON.parse(data);

                // Add new comment
                comments.push({
                    id: comments.length + 1,
                    postId: post.postId,
                    name: post.name,
                    email: post.email,
                    body: post.body
                });

                // Write comments file
                fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/html' });
                        return res.end('500 Internal Server Error');
                    }

                    // Write response
                    res.writeHead(200