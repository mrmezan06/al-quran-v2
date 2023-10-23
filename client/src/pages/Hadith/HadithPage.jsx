import { Col, Row, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHadithIndex,
  getHadithsByBookKey,
} from '../../actions/hadithActions';
import PaginateHadithsByKey from '../../components/PaginateHadithsByKey';

const HadithPage = () => {
  const params = useParams();
  const book_key = params.book_key;
  const pageNumber = params.pageNumber || 1;

  const dispatch = useDispatch();
  const hadithData = useSelector((state) => state.hadithsByBookKey);

  const { loading, error, hadiths, page, pages, details } = hadithData;

  useEffect(() => {
    dispatch(getHadithIndex());
    dispatch(getHadithsByBookKey(book_key, pageNumber));
  }, [dispatch, book_key, pageNumber]);

  return (
    <div>
      {loading ? (
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
                  Total Section - {details?.section_number}
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
                  {page} of {pages} Pages | Per Page 1000 Hadiths
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
                  মোট হাদিস - {details?.hadith_number}
                </p>
              </Row>
            </Col>
            <Col className="bg-success">
              <p className="text-white font-weight-bold f-24 center">
                {details?.nameEnglish}
              </p>
              <Row className="center gap-10">
                <p className="text-white f-14">
                  Total Hadith - {details?.hadith_number}
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
      <PaginateHadithsByKey pages={pages} page={page} book_key={book_key} />
    </div>
  );
};

export default HadithPage;
