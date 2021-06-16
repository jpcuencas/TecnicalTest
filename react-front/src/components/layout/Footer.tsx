import React from 'react';
import '../../scss/stiles.scss';
import '../../scss/layout/footer.scss';



function Footer() {
  return (
      <div className="container">
        <div className="row">
            <nav className="col-12 navbar navbar-light bg-light">
                <div className="container-fluid">
                    <span className="navbar-text">
                        developed by jcuencas.
                    </span>
                </div>
            </nav>
        </div>
      </div>
  );
}

export default Footer;
