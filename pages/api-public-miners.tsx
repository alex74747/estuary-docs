import styles from '@pages/Page.module.scss';

import * as React from 'react';

import App from '@components/App';

// %method:get%
const endpoint = '/public/miners';
const markdown = `# ➟ ` + endpoint + `

Use this endpoint to get all the Miners we work with. This endpoint does not require an API key.

### Swagger
For more information about this API swagger specification, see [here](swagger-ui-page#/public/get_public_miners)

### This page is a work in progress

We will be adding more code examples and more details over time. Thanks for bearing with us and our team! If you have ideas, write us some [feedback](https://docs.estuary.tech/feedback).
`;

const code = `class Example extends React.Component {
  componentDidMount() {
    fetch('https://api.estuary.tech/public/miners', {
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

const curl = 'curl -X GET https://api.estuary.tech/public/miners';

function APIPublicMiners(props) {
  return (
    <App
      title="Estuary Documentation: API: /public/miners"
      description="https://api.estuary.tech/public/miners"
      url="https://docs.estuary.tech/api-public-miners"
      active="api-public-miners"
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

export default APIPublicMiners;
