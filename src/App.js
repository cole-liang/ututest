import React, { Component } from "react";
import Dashboard from "./components/dashboard/dashboard.component";
import Header from "./components/common/header/header.component";
import Footer from "./components/common/footer/footer.component";
import "./sass/main.scss";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Dashboard />
        <Footer />
      </>
    );
  }
}

export default App;
