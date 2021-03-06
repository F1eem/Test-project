import React, { useEffect } from "react";
import { Content } from "./components/content";
import Header from "./components/common/Header";
import { connect } from "react-redux";
import { initializeApp } from "redux/appReduser";
import { Preloader } from "./components/common/Preloader";

const App = ({ initialized, initializeApp }) => {
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <>
      {!initialized ? (
        <Preloader />
      ) : (
        <>
          <Header />
          <Content />
        </>
      )}
    </>
  );
};
const mapStateToProps = ({ app }) => ({
  initialized: app.initialized,
});

export default connect(mapStateToProps, { initializeApp })(App);
