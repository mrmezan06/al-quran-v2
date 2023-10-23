import { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
//import { getHadithIndex } from '../../actions/hadithActions';
import { getSuraById } from '../../actions/quranActions';
import {
  engToArabicNumber,
  engToBengaliNumber,
} from '../../utils/engToBengaliNumber';
// import PaginateSura from '../../components/PaginateSura';

const SuraPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [language, setLanguage] = useState('bn');
  const suraData = useSelector((state) => state.sura);
  const { loading, error, bangla, english, details, audio, ayatAudio } =
    suraData;

  useEffect(() => {
    const sura_number = params.sura_number;
    //dispatch(getHadithIndex());
    dispatch(getSuraById(sura_number));
  }, [dispatch, params.sura_number]);

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
        bangla && (
          <>
            <Row className="m-2 user-select-none">
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
                  <p
                    className="font-weight-bold text-white f-18 center mtb-10"
                    role="button"
                    onClick={() => {
                      language === 'bn' ? setLanguage('en') : setLanguage('bn');
                    }}
                  >
                    {/* Set Language */}
                    {/* {language === 'bn' ? 'বাংলা' : 'English'}
                {' ^'} */}
                    নং {engToBengaliNumber(details?.sura_no)}
                  </p>
                </Row>
              </Col>
            </Row>
            <Row className="m-2">
              <Col className="bg-success text-center">
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
              <Col className="bg-info">
                <p className="text-white font-weight-bold f-24 center mt-4">
                  {details?.arabic_bangla}
                </p>

                <Row className="center gap-10">
                  <p className="text-white f-14">
                    মোট আয়াতঃ {engToBengaliNumber(details?.total_ayat)}
                  </p>
                  {/* <p className="text-white f-14">
               
                {language === 'bn' ? 'পারা :' : 'Para :'} {details?.para}
              </p>
              <p className="text-white f-14">
                
                {language === 'bn' ? 'রুকু :' : 'Ruku :'}{' '}
                {details?.rukus.length > 2
                  ? details?.rukus[0] + ' , ' + details?.rukus[1] + ' ...'
                  : details?.rukus
                      ?.map((ruku) => ruku)
                      ?.toString()
                      ?.replace(/,/g, ', ')}
              </p>
              <p className="text-white f-14">
               
                {language === 'bn' ? 'সেজদা :' : 'Sejdah :'}{' '}
                {details?.sajdas.length > 2
                  ? details?.sajdas[0] + ' , ' + details?.sajdas[1] + ' ...'
                  : details?.sajdas
                      ?.map((sajda) => sajda)
                      ?.toString()
                      ?.replace(/,/g, ', ')}
              </p>
              <p className="text-white f-14">
               
                {language === 'bn' ? 'জুজ :' : 'Juzs :'}{' '}
                {details?.juzs
                  ?.map((juz) => juz)
                  ?.toString()
                  ?.replace(/,/g, ', ')}
              </p>
              <p className="text-white f-14">
                
                {language === 'bn' ? 'মঞ্জিল :' : 'Manzil :'}{' '}
                {details?.manzils
                  ?.map((manzil) => manzil)
                  ?.toString()
                  ?.replace(/,/g, ', ')}
              </p> */}
                  {/* jsafhbj */}
                </Row>
              </Col>
            </Row>
            <Row className="m-2 center">
              <audio className="player" src={audio?.audio} controls></audio>
            </Row>
            <Row className="m-2">
              <Col className="col-md-9">
                <Row
                  className="center bg-info text-white font-weight-bold"
                  style={{ height: '50px' }}
                >
                  بيت شعر / বাংলা অনুবাদ / English Translation
                </Row>
              </Col>
              <Col className="col-md-3">
                <Row
                  className="center bg-info text-white font-weight-bold"
                  style={{ height: '50px' }}
                >
                  Listen Verse / আয়াত শুনুন
                </Row>
              </Col>
            </Row>
            {
              bangla?.map((ayat, index) =>
                details?.sura_no === 1 ? (
                  ayat.id !== 1 && (
                    <>
                      <Row className="m-2" key={index}>
                        <Col className="box col-md-9">
                          <Row className="centerV">
                            <Col className="text-justify" lang="ar" dir="rtl">
                              <b>
                                {details?.sura_no === 1
                                  ? ayat.id === 7
                                    ? engToArabicNumber(6) +
                                      ' & ' +
                                      engToArabicNumber(7)
                                    : engToArabicNumber(Number(ayat?.id) - 1)
                                  : engToArabicNumber(ayat?.id)}
                                .&nbsp;
                              </b>
                              {ayat?.text}
                            </Col>
                          </Row>
                          <Row className="centerV">
                            <Col className="text-justify">
                              <b>
                                {details?.sura_no === 1
                                  ? ayat.id === 7
                                    ? engToBengaliNumber(6) +
                                      ' & ' +
                                      engToBengaliNumber(7)
                                    : engToBengaliNumber(Number(ayat?.id) - 1)
                                  : engToBengaliNumber(ayat?.id)}
                                .&nbsp;
                              </b>
                              {ayat.translation}
                            </Col>
                          </Row>
                          <Row className="centerV">
                            <Col className="text-justify">
                              <b>
                                {details?.sura_no === 1
                                  ? ayat.id === 7
                                    ? '6 & 7'
                                    : Number(ayat?.id) - 1
                                  : ayat?.id}
                                .&nbsp;
                              </b>
                              {english[index].translation}
                            </Col>
                          </Row>
                        </Col>

                        <Col className="col-md-3">
                          <Row className="box-no-left centerV">
                            <Col className="text-center">
                              <audio
                                src={ayatAudio?.ayahs[index]?.audio}
                                controls
                              ></audio>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </>
                  )
                ) : (
                  <>
                    <Row className="m-2" key={index}>
                      <Col className="box col-md-9">
                        <Row className="centerV">
                          <Col className="text-justify" lang="ar" dir="rtl">
                            <b>
                              {details?.sura_no === 1
                                ? ayat.id === 6
                                  ? engToArabicNumber(6) +
                                    ' & ' +
                                    engToArabicNumber(7)
                                  : engToArabicNumber(Number(ayat?.id) - 1)
                                : engToArabicNumber(ayat?.id)}
                              .&nbsp;
                            </b>
                            {ayat?.text}
                          </Col>
                        </Row>
                        <Row className="centerV">
                          <Col className="text-justify">
                            <b>
                              {details?.sura_no === 1
                                ? ayat.id === 6
                                  ? engToBengaliNumber(6) +
                                    ' & ' +
                                    engToBengaliNumber(7)
                                  : engToBengaliNumber(Number(ayat?.id) - 1)
                                : engToBengaliNumber(ayat?.id)}
                              .&nbsp;
                            </b>
                            {ayat.translation}
                          </Col>
                        </Row>
                        <Row className="centerV">
                          <Col className="text-justify">
                            <b>
                              {/* {details?.sura_no === 1
                                ? ayat.id === 6
                                  ? '6 & 7'
                                  : Number(ayat?.id) - 1
                                : ayat?.id} */}
                              {ayat.id} .&nbsp;
                            </b>
                            {english[index].translation}
                          </Col>
                        </Row>
                      </Col>

                      {/* <Col className="text-center">
                        <Row className="box-no-left centerV text-center">
                          {details?.rukus.map(
                            (ruku) => ruku === ayat?.id && ' রুকু '
                          )}
                          {details?.sajdas.map(
                            (sajda) => sajda === ayat?.id && ' সেজদা '
                          )}
                          {details?.juzs.map(
                            (juz) => juz === ayat?.id && ' জুজ '
                          )}
                          {details?.manzils.map(
                            (manzil) => manzil === ayat?.id && ' মঞ্জিল '
                          )}
                        </Row>
                      </Col> */}
                      <Col className="col-md-3">
                        <Row className="box-no-left centerV">
                          <Col className="text-center">
                            <audio
                              src={ayatAudio?.ayahs[index]?.audio}
                              controls
                            ></audio>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </>
                )
              )
              // :
              // english?.map((ayat, index) => (
              //     <Row className="m-2" key={index}>
              //       <Col>
              //         <Row className="box-no-right centerV">
              //           <Col className="text-justify" lang="ar" dir="rtl">
              //             {ayat?.text}
              //           </Col>
              //         </Row>
              //       </Col>

              //       <Col>
              //         <Row className="box centerV">
              //           {details?.sura_no === '1'
              //             ? index === 5
              //               ? '6 & 7'
              //               : Number(ayat?.id) - 1
              //             : ayat?.id}
              //           . {ayat.translation}
              //         </Row>
              //       </Col>
              //       <Col>
              //         <Row className="box-no-left centerV">
              //           {details?.rukus.map(
              //             (ruku) => ruku === ayat?.id && ' Ruku '
              //           )}
              //           {details?.sajdas.map(
              //             (sajda) => sajda === ayat?.id && ' Sejdah '
              //           )}
              //           {details?.juzs.map((juz) => juz === ayat?.id && ' Juz ')}
              //           {details?.manzils.map(
              //             (manzil) => manzil === ayat?.id && ' Manzil '
              //           )}
              //         </Row>
              //       </Col>
              //       <Col>
              //         <Row className="box-no-left centerV">
              //           <Col>
              //             <audio
              //               src={ayatAudio?.ayahs[index]?.audio}
              //               controls
              //             ></audio>
              //           </Col>
              //         </Row>
              //       </Col>
              //     </Row>
              //   ))
            }
          </>
        )
      )}
      {/* <PaginateSura pages={pages} page={page} sura_no={details?.sura_no} /> */}
      {/* Prev and Next */}
      <span className="m-2 text-center">
        <span className="text-info font-weight-bold f-18 mr-2 mtb-10">
          <Link
            to={`/sura/${
              Number(details?.sura_no) > 1 ? Number(details?.sura_no) - 1 : 114
            }`}
            className="text-info"
            style={{ textDecoration: 'none' }}
          >
            {'<'} Prev
          </Link>
        </span>
        <span className="text-info font-weight-bold f-18 mtb-10">
          <Link
            to={`/sura/${
              Number(details?.sura_no) < 114 ? Number(details?.sura_no) + 1 : 1
            }`}
            className="text-info"
            style={{ textDecoration: 'none' }}
          >
            Next {'>'}
          </Link>
        </span>
        {/* <Col className="bg-info">
          <Row className="center">
          </Row>
        </Col> */}
      </span>
      {/* jump to main */}
      <span className="m-2 text-right">
        <p className="text-white font-weight-bold f-18 mtb-10 mr-2">
          <a
            href="#main"
            className="text-white border bg-info px-2 py-1"
            style={{ textDecoration: 'none' }}
          >
            Top ^
          </a>
        </p>
      </span>
    </div>
  );
};

export default SuraPage;
