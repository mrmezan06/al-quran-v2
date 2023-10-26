import { Col, Row, Spinner, Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getBooks } from '../../actions/bookActions';

const BookIndexPage = () => {
  const dispatch = useDispatch();

  const bookIndex = useSelector((state) => state.bookIndex);

  const { loading, error, index } = bookIndex;

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        // <h1>Loading...</h1>
        <div className="center" style={{ height: '80vh' }}>
          <Spinner animation="border" variant="success" />
        </div>
      ) : error ? (
        <div className="center" style={{ height: '80vh' }}>
          <h1 className="text-warning">{error}</h1>
        </div>
      ) : (
        <>
          <Row className="m-1">
            <Col className="center py-3">
              <h1 className="text-info user-select-none">Book Index</h1>
            </Col>
          </Row>

          <div className="m-2">
            <Table responsive className="table-sm user-select-none">
              <thead>
                <tr className="bg-info text-white text-center">
                  <th>#ID</th>
                  <th>Name of Book</th>
                  <th>Total Part</th>
                  <th>Link</th>
                  <th>Author</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {index.length > 0 ? (
                  index?.map((book, i) => (
                    <tr key={book?._id} className="text-center">
                      <td>#{i + 1}</td>
                      <td className="text-left">{book?.title}</td>
                      <td>{book?.part}</td>
                      <td
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          width: '100%',
                        }}
                        className="justify-content-center"
                      >
                        {book?.url.map((url, i) => {
                          return (
                            <Link
                              to={`/read/${book?._id}?index=${i}`}
                              style={{
                                textDecoration: 'none',
                                padding: '5px',
                                margin: '2px',
                                border: 'none',
                              }}
                              className="bg-info text-white rounded"
                            >
                              Part-{i + 1}
                            </Link>
                          );
                        })}
                      </td>

                      <td>{book?.author}</td>
                      <td>{book?.category}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center">
                    <td colSpan="6">
                      <h1 className="text-warning">No Book Found!</h1>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            {/* <PaginateBookIndex
              pages={pages}
              page={page}
              book_key={details?.book_key}
            /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default BookIndexPage;
