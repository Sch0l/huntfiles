import express from "express";
import fs from "fs";
import mysql from "mysql";
import bodyParser from 'body-parser';
import { createServer } from "node:http";
import { publicPath } from "ultraviolet-static";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux";
import { join } from "node:path";
import { hostname } from "node:os";
import wisp from "wisp-server-node"

const app = express();
const suggestApp = express();
// Load our publicPath first and prioritize it over UV.
app.use(express.static(publicPath));
suggestApp.use(express.static(publicPath));
// Load vendor files last.
// The vendor's uv.config.js won't conflict with our uv.config.js inside the publicPath directory.
app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));


const db = mysql.createConnection({
  host: 'sql1.revivenode.com',
  port: '3306',
  user: 'u23031_uBQyn85m2U',
  password: 'sEOSdt91IBOSS8MbKWmtv.RZ',
  database: 's23031_chatimus'
});

db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('MySQL connected...');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  const { suggestion } = req.body;
  const sql = 'INSERT INTO suggestions (suggestion_text) VALUES (?)';
  db.query(sql, [suggestion], (err, result) => {
      if (err) {
          res.status(500).send('Error submitting suggestion');
          throw err;
      }
      console.log('Suggestion inserted:', suggestion);
      res.status(200).send('Suggestion submitted successfully');
  });
});

app.post('/action', (req, res) => {
  const { id, action } = req.body;
  const sql = 'UPDATE suggestions SET status = ? WHERE id = ?';
  db.query(sql, [action, id], (err, result) => {
      if (err) {
          res.status(500).send('Error updating suggestion');
          throw err;
      }
      console.log('Suggestion status updated:', id, action);
      res.status(200).send('Suggestion status updated successfully');
  });
});

app.get('/suggestions', (req, res) => {
  const sql = 'SELECT * FROM suggestions';
  db.query(sql, (err, results) => {
      if (err) {
          res.status(500).send('Error fetching suggestions');
          throw err;
      }
      res.json(results);
  });
});

const routes = [
  { path: "/", file: "index.html" },
  { path: "/-", file: "files.html" },
  { path: "/~", file: "p.html" },
  { path: "/settings", file: "settings.html" },
  { path: "/t", file: "tabs.html" },
  { path: "/a", file: "apps.html" },
  { path: "/suggestion", file: "suggestions.html" },
]

routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.sendFile(join(publicPath, route.file))
  })
})

// Error for everything else
app.use((req, res) => {
  res.status(404);
  res.sendFile(join(publicPath, "404.html"));
});


const server = createServer();

server.on("request", (req, res) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  app(req, res);
});
server.on("upgrade", (req, socket, head) => {
  if (req.url.endsWith("/wisp/"))
    wisp.routeRequest(req, socket, head);
  else
    socket.end();
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8080;

server.on("listening", () => {
  const address = server.address();

  // by default we are listening on 0.0.0.0 (every interface)
  // we just need to list a few
  console.log("Listening on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(
    `\thttp://${address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});

// https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close();
  process.exit(0);
}

server.listen({
  port,
});

suggestApp.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
