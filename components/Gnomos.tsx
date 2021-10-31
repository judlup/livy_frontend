import React, { useState, useEffect } from 'react';
import { Col, Form, FormControl, InputGroup, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Gnomo from './Gnomo';
import { IGnomo } from './IGnomo';
// import data from '../resources/data.json';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../styles/Gnomos.module.scss';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Gnomos = () => {
  const [habitants, setHabitants] = useState<Array<IGnomo>>([]);
  const [chunkData, setChunkData] = useState<Array<IGnomo | any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [show, setShow] = useState<Array<IGnomo>>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [size, setSize] = useState<number>(20);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let values = await (await axios.get('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json')).data;
      setHabitants([...values.Brastlewark]);
      const ck = chunk(values.Brastlewark, size);
      setChunkData([...ck]);
      setShow(ck[0]);
      setLoading(false);
    };
    getData();
  }, []);

  const onChangeText = (e: any) => {
    setSearch(e.target.value);
  };

  const searchGnomo = () => {
    if (search === '') {
      setLoading(true);
      setShow([]);
      setShow(habitants);
      setLoading(false);
    } else {
      const values = habitants.filter((habitant: IGnomo) => {
        return habitant.name.toLowerCase().includes(search.toLowerCase());
      });
      setShow(values);
    }
  };

  const loadMoreGnomes = () => {
    if (page == chunkData.length - 1) {
      setHasMore(false);
      setPage(chunkData.length);
    } else {
      let newPage = page + 1;
      setPage(newPage);
      const newValue = [...show, ...chunkData[newPage]];
      setShow([...newValue]);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      searchGnomo();
    }
  };

  const clearSearch = () => {
    setSearch('');
    setShow(habitants);
  };
  return (
    <>
      <Row>
        <Col>
          <div className={styles.searchBar}>
            <Form.Group className='mt-4' controlId='formBasicEmail'>
              <span className={`text-muted ${styles.notesMessage}`}>
                Current Page {page}/{chunkData.length} | per page {size} | Total {habitants.length}
              </span>
              <InputGroup>
                <InputGroup.Text onClick={() => searchGnomo()} className='cursor-pointer'>
                  <FontAwesomeIcon className='text-muted' icon={faSearch} />
                </InputGroup.Text>
                <FormControl
                  type='text'
                  onChange={(e) => onChangeText(e)}
                  onKeyPress={(e) => handleKeyPress(e)}
                  placeholder='Type and press enter...'
                  aria-label='Search'
                  value={search}
                  autoFocus={true}
                />
                <InputGroup.Text onClick={() => clearSearch()} className='cursor-pointer'>
                  <FontAwesomeIcon icon={faTimes} className='text-muted' />
                </InputGroup.Text>
              </InputGroup>
              {loading ? <Spinner animation='grow' variant='dark' /> : ''}
            </Form.Group>
          </div>
        </Col>
      </Row>
      <Row xs={1} md={2} className={`g-4 ${styles.container}`}>
        <InfiniteScroll
          dataLength={show.length * size}
          next={loadMoreGnomes}
          hasMore={hasMore}
          loader={null}
          className={styles.infiniteScroll}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <strong>{`You have seen all Brastlewark's habitands`}</strong>
            </p>
          }
          refreshFunction={() => {}}
        >
          <Col className={styles.gnomoContainer}>
            {show.map((gnomo: IGnomo) => {
              return <Gnomo key={gnomo.id} {...gnomo} />;
            })}
          </Col>
        </InfiniteScroll>
      </Row>
    </>
  );
};

export default Gnomos;

const chunk = (json: any, size: number) => {
  let result = [];
  while (json.length) {
    result.push(json.splice(0, size));
  }

  return result;
};
