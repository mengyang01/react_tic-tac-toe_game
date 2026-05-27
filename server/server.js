const express = require('express');
const path = require('path');
const app = express();
const dir = path.dirname(__dirname);
app.use(express.static(path.join(dir, 'build')));
console.log(dir)
app.get('/', function (req, res) {
  res.sendFile(path.join(dir, 'build', 'index.html'));
});

app.listen(9000);