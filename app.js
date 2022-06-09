const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const port = 3000;
const app = express();
const tableName = 'utk-database';

AWS.config.update({ region: 'eu-west-1' });
const client = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json());

app.get("/cities", (req, res) => {
  var params = {
    TableName: tableName
  };

  client.scan(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var items = [];
      for (var i in data.Items)
        items.push(data.Items[i]['Name']);

      res.contentType = 'application/json';
      res.send(items);
    }
  });
});

app.post("/add", (req, res) => {
  var body = req.body;
  var params = {
    TableName: tableName,
    Item: {
      "cityId": uuidv4(),
      "Name": body["name"]
    }
  };

  client.put(params, (err, data) => {
    var status = {};
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      status["success"] = false;
    } else {
      console.log("Added item:", params.Item.Name);
      status["success"] = true;
    }
    res.contentType = "application/json";
    res.send(status);
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to UTK by Bogdan, you can see all cities on /cities or add a new on /add');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
