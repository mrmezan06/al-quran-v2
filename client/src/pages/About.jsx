import React, { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getHadithIndex } from '../actions/hadithActions';

const About = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHadithIndex());
  });

  return (
    <Row className="m-2 fullcenter">
      <Card className="fullcenter">
        <Card.Img
          variant="top"
          src="https://i.ibb.co/YQmz5x5/20211227-144631.jpg"
          style={{ borderRadius: '50%', width: '15%', marginTop: '10px' }}
          className="center"
        />
        <Card.Body className="space">
          <Card.Title
            className="center box1"
            style={{
              fontWeight: 'bolder',
              fontSize: '20px',
              fontStyle: 'italic',
            }}
          >
            Mejanur Rahman
          </Card.Title>
          <Card.Text>
            <p
              className="center"
              style={{ flexWrap: 'wrap', color: '#1877f2' }}
            >
              MERN Stack Web Developer
            </p>
            <p className="center">
              <a
                style={{ textDecoration: 'none', gap: '5px', color: 'red' }}
                href="mailto:mrmezan06@gmail.com"
                className="center"
              >
                <i class="far fa-envelope"></i>
                Suggestion
              </a>
            </p>
          </Card.Text>
          <div className="center" style={{ gap: '10px', flexWrap: 'wrap' }}>
            <p className="center" style={{ gap: '5px' }}>
              <a
                style={{
                  textDecoration: 'none',
                  gap: '5px',
                  color: '#dd12b1',
                }}
                href="https://github.com/mrmezan06"
                target={'_blank'}
                rel="noreferrer"
                className="center"
              >
                <i class="fab fa-github"></i>
                Github
              </a>
            </p>
            <p className="center" style={{ gap: '5px' }}>
              <a
                style={{
                  textDecoration: 'none',
                  gap: '5px',
                  color: '#1877f2',
                }}
                href="https://facebook.com/mejanur.mezan.3"
                target={'_blank'}
                rel="noreferrer"
                className="center"
              >
                <i class="fab fa-facebook"></i>
                Facebook
              </a>
            </p>
            <p className="center" style={{ gap: '5px' }}>
              <a
                style={{
                  textDecoration: 'none',
                  gap: '5px',
                  color: '#c32aa3',
                }}
                href="https://instagram.com/mejanur.mezan.3"
                target={'_blank'}
                rel="noreferrer"
                className="center"
              >
                <i class="fab fa-instagram"></i>
                Instagram
              </a>
            </p>
            <p className="center" style={{ gap: '5px' }}>
              <a
                style={{
                  textDecoration: 'none',
                  gap: '5px',
                  color: '#1da1f2',
                }}
                href="https://twitter.com/MejanurMezan"
                target={'_blank'}
                rel="noreferrer"
                className="center"
              >
                <i class="fab fa-twitter"></i>
                Twitter
              </a>
            </p>
            <p className="center" style={{ gap: '5px' }}>
              <a
                style={{
                  textDecoration: 'none',
                  gap: '5px',
                  color: '#1f9bff',
                }}
                href="https://www.linkedin.com/in/mejanur-rahman-061998/"
                target={'_blank'}
                rel="noreferrer"
                className="center"
              >
                <i class="fab fa-linkedin"></i>
                LinkedIn
              </a>
            </p>
          </div>
          <div className="center">
            <h1 style={{ color: '#1f9bcf' }}>Checkout My Other Project</h1>
          </div>
          <Col width={'100%'}>
            <Row className="center" style={{ justifyContent: 'space-evenly' }}>
              <a
                href="http://ocean-book.cyclic.app/"
                target={'_blank'}
                rel="noreferrer"
                className="boxUrl"
                style={{
                  textDecoration: 'none',
                }}
              >
                Ocean Book
              </a>
              <a
                href="https://chat-gpt-ai.netlify.app/"
                target={'_blank'}
                rel="noreferrer"
                className="boxUrl"
                style={{
                  textDecoration: 'none',
                }}
              >
                Open AI
              </a>
              <a
                href="https://proshop-inventory.netlify.app/"
                target={'_blank'}
                rel="noreferrer"
                className="boxUrl"
                style={{
                  textDecoration: 'none',
                }}
              >
                ProShop
              </a>
              <a
                href="https://islamic-life.000webhostapp.com/"
                target={'_blank'}
                rel="noreferrer"
                className="boxUrl"
                style={{
                  textDecoration: 'none',
                }}
              >
                Al-Quran(PHP)
              </a>
              <a
                href="https://krypto-ether.netlify.app/"
                target={'_blank'}
                rel="noreferrer"
                className="boxUrl"
                style={{
                  textDecoration: 'none',
                }}
              >
                Crypto Sharing
              </a>
            </Row>
            <Row className="center" style={{ justifyContent: 'space-evenly' }}>
              <a
                href="https://media-you.netlify.app/"
                target={'_blank'}
                rel="noreferrer"
                className="boxUrl"
                style={{
                  textDecoration: 'none',
                }}
              >
                Youtube Clone
              </a>
              <a
                href="https://portfolio-mezan.ink/"
                target={'_blank'}
                rel="noreferrer"
                className="boxUrl"
                style={{
                  textDecoration: 'none',
                }}
              >
                Portfolio
              </a>
              <a
                href="https://akash-dashboard.netlify.app/"
                target={'_blank'}
                rel="noreferrer"
                className="boxUrl"
                style={{
                  textDecoration: 'none',
                }}
              >
                Admin Dashboard
              </a>
              <a
                href="https://akash07105.netlify.app/"
                target={'_blank'}
                rel="noreferrer"
                className="boxUrl"
                style={{
                  textDecoration: 'none',
                }}
              >
                Playing With CSS
              </a>
            </Row>
          </Col>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default About;
