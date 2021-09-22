import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Form from "./components/Form";
import List from "./components/List";

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/book/:id/edit' component={Form} />
          <Route path='/book/new' component={Form} />
          <Route path='/books' component={List} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
