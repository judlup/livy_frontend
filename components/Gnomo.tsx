import React, { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { IGnomo } from './IGnomo';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { faBriefcase, faUserFriends, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/Gnomo.module.scss';
import GnomoDetails from './GnomoDetails';

const Gnomo = (gnomo: IGnomo) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <GnomoDetails
        gnomo={gnomo}
        show={showModal}
        handleClose={() => {
          handleClose();
        }}
      />
      <Card
        className={`text-dark mt-3 border-0 ${styles.container}`}
        style={{ backgroundColor: gnomo.hair_color === 'Pink' ? 'rgba(240, 180, 229, 0.2)' : 'rgba(180, 212, 240, 0.2)', padding: '10px' }}
      >
        <Card.Title className='d-flex'>
          <div className={styles.titleLeft}>
            <LazyLoadImage src={gnomo.thumbnail} alt={gnomo.name} width='40' height='40' effect='blur' style={{ borderRadius: '50%', marginRight: '5px' }} />
            {gnomo.name}
            <small className='text-muted'>({gnomo.age})</small>
          </div>
          <div className={styles.titleRight}>
            <Button variant='outline-secondary float-right' size='sm' onClick={handleShow}>
              <FontAwesomeIcon className='text-muted' icon={faEye} /> Details
            </Button>
          </div>
        </Card.Title>
        <Container>
          <Row>
            <hr />
            <Row>
              <Col className='text-center'>
                <div>
                  <strong className='text-muted'>
                    <FontAwesomeIcon icon={faBriefcase} /> Professions ({gnomo.professions.length}){' '}
                  </strong>
                  <Card.Text>
                    {gnomo.professions.map((profession) => {
                      return (
                        <span key={profession} className={styles.badge} style={{ backgroundColor: gnomo.hair_color === 'Pink' ? 'rgba(240, 180, 229, 0.3)' : 'rgba(180, 212, 240, 0.3)' }}>
                          {profession}
                        </span>
                      );
                    })}
                  </Card.Text>
                </div>
              </Col>
              <Col>
                {gnomo.friends.length > 0 ? (
                  <Row className='mt-3'>
                    <Col className='text-center'>
                      <div>
                        <strong className='text-muted'>
                          <FontAwesomeIcon icon={faUserFriends} /> Friends: ({gnomo.friends.length})
                        </strong>
                        <Card.Text>
                          {gnomo.friends.map((friend) => {
                            return (
                              <span key={friend} className={styles.badge} style={{ backgroundColor: gnomo.hair_color === 'Pink' ? 'rgba(240, 180, 229, 0.3)' : 'rgba(180, 212, 240, 0.3)' }}>
                                {friend}
                              </span>
                            );
                          })}
                        </Card.Text>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <div className='text-center'>
                    <strong className='text-muted'>
                      <FontAwesomeIcon icon={faUserFriends} /> No friends
                    </strong>
                  </div>
                )}
              </Col>
            </Row>
          </Row>
        </Container>
      </Card>
    </>
  );
};

export default Gnomo;
