import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ShortenerPage from "../../src/ShortenerPage"
import StatsPage from ""

export default function App() {
  return (
    <BrowserRouter>
    <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
      <a href="/" style={{ margin: "0 10px" }}>Shortener</a>
      <a href="/stats" style={{ margin: "0 10px" }}>Stats</a>
    </nav>
      <Switch>
        <Route exact path="/" component={ShortenerPage} />
        <Route path="/stats" component={StatsPage} />
      </Switch>
    </BrowserRouter>
  );
}