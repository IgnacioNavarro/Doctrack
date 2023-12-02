import React from "react";
import { MDBFooter } from 'mdb-react-ui-kit';

const Footer = () => {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted' id="Contact">
      <section className=''>
        <div className='container text-center text-md-start mt-5 footerModifications'>
          <div className='row mt-3'>
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <i className='fas fa-gem me-3'></i>Doctrack
              </h6>
              <p>
                Easiest way to track your documents through the blockchain. Based on Solidity, developed by Ignacio Navarro.
              </p>
            </div>


            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#' className='text-reset'>
                  Landing Page
                </a>
              </p>
              <p>
                <a href='/doctrack' className='text-reset'>
                  Doctrack for users
                </a>
              </p>
              <p>
                <a href='/enterprise' className='text-reset'>
                  DocTrack for enterprises
                </a>
              </p>
            </div>

            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <i className='fas fa-home me-3'></i> Reina Mercedes, Sevilla
              </p>
              <p>
                <i className='fas fa-envelope me-3'></i>
                inavarroblazquez@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </MDBFooter>
  );
}

export default Footer;