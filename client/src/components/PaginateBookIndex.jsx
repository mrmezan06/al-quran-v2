import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';

const PaginateBookIndex = ({ pages, page, book_key }) => {
  const param = useParams();
  const [cIndex, setCIndex] = React.useState(Number(param.pageNumber) || 1);
  return (
    pages > 1 && (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '15px',
          margin: '1px auto',
        }}
      >
        <Pagination>
          {cIndex > 1 && (
            <LinkContainer
              to={`/hadith/index/${book_key}/1`}
              onClick={() => setCIndex(1)}
            >
              <b className="center-paginate">{'<<'}</b>
            </LinkContainer>
          )}
          {cIndex > 1 && (
            <LinkContainer
              to={`/hadith/index/${book_key}/${cIndex - 1}`}
              onClick={() => setCIndex(cIndex - 1)}
            >
              <b className="center-paginate">{'<'}</b>
            </LinkContainer>
          )}
          {[...Array(pages).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              to={`/hadith/index/${book_key}/${x + 1}`}
            >
              <Pagination.Item
                key={x + 1}
                active={x + 1 === page}
                activeLabel={''}
                onClick={() => setCIndex(x + 1)}
                style={{ borderRadius: '5px' }}
              >
                {x + 1}
              </Pagination.Item>
            </LinkContainer>
          ))}
          {cIndex < pages && (
            <LinkContainer
              to={`/hadith/index/${book_key}/${cIndex + 1}`}
              onClick={() => setCIndex(cIndex + 1)}
            >
              <b className="center-paginate">{'>'}</b>
            </LinkContainer>
          )}
          {cIndex < pages && (
            <LinkContainer
              to={`/hadith/index/${book_key}/${pages}`}
              onClick={() => setCIndex(pages)}
            >
              <b className="center-paginate">{'>>'}</b>
            </LinkContainer>
          )}
        </Pagination>
      </div>
    )
  );
};

export default PaginateBookIndex;

/* 
<Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,

*/
