import React, { Suspense } from 'react';
import{ Redirect, Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const AddQuote = React.lazy(() => import("./pages/AddQuote"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Quotes = React.lazy(() => import("./pages/Quotes"));

function App() {
  return (
    <Suspense fallback={<div className="centered"> <LoadingSpinner/> </div>}>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes"/>
          </Route>
          <Route path="/quotes" exact>
            <Quotes/>
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail/>
          </Route>
          <Route path="/add-quote" exact>
            <AddQuote/>
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </Layout>
      </Suspense>
  );
}

export default App;
