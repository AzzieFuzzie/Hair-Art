import * as dotenv from "dotenv";
dotenv.config();

// console.log(process.env.PRISMIC_ACCESS_TOKEN);

// node-fetch is used to make network requests to the Prismic Rest API.
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
import fetch from "node-fetch";
import * as prismic from "@prismicio/client";

const repoName = "hairart"; // Fill in your repository name.
const accessToken = process.env.PRISMIC_ACCESS_TOKEN; // If your repository is private, add an access token.

// The `routes` property is your Route Resolver. It defines how you will
// structure URLs in your project. Update the types to match the Custom
// Types in your project, and edit the paths to match the routing in your
// project.
const routes = [
  {
    type: "home",
    uid: "home",
    lang: "en-us",
    path: "/",
  },
  {
    type: "about",
    uid: "about",
    lang: "en-us",
    path: "/about",
  },
  {
    type: "contact",
    uid: "contact",
    lang: "en-us",
    path: "/contact",
  },
  {
    type: "treatments",
    uid: "treatments",
    lang: "en-us",
    path: "/treatments",
  },
];

export const client = prismic.createClient(repoName, {
  fetch,
  accessToken,
  routes,
});
