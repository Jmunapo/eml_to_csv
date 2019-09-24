const fs = require("fs");
const emlformat = require("eml-format");
const emailsInString = require("emails-in-string");
const converter = require("convert-array-to-csv");

const EMAILS = "./emails/";

let emails_arr = [];
fs.readdir(EMAILS, (err, emails) => {
  if (err) return console.log(err);
  emails.forEach(email => {
    let eml = fs.readFileSync(`./emails/${email}`, "utf-8");
    emlformat.read(eml, (e, data) => {
      if (e) return console.log(e);
      let addrs = emailsInString(data.text);
      emails_arr = [...emails_arr, ...addrs];
    });
  });
  let em_obj = [];
  emails_arr.forEach((em, i) => {
    em_obj.push({
      user: i + 1,
      email: em
    });
  });

  const toCsv = converter.convertArrayToCSV(em_obj);
  fs.writeFileSync("emails.csv", toCsv);
  //   console.log(toCsv);
});
