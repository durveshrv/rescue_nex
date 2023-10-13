import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatlog from './Chatlog';

export default function CardExample()  {
  return (
    <>
    <Navbar></Navbar>
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
        <a href="#" className="card-link"></a>
          <div className="card">
            <img  src={`https://source.unsplash.com/random/300×300/?$New York City`} className="card-img-top" alt="Card 1" style={{ height: '200px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">Card 1</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
        <a href="#" className="card-link"></a>
          <div className="card">
            <img src={`https://source.unsplash.com/random/300×300/?$Miami`} className="card-img-top" alt="Card 2" style={{ height: '200px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">Card 2</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
        <a href="#" className="card-link"></a>
          <div className="card">
            <img src={`https://source.unsplash.com/random/300×300/?$Denver`} className="card-img-top" alt="Card 3" style={{ height: '200px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">Card 3</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
        <a href="#" className="card-link"></a>
          <div className="card">
            <img src={`https://source.unsplash.com/random/300×300/?$Chicago`} className="card-img-top" alt="Card 4" style={{ height: '200px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">Card 4</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
        <a href="#" className="card-link"></a>
          <div className="card">
            <img src={`https://source.unsplash.com/random/300×300/?$Seattle`} className="card-img-top" alt="Card 5" style={{ height: '200px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">Card 5</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
        <a href="#" className="card-link"></a>
          <div className="card">
            <img src={`https://source.unsplash.com/random/300×300/?$San Francisco`} className="card-img-top" alt="Card 6" style={{ height: '200px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">Card 6</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
        <a href="#" className="card-link"></a>
          <div className="card">
            <img src={`https://source.unsplash.com/random/300×300/?$france`} className="card-img-top" alt="Card 7" style={{ height: '200px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">Card 7</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
        <a href="#" className="card-link"></a>
          <div className="card">
            <img src={`https://source.unsplash.com/random/300×300/?$norway`} className="card-img-top" alt="Card 8" style={{ height: '200px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">Card 8</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
        <a href="#" className="card-link"></a>
          <div className="card">
            <img src={`https://source.unsplash.com/random/300×300/?$mumbai`} className="card-img-top" alt="Card 9" style={{ height: '200px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">Card 9</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div></div></div></div></div><Chatlog/><Footer></Footer></>)}

