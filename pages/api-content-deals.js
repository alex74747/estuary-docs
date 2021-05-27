import styles from "~/pages/Page.module.scss";

import * as React from "react";

import App from "~/components/App";

const markdown = `# WIP

This page has not been completed yet.
`;
const code = null;
const curl = null;

function APIContentDeals(props) {
  return (
    <App
      title="Estuary Documentation: API: /content/deals"
      description="https://api.estuary.tech/content/deals"
      url="https://docs.estuary.tech/api-content-deals"
      curl={curl}
      markdown={markdown}
      code={code}
    ></App>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default APIContentDeals;
