import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Carou from '../components/Carou';
import Age_info from '../components/age_info';
import Experience from '../components/Experience';
import Alertx from '../components/Alertx';
import { useState } from 'react';
export default function Home() {
  return (
    <>
      <section>
        <div>
          <Carou
            id="carousel1"
            first="horrifying-flood"
            second="horrifying-earthquake"
            third="horrifying-tsunami"
            floatDirection="left" title="Natural Disasters"
          />
        </div>
        <div>
          <Carou
            id="carousel2"
            first="covid19"
            second="nuclear gas emission"
            third="building collapse"
            floatDirection="right" title="Man-made Disasters"
          />
        </div>
      </section>
      
      <div>
        <Age_info />
      </div>
      <div style={{backgroundColor:'#99FFFF'}}><Experience/></div>
      <Footer/>
    </>
  );
}
