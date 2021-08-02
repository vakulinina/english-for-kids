import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header';
import Main from './main';
import GameField from './game-field';
import FinalPage from './final-page';
import Statistics from './statistics';
import Footer from './footer';
import { getCategories } from '../api/api';
import Category from '../models/category';
import AdminCategories from './admin-categories';
import AdminHeader from './admin-header';
import AdminWords from './admin-words';

const App: React.FunctionComponent = () => {
  const [isGameMode, setIsGameMode] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [categories, setCategories] = useState([] as Category[]);
  const [shouldUpdate, setShouldUpdate] = useState({});

  useEffect(() => {
    getCategories(1).then((data) => setCategories(data));
  }, [shouldUpdate]);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/admin">
            <AdminHeader />
            <Switch>
              <Route path="/admin/:category/words">
                <AdminWords />
              </Route>
              <Route path="/admin">
                <AdminCategories
                  categories={categories}
                  onUpdateCategories={() => setShouldUpdate({})}
                  shouldUpdate={shouldUpdate}
                />
              </Route>
            </Switch>
            <Footer />
          </Route>
          <Route>
            <Header
              handleChange={() => setIsGameMode(!isGameMode)}
              isGameMode={isGameMode}
              categories={categories}
            />
            <Switch>
              <Route path="/statistics" component={Statistics} />
              <Route path="/final-page">
                <FinalPage mistakes={mistakes} />
              </Route>
              <Route path="/:category">
                <GameField
                  isGameMode={isGameMode}
                  countMistakes={setMistakes}
                />
              </Route>
              <Route path="/">
                <Main isGameMode={isGameMode} categories={categories} />
              </Route>
            </Switch>
            <Footer />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
