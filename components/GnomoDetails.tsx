import React from 'react';
import { Card, Col, Container, Row, Modal, Button } from 'react-bootstrap';
import { IGnomoDetailsProps } from './IGnomo';
import { faWeight, faTextHeight, faBriefcase, faUserFriends, faPastafarianism } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GnomoDetails = ({ show, handleClose, gnomo }: IGnomoDetailsProps) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-muted'>
            <FontAwesomeIcon icon={faPastafarianism} /> {gnomo.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col className='text-center'>
                <Card.Text>
                  <strong className='text-muted'>
                    <FontAwesomeIcon icon={faTextHeight} /> Height
                  </strong>
                  <span className='text-muted'>{gnomo.height}</span>
                </Card.Text>
              </Col>
              <Col className='text-center'>
                <Card.Text>
                  <strong className='text-muted'>
                    <FontAwesomeIcon icon={faWeight} /> Weight
                  </strong>
                  <span className='text-muted'>{gnomo.weight}</span>
                </Card.Text>
              </Col>
              <hr />
              {gnomo.friends.length > 0 && (
                <Row className='mt-3'>
                  <Col className='text-center'>
                    <div>
                      <strong className='text-muted'>
                        <FontAwesomeIcon icon={faUserFriends} /> Friends: ({gnomo.friends.length})
                      </strong>
                      <Card.Text>
                        {gnomo.friends.map((friend) => {
                          return (
                            <span
                              key={friend}
                              style={{
                                padding: '2px',
                                backgroundColor: '#eeeeee',
                                color: '#333333',
                                borderRadius: '7px',
                                fontSize: '10px',
                                marginRight: '6px',
                              }}
                            >
                              {friend}
                            </span>
                          );
                        })}
                      </Card.Text>
                    </div>
                  </Col>
                </Row>
              )}
              <Row className='mt-4'>
                <Col className='text-center'>
                  <div>
                    <strong className='text-muted'>
                      <FontAwesomeIcon icon={faBriefcase} /> Professions ({gnomo.professions.length}){' '}
                    </strong>
                    <Card.Text>
                      {gnomo.professions.map((profession) => {
                        return (
                          <span
                            key={profession}
                            style={{
                              padding: '2px',
                              backgroundColor: '#eeeeee',
                              color: '#333333',
                              borderRadius: '7px',
                              fontSize: '10px',
                              marginRight: '6px',
                            }}
                          >
                            {profession}
                          </span>
                        );
                      })}
                    </Card.Text>
                  </div>
                </Col>
              </Row>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GnomoDetails;
