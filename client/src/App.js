import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CodeEditorIndex from './components/code-editor/CodeEditorIndex';
import styles from './App.module.css';

const App = () => {
  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          <Route exact path='/ide' component={CodeEditorIndex} />
          <Route exact path='/' component={CodeEditorIndex} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
