import { Col, Row, Spinner, Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHadithBookIndex,
  getHadithIndex,
} from '../../actions/hadithActions';
import PaginateBookIndex from '../../components/PaginateBookIndex';

const BookIndexPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const pageNumber = params.pageNumber || 1;

  const hadithIndex = useSelector((state) => state.hadithBookIndex);

  const { loading, error, index, page, pages, details } = hadithIndex;

  useEffect(() => {
    const book_key = params.book_key;
    dispatch(getHadithIndex());
    dispatch(getHadithBookIndex(book_key, pageNumber));
  }, [dispatch, pageNumber, params.book_key]);

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
                  No. {details?.id}
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
                  Page {page} of {pages}
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
                  মোট পার্টঃ {details?.section_number}
                </p>
                <p className="text-white f-14">
                  মোট হাদিসঃ {details?.hadith_number}
                </p>
              </Row>
            </Col>
            <Col className="bg-danger">
              <p className="text-white font-weight-bold f-24 center capitalize">
                {details?.nameEnglish}
              </p>

              <Row className="center gap-10">
                <p className="text-white f-14">
                  Total Section: {details?.section_number}
                </p>
                <p className="text-white f-14">
                  Total Hadith: {details?.hadith_number}
                </p>
              </Row>
            </Col>
          </Row>
          <div className="m-2">
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr className="bg-success text-white">
                  <th>হাদিসের বিষয়</th>
                  <th>Hadith Topic</th>
                  <th>Chapter</th>

                  <th>Range</th>
                </tr>
              </thead>
              <tbody>
                {index?.map((topics) => (
                  <tr key={topics?.id}>
                    <td>
                      <Link
                        to={`/hadith/chapter/${topics?.bookInitial}/${topics?.range_start}/${topics?.range_end}/${topics?.chSerial}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {topics?.nameBengali}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/hadith/chapter/${topics?.bookInitial}/${topics?.range_start}/${topics?.range_end}/${topics?.chSerial}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {topics?.nameEnglish}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/hadith/chapter/${topics?.bookInitial}/${topics?.range_start}/${topics?.range_end}/${topics?.chSerial}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {topics?.chSerial}
                      </Link>
                    </td>

                    <td>
                      <Link
                        to={`/hadith/chapter/${topics?.bookInitial}/${topics?.range_start}/${topics?.range_end}/${topics?.chSerial}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {topics?.range_start}-{topics?.range_end}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <PaginateBookIndex
              pages={pages}
              page={page}
              book_key={details?.book_key}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BookIndexPage;
