const fs = require("fs");
const axios = require("axios");

const cat = (path) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(data);
  });
};

const webCat = async (url) => {
  try {
    const res = await axios.get(url);
    console.log(res.data);
  } catch (e) {
    console.error(e.code);
    process.exit(2);
  }
};

if (process.argv[2].includes("http")) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}
