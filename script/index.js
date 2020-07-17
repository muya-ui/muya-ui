import fs from 'fs';
import axios from 'axios';
import path from 'path';
import FormData from 'form-data';

async function upload() {
  const data = fs.createReadStream(path.join('../docz/dist.zip'));
  const form = new FormData();
  const params = {
    token: process.env.TOKEN,
  };

  form.append('file', data);

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

  axios.post('https://muya-ui.kujiale.com/api/upload', form, {
    headers,
    params,
    maxContentLength: Infinity,
  });
}

upload();
