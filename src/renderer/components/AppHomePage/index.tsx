import * as React from "react";
import { Link } from "react-router-dom";

import * as styles from "../../../shared/components/HomePage/styles.scss";

class AppHomePage extends React.Component {
  public render() {
    return (
      <div className={styles.container}>
        <h2>Home</h2>
        <ol>
          <li><Link to="/counter">Counter</Link></li>
          <li><Link to="/webview">WebView (conventional web page in WebView)</Link></li>
          <li><Link to="/hybrid">Hybrid App (electron-enabled page in WebView)</Link></li>
        </ol>
      </div>
    );
  }
}

export { AppHomePage };
