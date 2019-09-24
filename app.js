const fs = require("fs");
const emlformat = require("eml-format");

const EMAILS = "./emails/";

fs.readdir(EMAILS, (err, emails) => {
  if (err) return console.log(err);
  emails.forEach(email => {
    let eml = fs.readFileSync(`./emails/${email}`, "utf-8");
    emlformat.read(eml, (e, data) => {
      if (e) return console.log(e);
      //   fs.writeFileSync("sample.json", JSON.stringify(data, " ", 2));
      console.log(data.text);
    });
  });
});
