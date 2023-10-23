import { Col, Row, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHadithIndex,
  getHadithsByBookAndChapterAndRange,
} from '../../actions/hadithActions';

const HadithByChapter = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const book_key = param.book_key;
  const start = param.start;
  const range = param.range;
  const chapter = param.chapter || 1;

  const hadithData = useSelector(
    (state) => state.hadithsByBookAndChapterAndRange
  );

  const { loading, error, hadiths, details } = hadithData;

  useEffect(() => {
    dispatch(getHadithIndex());
    dispatch(
      getHadithsByBookAndChapterAndRange(book_key, chapter, start, range)
    );
  }, [dispatch, book_key, chapter, start, range]);

  return (
    <div>
      {loading ? (
        // <h1>Loading...</h1>
        <div className="center" style={{ height: '80vh' }}>
          <Spinner animation="border" variant="success" />
        </div>
      ) : error ? (
        <div className="center" style={{ height: '80vh' }}>
          <h1>{error}</h1>
        </div>
      ) : (
        <>
          <Row className="m-2">
            <Col className="bg-info center">
              <Row className="center mtb-10">
                <p className="font-weight-bold text-white f-18 center mtb-10">
                  Chapter No. {details?.chSerial}
                </p>
              </Row>
            </Col>
            <Col className="bg-warning center">
              <Row className="center mtb-10">
                <p className="text-white font-weight-bold f-18 center mtb-10">
                  {/* Bismillahir Rahmanir Rahim in Arabic */}
                  {'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'}
                </p>
              </Row>
            </Col>
            <Col className="bg-info center">
              <Row className="center mtb-10">
                <p className="font-weight-bold text-white f-18 center mtb-10">
                  অধ্যায় নং {details?.chSerial}
                </p>
              </Row>
            </Col>
          </Row>
          <Row className="m-2">
            <Col className="bg-success">
              <p className="text-white font-weight-bold f-24 center">
                {details?.nameBengali}
              </p>
              <Row className="center gap-10">
                <p className="text-white f-14">
                  হাদিসঃ {details?.range_start}-{details?.range_end}
                </p>
              </Row>
            </Col>
          </Row>
          <Row className="m-2">
            <Col>
              <Row
                className="center bg-success br f-24 text-white"
                style={{ height: '100%' }}
              >
                الحديث
              </Row>
            </Col>
            <Col>
              <Row
                className="center bg-success br f-24 text-white"
                style={{ height: '100%' }}
              >
                হাদিস
              </Row>
            </Col>
            <Col>
              <Row
                className="center bg-success br f-24 text-white"
                style={{ height: '100%' }}
              >
                Hadith
              </Row>
            </Col>
          </Row>
          {hadiths?.map((hadith, index) => (
            <Row className="m-2" key={index}>
              <Col>
                <Row className="box-no-right centerV">
                  {hadith?.hadithArabic}
                </Row>
              </Col>
              <Col>
                <Row className="box centerV">{hadith?.hadithBengali}</Row>
              </Col>
              <Col>
                <Row className="box-no-left centerV">
                  {hadith?.hadithNo}. {hadith?.hadithEnglish}
                </Row>
              </Col>
            </Row>
          ))}
        </>
      )}
    </div>
  );
};

export default HadithByChapter;
