import React, { useEffect, useState } from 'react';
import './read.css';
import axios from 'axios';
import { BASE_URL } from '../../../constants/BASE_URL';
import toast from 'react-hot-toast';

const Read = () => {
  const path = window.location;
  // console.log(path.search.replace("?key=", ""));

  const id = path.pathname.replace('/read/', '');
  const index = Number(path.search.replace('?index=', ''));

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [key, setKey] = useState('');
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 100);
    const fetchBookDetails = async () => {
      await axios
        .get(`${BASE_URL}/book/get/${id}`)
        .then((res) => {
          setTitle(res.data?.title);
          setAuthor(res.data?.author);

          const k = res.data?.url[index].split('/')[5];

          const keyArray = res.data?.url.map((url) => {
            return url.split('/')[5];
          });
          setKeys(keyArray);

          setKey(k);
        })
        .catch((err) => {
          toast.error(err);
        });
    };
    fetchBookDetails();
  }, [id, index]);

  return (
    <>
      <div className="read">
        {key && (
          <>
            <h1 className="text-center">{title}</h1>
            <p className="text-center text-info">
              By <b>{author}</b>
            </p>
            <iframe
              // src={`https://www.youtube.com/embed/S4QodGcevrE`}
              // src={`https://drive.google.com/file/d/${key}/preview`}
              src={`https://drive.google.com/file/d/${key}/preview`}
              width="100%"
              height="100%"
              allow="autoplay"
              frameBorder={0}
              title={title}
              allowFullScreen
            ></iframe>
            <div className="d-flex justify-content-center">
              {keys.map((k, i) => (
                <a
                  href={`/read/${id}?index=${i}`}
                  className={`btn btn-${index === i ? 'warning' : 'info'} m-2`}
                >
                  Part-{i + 1}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Read;
