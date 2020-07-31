/* eslint-disable */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const exec = require('child_process').exec;

function upload() {
  exec('zip -q -r .docz/muya-ui.zip .docz/dist', async error => {
    if (error) {
      console.error(error);
      return;
    }
    const data = fs.createReadStream(path.join('.docz/muya-ui.zip'));
    const form = new FormData();

    form.append('file', data);
    form.append('name', 'muya-ui');
    form.append('token', process.TOKEN);

    const headers = await new Promise((resolve, reject) => {
      form.getLength((err, length) => {
        if (err) {
          reject(err);
        }
        let headers = {
          'Content-Length': length,
          ...form.getHeaders(),
        };
        resolve(headers);
      });
    });

    axios
      .post('http://localhost:3000/api/upload', form, {
        headers,
        maxContentLength: Infinity,
      })
      .then(error => {
        console.error(error);
      });
  });
}

upload();
