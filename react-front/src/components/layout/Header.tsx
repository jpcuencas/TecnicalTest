import React from 'react';
import { createUseStyles } from 'react-jss';

const styles = createUseStyles({
    headerTitle: {
    background:'orange',
    color:'White',
    borderRadius:10,
    textAlign: 'center',
    },
});

function Header() {
    const classes = styles();
  return (
    <>
    <div className={classes.headerTitle}>
        <h2>Test Lansweeper</h2>
    </div>
    </>
  );
}

export default Header;
