const express = require("express");
const pre = require("../utils/pre.js");

const appRouter = function (app, db) {
  // API ROUTE
  app.get("/api/**", function (req, res) {
    let parts = req.path.split("/").slice(2);
    let r = db;

    parts.forEach(part => {
      r = r[part];
    });

    let t = setTimeout(() => {
      res.send(r);
      clearTimeout(t)
    }, 1000)
  });

  app.post("/api/login", function (req, res) {
    let t = setTimeout(() => {
      res.send(200);
      clearTimeout(t)
    }, 500)
  })

  app.post("/api/send", function (req, res) {
    let t = setTimeout(() => {
      res.send(200);
      clearTimeout(t)
    }, 200)
  })


  // JSON VIEWER
  app.get("/view/**", function (req, res) {
    let partsArr = req.path.split("/");
    let parts = partsArr.slice(2);
    let r = db;
    let html = "";
    let heading = partsArr.join(' > ')

    parts.forEach(part => {
      r = r[part];
    });

    html = pre.template.replace(/__JSON_PATH__/g, heading).replace('__JSON_INJECT__', JSON.stringify(r, 0, 2))

    res.type("text/html");
    res.status(200);
    res.send(html);
  });
};

module.exports = appRouter;
