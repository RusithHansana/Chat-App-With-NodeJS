const express = require("express");

const app = express();

app.listen(3000 || process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
