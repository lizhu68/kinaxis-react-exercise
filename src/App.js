import Locations from "./components/Locations";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Reserves from "./components/Reserves";
import NotFound from "./NotFound";
import LocationDetails from "./components/LocationDetails";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/locations/:id" component={LocationDetails} />
          <Route path="/reserves" component={Reserves} />
          <Route path="/locations" exact component={Locations} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
