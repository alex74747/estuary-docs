import styles from '@pages/Page.module.scss';

import * as React from 'react';

import App from '@components/App';

const endpoint = '/public/miners/failures/{miner}';
const markdown = `# ➟ ` + endpoint + `

Use this endpoint to get all of the failure logs for a specific miner. This endpoint does not require an API key.

### Swagger
For more information about this API swagger specification, see [here](swagger-ui-page#/content/get_public_miners_failures__miner_)

### This page is a work in progress

We will be adding more code examples and more details over time. Thanks for bearing with us and our team! If you have ideas, write us some [feedback](https://docs.estuary.tech/feedback).
`;

const code = `class Example extends React.Component {
              componentDidMount() {
                fetch('https://api.estuary.tech/public/miners/failures/{miner}?miner=MINER', {
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

const curl = 'curl -X GET https://api.estuary.tech/public/miners/failures/f02387';

function APIPublicMinerFailures(props) {
  return (
    <App
      title="Estuary Documentation: API: /public/miners/failures"
      description="https://api.estuary.tech/public/miners/failures:miner"
      url="https://docs.estuary.tech/api-public-miners-failures"
      active="api-public-miners-failures"
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

export default APIPublicMinerFailures;
