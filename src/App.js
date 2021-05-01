import React, { Component } from 'react';
import { connect } from "react-redux";


class App extends Component {


  render() {

    return (
      <section className="game">
        <header className="game-header">
          <h1 className="game-title">Challenge Minesweeper</h1>
        </header>       
      </section>
    );
  }
}

App.propTypes = {
  
}

const mapStateToProps = () => ({
  
})

const mapDispatchToProps = () => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(App)
