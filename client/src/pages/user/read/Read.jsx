import React from 'react';
import './read.css';

const Read = () => {
  const path = window.location;
  // console.log(path.search.replace("?key=", ""));
  const key = path.search.replace('?key=', '');

  return (
    <div className="read">
      <iframe
        // src={`https://www.youtube.com/embed/S4QodGcevrE`}
        // src={`https://drive.google.com/file/d/${key}/preview`}
        src={`https://drive.google.com/file/d/1CYEqKg0XR2HiYsHDTPbiwJooeL5oTII-/preview`}
        key={key}
        width="90%"
        height="100%"
        allow="autoplay"
        title={key}
      ></iframe>
      {/* <iframe
        width="100%"
        height="900"
        src="https://www.youtube.com/embed/S4QodGcevrE"
        title="Top 10 Tausif Bangla Song"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe> */}
    </div>
  );
};

export default Read;
