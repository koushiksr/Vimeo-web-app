import React, { useState } from "react";
import "./Home.css";
// import apiUrl from "../../config";
import tus from "tus-js-client";
import axios from "axios";

const REACT_APP_ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

// const headerDelete = {
//   Accept: 'application/vnd.vimeo.*+json;version=3.4',
//   Authorization: `bearer ${REACT_APP_ACCESS_TOKEN}`,
//   'Content-Type': 'application/json'
// };


// const headerPatch = {
//   'Tus-Resumable': '1.0.0',
//   'Upload-Offset': 0,
//   'Content-Type': 'application/offset+octet-stream',
//   Accept: 'application/vnd.vimeo.*+json;version=3.4'
// };

const headerPost = {
  Accept: 'application/vnd.vimeo.*+json;version=3.4',
  Authorization: `bearer ${REACT_APP_ACCESS_TOKEN}`,
  'Content-Type': 'application/json'
};

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  console.log(process.env.REACT_APP_ACCESS_TOKEN);
  const handleChange = async (eventObject) => {
    const file = eventObject.target.files[0];

    if (!file || !file.type.startsWith('video/') || !['video/mp4', 'video/webm'].includes(file.type.toLowerCase())) {
      alert('Please select a valid video file (MP4 or WebM).');
      return;
    }

    // const fileName = file.name;
    const fileSize = file.size.toString();

    try {
      const response = await axios.post('https://api.vimeo.com/me/videos', {
        upload: {
          approach: 'tus',
          size: fileSize
        }
      }, { headers: headerPost });

      const upload = new tus.Upload(file, {
        endPoint: 'https://api.vimeo.com/me/videos',
        uploadUrl: response.data.upload.upload_link,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
          filename: file.name,
          filetype: file.type
        },
        headers: {},
        onError: function (error) {
          console.error('Failed because: ' + error);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          console.log(bytesUploaded, bytesTotal, percentage + '%');
        },
        onSuccess: function () {
          console.log('Download %s from %s', upload.file.name, upload.url);
          setVideoUrl(upload.url);
        }
      });

      upload.start();
    } catch (error) {
      console.error('Error creating video:', error.response ? error.response.data : error.message);
    }

  };

  return (
    <div>
      <div>Vimeo upload test</div>
      <input onChange={handleChange} type='file' accept='video/*' />
      <a href={videoUrl} target='_blank' rel='noopener noreferrer'>Video link</a>
      {videoUrl}
    </div>
  );
}

export default App;
