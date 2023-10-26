import { useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getSuraById } from '../../actions/quranActions';
import {
  engToArabicNumber,
  engToBengaliNumber,
} from '../../utils/engToBengaliNumber';

const SuraPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const suraData = useSelector((state) => state.sura);
  const {
    loading,
    error,
    verses,
    page,
    pageSize,
    totalPage,
    fullAudio,
    details,
  } = suraData;

  const sura_number = params.sura_number;
  const pageNumber = params.pageNumber || 1;
  useEffect(() => {
    //dispatch(getHadithIndex());
    dispatch(getSuraById(sura_number, pageNumber));
  }, [dispatch, sura_number, pageNumber]);
  return (
    <div className="main" id="main">
      {loading ? (
        // <h1>Loading...</h1>
        <div className="center" style={{ height: '80vh' }}>
          <Spinner animation="border" variant="success" />
        </div>
      ) : error ? (
        <div className="center" style={{ height: '80vh' }}>
          <h1 className="bg-danger text-white">{error}</h1>
        </div>
      ) : (
        verses && (
          <div className="container-fluid">
            <Row className="mb-1 user-select-none">
              <Col className="bg-info center">
                <Row className="center mtb-10">
                  <p className="font-weight-bold text-white f-18 center mtb-10">
                    No. {details?.sura_no}
                  </p>
                </Row>
              </Col>
              <Col className="bg-warning center">
                <Row className="center mtb-10">
                  <p className="text-white font-weight-bold f-18 center mtb-10">
                    {details?.sura_no !== 9 &&
                      'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ'}
                  </p>
                </Row>
              </Col>
              <Col className="bg-info center">
                <Row className="center mtb-10">
                  <p className="font-weight-bold text-white f-18 center mtb-10">
                    নং {engToBengaliNumber(details?.sura_no)}
                  </p>
                </Row>
              </Col>
            </Row>
            <Row className="">
              <Col className="bg-info text-center">
                <p className="text-white font-weight-bold f-24 mt-4">
                  {/* সুরাঃ {details?.sura_name} */}
                  {details?.arabic_english}
                </p>
                <Row className="center gap-10">
                  <p className="text-white f-14">
                    {/* মোট আয়াতঃ {details?.total_ayat} */}
                    Total Ayat : {details?.total_ayat}
                  </p>
                  {/* <p className="text-white f-14">পারাঃ {details?.para}</p> */}
                </Row>
              </Col>
              <Col className="bg-warning text-center">
                <Row className="text-center">
                  <audio
                    className="bg-warning ml-auto mr-auto mt-4 mb-4 "
                    src={fullAudio}
                    controls
                    controlsList="nodownload"
                  ></audio>
                </Row>
              </Col>
              <Col className="bg-info">
                <p className="text-white font-weight-bold f-24 center mt-4">
                  {details?.arabic_bangla}
                </p>

                <Row className="center gap-10">
                  <p className="text-white f-14">
                    মোট আয়াতঃ {engToBengaliNumber(details?.total_ayat)}
                  </p>
                </Row>
              </Col>
            </Row>
            {/* <Row className="m-2 center">
              <audio className="player" src={fullAudio} controls></audio>
            </Row> */}
            <Row className="mt-2">
              <Col className="col-md-12">
                <Row
                  className="center bg-info text-white font-weight-bold"
                  style={{ height: '65px', overflowY: 'auto' }}
                >
                  بيت شعر / অনুবাদ / Translation (
                  {(pageNumber - 1) * pageSize + 1} - {pageNumber * pageSize})
                </Row>
              </Col>
            </Row>
            {verses?.map((verse, index) =>
              details?.sura_no === 1 ? (
                verse.id !== 1 && (
                  <>
                    <Row className="" key={index}>
                      <Col className="box col-md-12">
                        <Row className="centerV">
                          <Col className="text-justify" lang="ar" dir="rtl">
                            <b>
                              {details?.sura_no === 1
                                ? verse.id === 7
                                  ? engToArabicNumber(6) +
                                    ' & ' +
                                    engToArabicNumber(7)
                                  : engToArabicNumber(Number(verse?.id) - 1)
                                : engToArabicNumber(verse?.id)}
                              .&nbsp;
                            </b>
                            {verse?.arabic}
                          </Col>
                        </Row>
                        <Row className="centerV">
                          <Col className="text-justify">
                            <b>
                              {details?.sura_no === 1
                                ? verse.id === 7
                                  ? engToBengaliNumber(6) +
                                    ' & ' +
                                    engToBengaliNumber(7)
                                  : engToBengaliNumber(Number(verse?.id) - 1)
                                : engToBengaliNumber(verse?.id)}
                              .&nbsp;
                            </b>
                            {verse.bangla}
                          </Col>
                        </Row>
                        <Row className="centerV">
                          <Col className="text-justify">
                            <b>
                              {details?.sura_no === 1
                                ? verse.id === 7
                                  ? '6 & 7'
                                  : Number(verse?.id) - 1
                                : verse?.id}
                              .&nbsp;
                            </b>
                            {verse.english}
                          </Col>
                        </Row>
                        <Row className="centerV">
                          <Col className="text-center">
                            <audio src={verse?.audio} controls></audio>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </>
                )
              ) : (
                <>
                  <Row className="" key={index}>
                    <Col className="box col-md-12">
                      <Row className="centerV">
                        <Col className="text-justify" lang="ar" dir="rtl">
                          <b>
                            {details?.sura_no === 1
                              ? verse.id === 6
                                ? engToArabicNumber(6) +
                                  ' & ' +
                                  engToArabicNumber(7)
                                : engToArabicNumber(Number(verse?.id) - 1)
                              : engToArabicNumber(verse?.id)}
                            .&nbsp;
                          </b>
                          {verse?.arabic}
                        </Col>
                      </Row>
                      <Row className="centerV">
                        <Col className="text-justify">
                          <b>
                            {details?.sura_no === 1
                              ? verse.id === 6
                                ? engToBengaliNumber(6) +
                                  ' & ' +
                                  engToBengaliNumber(7)
                                : engToBengaliNumber(Number(verse?.id) - 1)
                              : engToBengaliNumber(verse?.id)}
                            .&nbsp;
                          </b>
                          {verse.bangla}
                        </Col>
                      </Row>
                      <Row className="centerV">
                        <Col className="text-justify">
                          <b>{verse.id} .&nbsp;</b>
                          {verse.english}
                        </Col>
                      </Row>
                      <Row className="centerV">
                        <Col className="text-center">
                          <audio src={verse?.audio} controls></audio>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </>
              )
            )}
          </div>
        )
      )}

      {/* Pagination */}
      {/* total page greater than 1 then show pagination */}
      {totalPage > 1 && (
        <>
          <div className="d-flex justify-content-center flex-wrap">
            {[...Array(totalPage).keys()].map((x) => (
              <Link
                to={`/sura/${sura_number}/${x + 1}`}
                className={`btn btn-${
                  x + 1 === page ? 'warning' : 'info'
                } m-2 rounded`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}

      {/* jump to main */}
      <span className="m-2 text-right">
        <p className="text-white font-weight-bold f-18 mtb-10 mr-2">
          <span
            className="text-white border bg-info px-2 py-1"
            style={{ textDecoration: 'none', cursor: 'pointer' }}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            Top ^
          </span>
        </p>
      </span>
    </div>
  );
};

export default SuraPage;
