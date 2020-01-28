const fetch = require("node-fetch");
const {writeFile} = require("nodeutilz") ;

(async function () {

     
    const result = await fetch('https://code.wireshark.org/review/gitweb?p=wireshark.git;a=blob_plain;f=manuf');
    const data = await result.text();
    const ouiData = data
        .split("\n")
        .filter((f) => f.search(new RegExp(/^#/)) != 0)
        .filter((f) => f.length > 0)
        .reduce((n,o) => {
              const splitData = o.split('\t');
              const index0 = splitData.shift();
              const remainingData = splitData.join(' ');
              const objectDate = {
                  oui: index0,
                  vendor: remainingData,
              }
              n.push(objectDate);
              return n;
        },[])//?
    const asString = JSON.stringify(ouiData);
    const filePath = './vendorOuiList.json';
    writeFile(filePath,asString,'utf8').then(console.log).catch(console.error)
})()
