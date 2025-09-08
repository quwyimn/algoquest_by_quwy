import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import './App.css';
import GameMap from './components/GameMap';
import StageDetail from './components/StageDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>AlgoQuest: Chuyến Phiêu Lưu Giải Thuật</h1>
        </header>
        <main>
          <Switch> 
            <Route path="/stage/:stageId">
              <StageDetail />
            </Route>
            <Route exact path="/">
              <GameMap />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;