const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');

const client_id = 'f9aefd9075d874eef152df1dd6e28a64c2faef70';
const access_token = '0332e809b2759db08954ce3393ee2496';
const client_secret = 'jx0TWh6v+dh69H268lDPtSk8gyxo6QFEJbgT/VhyPA8XY7RNsKMmz8K726cXcy6WfKGIzG+/fJf5AeLkwEbbHfltvong8XI3AtUwlcquXY/F/lWb7+6rB8dNxp9SMx9X';
const Students = require('../models/students');
let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo(client_id, client_secret, access_token);

let file_name = path.join(__dirname, 'your_video_file.mp4');  // Replace 'your_video_file.mp4' with the actual video file name
console.log('File path:', file_name);

// Upload the video to Vimeo
client.upload(
  file_name,
  {
    'name': 'your_video_file',
    'description': 'The description goes here.'
  },
  function (uri) {
    console.log('Your video URI is: ' + uri);
    createVideo();

  },
  function (bytes_uploaded, bytes_total) {
    var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
    console.log(bytes_uploaded, bytes_total, percentage + '%')
  },
  function (error) {
    console.log('Failed because: ' + error)
  }

)


router.post('/', async (req, res) => {
  const apiUrl = 'https://api.vimeo.com/me/videos';

  const headers = {
    Authorization: `bearer ${access_token}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.vimeo.*+json;version=3.4',
  };

  try {
    const response = await axios.post(apiUrl, {}, { headers });
    console.log('Video created successfully:', response.data);
    res.send(response.data); // Send the Vimeo API response to the client
  } catch (error) {
    // console.error('Error creating video:', error.response ? error.response.data : error.message);
    res.status(500).send({ error: 'Failed to create video' }); // Send an error response to the client
  }
});

module.exports = router;
