const axios = require("axios"); // Ensure to install axios via npm
const replaceTemplate = require("./modules/replaceTemplate");
const slugify = require("slugify");

// URLs to your templates and data
const tempOverviewURL = process.env.TEMPLATE_OVERVIEW_URL;
const tempCardURL = process.env.TEMPLATE_CARD_URL;
const dataURL = process.env.DATA_URL;

exports.handler = async (event, context) => {
  try {
    const [tempOverviewRes, tempCardRes, dataRes] = await Promise.all([
      axios.get(
        "https://github.com/alexlux58/node-farm/blob/main/templates/template-overview.html"
      ),
      axios.get(
        "https://github.com/alexlux58/node-farm/blob/main/templates/template-card.html"
      ),
      axios.get(
        "https://github.com/alexlux58/node-farm/blob/main/dev-data/data.json"
      ),
    ]);

    const tempOverview = tempOverviewRes.data;
    const tempCard = tempCardRes.data;
    const dataObj = JSON.parse(dataRes.data);

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    return {
      statusCode: 200,
      body: output,
      headers: {
        "Content-type": "text/html",
      },
    };
  } catch (error) {
    console.error("Error fetching templates or data:", error.message);

    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};
