import { Spinner, Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuranIndex } from '../actions/quranActions';
const HomePage = () => {
  const dispatch = useDispatch();
  const quranIndex = useSelector((state) => state.quranIndex);
  const { loading, error, index } = quranIndex;

  useEffect(() => {
    dispatch(getQuranIndex());
  }, [dispatch]);

  return (
    <div className="ml-5 mr-5">
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
          <div className="main">
            <h1 className="text-center rounded px-2 py-3 text-info bg-white box-shadow-5 font-weight-bold font-italic user-select-none">
              Index
            </h1>
            <Table striped bordered hover responsive className="table-sm mt-1">
              <thead>
                <tr className="bg-info text-white user-select-none">
                  <th>#</th>
                  <th>اسم السورة</th>
                  <th>Surā nāme</th>
                  <th>Translation</th>
                  <th>Surā nāme</th>
                  <th>Translation</th>
                  <th>TOTAL AYAH</th>
                  <th>REVEALATION TYPE</th>
                </tr>
              </thead>
              <tbody>
                {index.map((quran) => (
                  <tr key={quran?._id}>
                    <td>
                      <Link
                        to={`/sura/${quran?.sura_no}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {quran?.sura_no}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/sura/${quran?.sura_no}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {quran?.arabic}
                      </Link>
                    </td>

                    <td>
                      <Link
                        to={`/sura/${quran?.sura_no}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {quran?.arabic_english}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/sura/${quran?.sura_no}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {quran?.english}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/sura/${quran?.sura_no}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {quran?.arabic_bangla}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/sura/${quran?.sura_no}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {quran?.bangla}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/sura/${quran?.sura_no}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {quran?.total_ayat}
                      </Link>
                    </td>

                    <td>
                      <Link
                        to={`/sura/${quran?.sura_no}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {quran?.revealation}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* <Paginate pages={pages} page={page} /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
