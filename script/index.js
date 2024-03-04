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
    form.append('token', process.env.TOKEN);

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
      .post('https://muya-ui.kujiale.com/api/upload', form, {
        headers,
        maxContentLength: Infinity,
      })
      .then((res, error) => {
        if (res) {
          console.log(res.data);
        } else {
          console.error(error);
        }
      });
  });
}

upload();
