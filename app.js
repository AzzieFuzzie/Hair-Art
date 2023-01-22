import * as dotenv from "dotenv";

import express from "express";
import * as prismicH from "@prismicio/helpers";
import { client } from "./config/prismicConfig.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.set("view engine", "pug");

app.use(express.static("public"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  };

  next();
});

const handleRequest = async () => {
  const home = await client.getSingle("home");
  const about = await client.getSingle("about");
  const footer = await client.getSingle("footer");

  const assets = [];

  home.data.body.forEach((section) => {
    if (section.slice_type === "barbers") {
      assets.push(section.items[0]);
      assets.push(section.items[1]);
      assets.push(section.items[2]);
      assets.push(section.items[3]);
    }
  });

  home.data.body.forEach((section) => {
    if (section.slice_type === "hero_gallery") {
      assets.push(section.items[0]);
      assets.push(section.items[1]);
      assets.push(section.items[2]);
      assets.push(section.items[3]);
    }
  });

  console.log(about.data.body);

  assets.push(footer.data);
  console.log(assets[8]);

  return {
    home,
    assets,
  };
};

app.get("/", async (req, res) => {
  const defaults = await handleRequest();
  res.render("pages/home", { ...defaults });
});

app.get("/about", (req, res) => {
  res.render("pages/about");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.get("/treatments", (req, res) => {
  res.render("pages/treatments");
});

app.listen(port, () => {
  console.log(`Hair Art app listening at http://localhost:${port}`);
});
