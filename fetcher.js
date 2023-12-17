// two command line arguments
// a URL -- use request library package.
// A local file path

const url = process.argv[2];
const filePath = process.argv[3];

const request = require('request');
const fs = require('fs');

const fetcher = function (url, filePath, callback) {
  request.get({uri: url}, (err, response, body) => {
    if (err) {
      callback(err);
      return;
    }
    
    if (response.statusCode !== 200) {
      callback(new Error(`Failed to get '${url}'. Status Code: ${response.statusCode}`));
      return;
    }

    fs.writeFile(filePath, body, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, `Downloaded and saved ${body.length} bytes to ${filePath}`);
      }
    });
  });
};


const handleFetchResult = (err, message) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(message);
    process.exit(0);
  }
};

fetcher(url, filePath, handleFetchResult);

  //   const conn = net.createConnection({
//     url,
//     port: 80
//   });

//   conn.on('data', (data) => {
//     setTimeout(() => {
//       fs.writeFile(filePath, data, (err) => {
//         if (err) throw err;
//         conn.write(`Downloaded and saved 1234 bytes to ${filepath}.`);
//       });
//     }, 1000);
//   });
  





//   conn.setEncoding('utf8');
// }

