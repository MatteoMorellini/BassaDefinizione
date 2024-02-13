const Footer = () => {
  return (
    <footer className="page-footer font-small special-color-dark pt-4">
      <div className="container">
        <ul className="list-unstyled list-inline text-center">
          <li className="list-inline-item">
            <a
              href="https://www.facebook.com/profile.php?id=100010848486989"
              className="btn-floating fa-lg fa-2x">
              <i className="fa-brands fa-facebook-f">Facebook</i>
            </a>
          </li>
          <li className="list-inline-item">
            <a
              href="https://www.instagram.com/matteo.mrl"
              className="btn-floating fa-lg fa-2x">
              <i className="fa-brands fa-instagram">Instagram</i>
            </a>
          </li>
          <li className="list-inline-item">
            <a
              href="https://www.linkedin.com/in/matteo-morellini-306a331a8/"
              className="btn-floating fa-lg fa-2x">
              <i className="fa-brands fa-linkedin">Linkedin</i>
            </a>
          </li>
          <li className="list-inline-item">
            <a
              href="https://github.com/MatteoMorellini"
              className="btn-floating fa-lg fa-2x">
              <i className="fa-brands fa-github">Github</i>
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-copyright text-center py-3">
        Created with passion by Matteo Morellini.
      </div>
    </footer>
  )
}

export default Footer
