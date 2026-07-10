import React from 'react'
import "./Home.css"
import Footer from './Footer'

function Home() {
  return (<>
    <div id='homeImgContainer'>
      <img id='homeImg' src='outside.jpg'></img>
      <h1 id='homeImgTxt'>Where your dreams and money are safe</h1>
    </div>

    <div id='homeContainer' className='pageContainer'>
      <h1 style={{ borderBottom: "2px solid white" }}>Private users</h1>
      <div id='homeFeaturesContainer'>
        <div className='homeContentContainer' >
          <h1 className='homeTitle'>Feature 1</h1>
          <p className='homeParagraph'>
            This is the area for the feature 1 text which describes the first feature
          </p>
        </div>
        <div className='homeContentContainer'>
          <h1 className='homeTitle'>Feature 2</h1>
          <p className='homeParagraph'>
            This is the area for the feature 2 text which describes the second feature
          </p>
        </div>
        <div className='homeContentContainer'>
          <h1 className='homeTitle'>Feature 3</h1>
          <p className='homeParagraph'>
            This is the area for the feature 3 text which describes the second feature
          </p>
        </div>
      </div>

      <h1 style={{ borderBottom: "2px solid white" }}>Bussiness partners</h1>
      <div id='homeFeaturesContainer'>
        <div className='homeContentContainer' >
          <h1 className='homeTitle'>Feature 1</h1>
          <p className='homeParagraph'>
            This is the area for the feature 1 text which describes the first feature
          </p>
        </div>
        <div className='homeContentContainer'>
          <h1 className='homeTitle'>Feature 2</h1>
          <p className='homeParagraph'>
            This is the area for the feature 2 text which describes the second feature
          </p>
        </div>
        <div className='homeContentContainer'>
          <h1 className='homeTitle'>Feature 3</h1>
          <p className='homeParagraph'>
            This is the area for the feature 3 text which describes the second feature
          </p>
        </div>
      </div>

      <h1 style={{ borderBottom: "2px solid white" }}>Counceling from our professionals</h1>

      <div id='councelingContainer'>
        <div className='councelingItem'>
          <div className='councelingImgContainer'>
            <img className='councelingImg' src='whitebglogo.jpg'></img>
          </div>
          <div className='councelingTxt'>
            <h1 className='councelingTitle'>Why Choose Us?</h1>
            <ul>
              <li>One of the safest banks in the Washington D.C area</li><br />
              <li>High quality banking and help</li><br />
              <li>No break ins in the past 2 weeks!</li><br />
              <li>24/7 support</li>
            </ul>
          </div>
        </div>
        <div className='councelingItem'>
          <div className='councelingTxt'>
            <h1 className='councelingTitle'>Investment Help</h1>
            <p>
              Get Investment help from the industry proffesionals and trained workers.<br />
              From investment help to taxes, YOU make the choices here, and We are here to help!<br />
            </p>
            <button id='hirePro'>Hire a proffesional</button>
          </div>
          <div className='councelingImgContainer'>
            <img className='councelingImg' src='counceling.webp'></img>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </>
  )
}

export default Home