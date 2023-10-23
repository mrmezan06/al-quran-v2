import { Spinner, Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getHadithIndex } from '../../actions/hadithActions';

const HadithIndex = () => {
  const dispatch = useDispatch();
  const hadithIndex = useSelector((state) => state.hadithIndex);
  const { loading, error, index } = hadithIndex;

  useEffect(() => {
    dispatch(getHadithIndex());
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
          <h1>{error}</h1>
        </div>
      ) : (
        <>
          <div className="main">
            <Table striped bordered hover responsive className="table-sm mt-3">
              <thead>
                <tr className="bg-success text-white">
                  <th>ID</th>
                  <th>হাদিস নাম</th>
                  <th>Hadith Name</th>
                  <th>Total Section</th>
                  <th>Total Hadith</th>
                  <th>Read</th>
                </tr>
              </thead>
              <tbody>
                {index?.map((item) => (
                  <tr key={item?.id}>
                    <td>
                      <Link
                        to={`/hadith/index/${item?.book_key}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {item?.id}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/hadith/index/${item?.book_key}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {item?.nameBengali}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/hadith/index/${item?.book_key}`}
                        style={{
                          textDecoration: 'none',
                          textTransform: 'capitalize',
                        }}
                      >
                        {item?.nameEnglish}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/hadith/index/${item?.book_key}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {item?.section_number}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/hadith/index/${item?.book_key}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {item?.hadith_number}
                      </Link>
                    </td>

                    <td>
                      <Link
                        to={`/hadith/${item?.book_key}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <p className="text-info">Read</p>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default HadithIndex;
