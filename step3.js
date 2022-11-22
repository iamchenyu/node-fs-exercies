const fs = require("fs");
const axios = require("axios");

const cat = (path) => {
  try {
    const data = fs.readFileSync(path, "utf8");
    checkWrite(data);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const webCat = async (url) => {
  try {
    const res = await axios.get(url);
    checkWrite(res.data);
  } catch (e) {
    console.error(e.code);
    process.exit(1);
  }
};

const writeToFile = (path, filename) => {
  fs.writeFile(filename, path, (err) => {
    if (err) {
      console.error(err);
      process.exit(2);
    }
  });
};

const checkWrite = (path) => {
  if (process.argv[2] === "--out") {
    writeToFile(path, process.argv[3]);
  } else {
    console.log(path);
  }
};

const checkType = (arg) => {
  if (arg.includes("http")) {
    webCat(arg);
  } else {
    cat(arg);
  }
};

if (process.argv[2] === "--out") {
  checkType(process.argv[4]);
} else {
  checkType(process.argv[2]);
}
