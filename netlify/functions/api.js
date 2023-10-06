const axios = require("axios"); // Ensure to install axios via npm

const dataURL =
  "https://github.com/alexlux58/node-farm/blob/main/dev-data/data.json"; // Set this environment variable in your Netlify settings

exports.handler = async (event, context) => {
  try {
    const response = await axios.get(dataURL);
    const data = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
