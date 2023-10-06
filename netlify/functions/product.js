const axios = require("axios"); // Make sure to install axios via npm
const replaceTemplate = require("./modules/replaceTemplate");
const slugify = require("slugify");

// URLs to your templates and data
const tempProductURL =
  "https://github.com/alexlux58/node-farm/blob/main/templates/template-product.html";
const dataURL =
  "https://github.com/alexlux58/node-farm/blob/main/dev-data/data.json";

exports.handler = async (event, context) => {
  const query = event.queryStringParameters;

  try {
    const [tempProductRes, dataRes] = await Promise.all([
      axios.get(tempProductURL),
      axios.get(dataURL),
    ]);

    const tempProduct = tempProductRes.data;
    const dataObj = JSON.parse(dataRes.data);
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

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
