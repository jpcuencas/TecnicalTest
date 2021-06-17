import React from 'react';
import '../../scss/styles.scss';
import '../../scss/layout/footer.scss';
import { createUseStyles } from 'react-jss';

const styles = createUseStyles({
    developText: {
    color:'black',
    borderRadius:10
    },
});

function Footer() {
    const classes = styles();
  return (
      <div className="container">
        <div className="row">
            <nav className="col-12 navbar navbar-light bg-light">
                <div className="container-fluid">
                    <span className="navbar-text">
                    <i className="fas fa-code-branch"></i> <span className={classes.developText}>developed by jcuencas.</span>
                    </span>
                </div>
            </nav>
        </div>
      </div>
  );
}

export default Footer;
