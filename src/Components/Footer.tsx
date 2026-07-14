import './Footer.css'

function Footer() {
  return (
    <div id='footerContainer'>
      <p id="aboutMe">
        Made by: roltzs
      </p>

      <div id="linksContainer">
        <a href='https://www.linkedin.com/in/roland-piperal-932a4a347/' target='_blank'><h2 className='footerLink'>LinkedIn</h2></a>
        <a href='https://github.com/ragnardgreat' target='_blank'><h2 className='footerLink'>GitHub</h2></a>
      </div>

      <p id="footerMain">
        This is not a real page<br />
        This is a fan page based on the videogame "Payday 2"<br />in no way is this page officially connected to any of the games or media created by Starbreeze and Overkill.<br /><br />
        This page was made to showcase my knowledge and skills with TypeScript and Java
      </p>
    </div>
  )
}

export default Footer