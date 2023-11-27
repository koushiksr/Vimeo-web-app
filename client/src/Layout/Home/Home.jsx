import React, { useState } from "react";
import "./Home.css";
// import apiUrl from "../../config";
import tus from "tus-js-client";
import axios from "axios";

const REACT_APP_ACCESS_TOKEN = '6ce8c697bbf5657adb96a6de25c33cfb'

//process.env.REACT_APP_ACCESS_TOKEN;

const headerDelete = {
  Accept: 'application/vnd.vimeo.*+json;version=3.4',
  Authorization: `bearer ${REACT_APP_ACCESS_TOKEN}`,
  'Content-Type': 'application/json'
};

const headerPatch = {
  'Tus-Resumable': '1.0.0',
  'Upload-Offset': 0,
  'Content-Type': 'application/offset+octet-stream',
  Accept: 'application/vnd.vimeo.*+json;version=3.4'
};
const headerPost = {
  Accept: "application/vnd.vimeo.*+json;version=3.4",
  Authorization: `bearer ${REACT_APP_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};

function App() {
  const [description, setDescription] = useState("");
  const [percentage, setPercentage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [fileUploading, setFileUploading] = useState(false);

  const handleChange = async (eventObject) => {
    const file = eventObject.target.files[0];  
    if (
      !file ||
      !file.type.startsWith("video/") ||
      !["video/mp4", "video/webm"].includes(file.type.toLowerCase())
    ) {
      alert("Please select a valid video file (MP4 or WebM).");
      return;
    }

    const fileName = file.name;
    const fileSize = file.size.toString();
    const currentDate = new Date();
    const options = { timeZone: 'Asia/Kolkata' };
    const formattedDate = currentDate.toLocaleString('en-US', options)
console.log(fileName,fileSize,file,formattedDate);
    try {
      // const response = await axios.post(
      //   "https://api.vimeo.com/me/videos",
      //   {
      //     upload: {
      //       approach: "tus",
      //       size: fileSize,
      //     },
      //     description: description, 
      //     upload_date: formattedDate,
      //   },
      //   { headers: headerPost }
      //   );
      const response = await axios({
        method: 'post',
        url: `https://api.vimeo.com/me/videos`,
        headers: headerPost,
        data: {
          upload: {
            approach: 'tus',
            size: fileSize
          },
          name: fileName,
          description: description,
          upload_date: formattedDate,
        }
      });
      console.log(response);
        const upload = new tus.Upload(file, {
          endPoint: "https://api.vimeo.com/me/videos",
          uploadUrl: response.data.upload.upload_link,
          retryDelays: [0, 3000, 5000, 10000, 20000],
          metadata: {
            filename: file.name,
            filetype: file.type,
          },
          headers: {},
          onError: function (error) {
            console.error("Failed because: " + error);
          },
          onProgress: function (bytesUploaded, bytesTotal) {
            setFileUploading(true)
            setPercentage(((bytesUploaded / bytesTotal) * 100).toFixed(2));
            console.log(bytesUploaded, bytesTotal, percentage + "%");
          },
          onSuccess: function () {
            setFilename(upload.file.name);
          // setUrl(upload.url)
          console.log("Download %s from %s", upload.file.name, upload.url);
          setVideoUrl(upload.url);
        },
      });

      upload.start();
    } catch (error) {
      console.error(
        "Error creating video:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    // You can trigger the video upload here or perform any other actions
    // based on the current state (description, file, etc.)
    handleChange(/* Pass any required arguments */);
  };

  return (
    <div className="container">
      <div className="sub-container">
        <h2 className="heading">Vimeo Upload</h2>
        <textarea
          className="descriptionInput"
          id="textbox"
          value={description}
          onChange={handleInputChange}
          placeholder="Enter Description"
        />
        <input
          className="fileInput"
          onChange={handleChange}
          type="file"
          accept="video/*"
        />
        { fileUploading?(
        <div className="progressBarContainer">
          <div className="progressBar" style={{ width: `${percentage}%` }}>
            {`${percentage}%`}
          </div>
        </div>):""}
        <h4 className="result">File Name: {filename}</h4>
        <h4 className="result">Video URL: {videoUrl}</h4>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
export default App;
