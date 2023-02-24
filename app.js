import * as dotenv from "dotenv";

import express from "express";
import * as prismicH from "@prismicio/helpers";
import { client } from "./config/prismicConfig.js";
import bodyParser from "body-parser";
import UAParser from "ua-parser-js";

// import { forEach } from "lodash";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.set("view engine", "pug");

app.use(express.static("public"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  let ua = UAParser(req.headers["user-agent"]);
  console.log(ua);

  let device = ua.device;
  console.log(device);

  res.locals.isDesktop = ua.device.type === undefined;
  res.locals.isMobile = ua.device.type === "mobile";
  res.locals.isTablet = ua.device.type === "tablet";

  res.locals.ctx = {
    prismicH,
  };

  next();
});

const handleRequest = async () => {
  const home = await client.getSingle("home");
  const about = await client.getSingle("about");
  const contact = await client.getSingle("contact");
  const treatments = await client.getSingle("treatments");
  const footer = await client.getSingle("footer");

  const assets = [];
  const assetsWash = [];
  const assetsMassage = [];
  const assetsHome = [];
  const assetsBeard = [];
  const assetsHairCuts = [];
  const assetsFacials = [];

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

  treatments.data.body.forEach((section) => {
    if (section.id === "treatments_$7baf9a49-82ed-407b-95ce-4118de7ce015") {
      assetsWash.push(section.items);
      // console.log(assetsWash);
    } else if (
      section.id === "treatments_$aa7490d8-3329-44f3-bb07-55b34ade9ab5"
    ) {
      assetsMassage.push(section.items);
      // console.log(assetsMassage);
    } else if (
      section.id === "treatments_$6b099684-f9d6-432c-82e7-5db7b3fd88b5"
    ) {
      assetsHome.push(section.items);
      // console.log(assetsHome);
    } else if (
      section.id === "treatments_$5fc92f66-3a21-4dcc-996c-338951502e44"
    ) {
      assetsBeard.push(section.items);
      // console.log(assetsBeard);
    } else if (
      section.id === "treatments_$a5a83c4f-6aff-47cd-9a44-0aea3a103b9a"
    ) {
      assetsHairCuts.push(section.items);
      // console.log(assetsHairCuts);
    } else if (
      section.id === "treatments_$105d72bb-6ae1-4c4e-a614-4d4c6b54358d"
    ) {
      assetsFacials.push(section.items);
      // console.log(assetsFacials);
    }
  });

  return {
    home,
    about,
    contact,
    treatments,
    footer,
    assets,
    assetsWash,
    assetsMassage,
    assetsHome,
    assetsBeard,
    assetsHairCuts,
    assetsFacials,
  };
};

app.get("/", async (req, res) => {
  const defaults = await handleRequest();
  res.render("pages/home", { ...defaults });
});

app.get("/about", async (req, res) => {
  const defaults = await handleRequest();
  res.render("pages/about", { ...defaults });
});

app.get("/contact", async (req, res) => {
  const defaults = await handleRequest();
  res.render("pages/contact", { ...defaults });
});

app.get("/treatments", async (req, res) => {
  const defaults = await handleRequest();
  res.render("pages/treatments", { ...defaults });
});

app.get("/navigation", async (req, res) => {
  const defaults = await handleRequest();
  res.render("navigation", { ...defaults });
});

app.listen(port, () => {
  console.log(`Hair Art app listening at http://localhost:${port}`);
});
