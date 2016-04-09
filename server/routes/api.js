module.exports = function(app) {
  var comments = [
    { "product": "Omniwrite", "text": "Freedom to type from anywhere." }
  ];

  app.get('/api/comments', function(req, res) {
    res.json(comments);
  });

  app.post('/api/comments', function(req, res) {
    comments.push(req.body);
    res.json(comments);
  });
};
