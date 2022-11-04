import styles from '@pages/Page.module.scss';

import * as React from 'react';

import App from '@components/App';

// %method:get%
const endpoint = '/content/stats';
const markdown = `# ➟ ` + endpoint + `

Use this endpoint to list all of the data you have pinned to Estuary.

### Swagger
For more information about this API swagger specification, see [here](swagger-ui-page#/content/get_content_stats)

### This page is a work in progress

We will be adding more code examples and more details over time. Thanks for bearing with us and our team! If you have ideas, write us some [feedback](https://docs.estuary.tech/feedback).
`;

const code = `class Example extends React.Component {
  componentDidMount() {
    fetch('https://api.estuary.tech/content/stats?limit=LIMIT&offset=OFFSET', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer REPLACE_ME_WITH_API_KEY',
      },

    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ ...data });
      });
  }

  render() {
    return <pre>{JSON.stringify(this.state, null, 1)}</pre>;
  }
}`;

const curl =
  'curl -X GET -H "Authorization: Bearer REPLACE_ME_WITH_API_KEY" https://api.estuary.tech/content/stats';

function APIContentStats(props) {
  return (
    <App
      title="Estuary Documentation: API: /content/stats"
      description="https://api.estuary.tech/content/stats"
      url="https://docs.estuary.tech/api-content-stats"
      active="api-content-stats"
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

export default APIContentStats;
