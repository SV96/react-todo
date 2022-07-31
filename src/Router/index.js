import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import appRouting from "../constants/routingConstants";

const AppRouter = () => {
  useEffect(() => {
    document.body.style.background = "#e6e6e6";
  }, []);

  return (
    <>
      <div>
        <Router>
          <Switch>
            {Object.entries(appRouting).map(([key, value]) => {
              return (
                <Route exact={value.exact} path={value.path} key={key}>
                  {value.components}
                </Route>
              );
            })}
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default AppRouter;
