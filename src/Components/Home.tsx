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
          <h1 className='homeTitle'>Secure Account Management</h1>
          <p className='homeParagraph'>
            Manage your finances with industry-leading encryption and multi-factor authentication. Access your accounts 24/7 with real-time balance updates and transaction monitoring.
          </p>
        </div>
        <div className='homeContentContainer'>
          <h1 className='homeTitle'>Seamless Transfers & Payments</h1>
          <p className='homeParagraph'>
            Send money domestically and internationally with competitive rates. Schedule recurring transfers, pay bills directly from your account, and track every transaction.
          </p>
        </div>
        <div className='homeContentContainer'>
          <h1 className='homeTitle'>Financial Planning Tools</h1>
          <p className='homeParagraph'>
            Optimize your savings with personalized budgeting tools, investment insights, and wealth management advisors. Set financial goals and monitor progress in real-time.
          </p>
        </div>
      </div>

      <h1 style={{ borderBottom: "2px solid white" }}>Bussiness partners</h1>
      <div id='homeFeaturesContainer'>
        <div className='homeContentContainer' >
          <h1 className='homeTitle'>Enterprise-Grade Security</h1>
          <p className='homeParagraph'>
            Protect your business assets with advanced fraud detection, compliance monitoring, and dedicated security protocols. Meet regulatory requirements with ease.
          </p>
        </div>
        <div className='homeContentContainer'>
          <h1 className='homeTitle'>Scalable Payment Solutions</h1>
          <p className='homeParagraph'>
            Accept payments from clients worldwide with integrated payment processing. Reduce transaction costs and streamline your accounting workflow with automated reconciliation.
          </p>
        </div>
        <div className='homeContentContainer'>
          <h1 className='homeTitle'>Treasury Management</h1>
          <p className='homeParagraph'>
            Optimize cash flow with liquidity management tools, payroll automation, and corporate credit facilities designed for growing businesses.
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
              <li>Trusted by over 50,000+ clients across the DC region</li><br />
              <li>Average customer satisfaction rating of 4.8/5 stars</li><br />
              <li>FDIC insured deposits up to $250,000</li><br />
              <li>Expert financial advisors with 20+ years experience</li>
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
    <Footer />
  </>
  )
}

export default Home