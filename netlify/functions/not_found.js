exports.handler = async (event, context) => {
  return {
    statusCode: 404,
    body: "<h1>404 Page not found</h1>",
    headers: {
      "Content-type": "text/html",
      "my-own-header": "alex-lux",
    },
  };
};
