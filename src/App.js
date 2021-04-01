import './App.css';
import React from "react"
import { Route, Switch, withRouter } from "react-router-dom"
import { bindActionCreators, compose } from "redux"
import { connect } from "react-redux"
import LandingPage from "./pages/LandingPage"
import { AddPersons } from './pages/AddPersons';


function App(props) {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/addPerson" component={AddPersons} />
      </Switch>


    </div>
  );
}

const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App)


