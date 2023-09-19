const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
//const formidable = require("formidable");
const {formidable} = require("formidable");

// 设置ejs作为视图引擎
app.set("view engine", "ejs");

//引入静态目录
app.use('/files', express.static(__dirname + '/files'));

// ejs 使用表单 post到home返回 
app.get("/home", (req, res) => {
  res.render(path.resolve(__dirname, "fs上传.ejs"));
});

app.post("/login", (req, res) => {
  const form = formidable({ 
    multiples: true,
    //设置上传文件的保存目录
    uploadDir:__dirname+"/files",
    //保持文件后缀
    keepExtensions:true
});
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      return;
    }
    //console.log(fields);
    //console.log(fields.filename[0].newFilename);
    //let url="/files/"+files.filename[0].newFilename;
    console.log(__dirname)
    let url = req.protocol + "://" + req.get('host') + "/files/" + files.filename[0].newFilename;
    res.send(url);
  });
});

app.listen(3000, () => {
  console.log("端口开在3000");
});
