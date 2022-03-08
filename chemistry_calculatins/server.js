let express = require('express');
let app = express();
const port = 3002;

app.use(express.static('public'));
app.use(express.static('src'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, function() {
    console.log('listening on port 3002');
    });