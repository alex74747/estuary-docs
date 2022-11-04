import styles from '@pages/Page.module.scss';

import * as React from 'react';

import App from '@components/App';

// %method:post%
const endpoint = '/deals/make/{miner}';
const markdown = `# ➟ ` + endpoint + `

Use this endpoint to make a deal with a storage provider and a file you have already uploaded to Estuary. You will need the local ID of that file.

*miner* is the address of the storage provider you want to make a deal with.

### Swagger
For more information about this API swagger specification, see [here](swagger-ui-page#/deals/post_deals_make__miner_)


### This page is a work in progress

We will be adding more code examples and more details over time. Thanks for bearing with us and our team! If you have ideas, write us some [feedback](https://docs.estuary.tech/feedback).
`;

const code = `class Example extends React.Component {
              componentDidMount() {
                fetch('https://api.estuary.tech/deals/make/{miner}', {
                  method: 'POST',
                  headers: {
                    Authorization: 'Bearer REPLACE_ME_WITH_API_KEY',
                  },
                  body: JSON.stringify({
dealRequest: 'DEALREQUEST',
})
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

const curl = `curl -X POST https://api.estuary.tech/deals/make/{miner} -H "Authorization: Bearer REPLACE_ME_WITH_API_KEY" -H "Accept: application/json" -d '{"dealRequest": "DEALREQUEST"}'`;

function APIMakeDealWithProvider(props) {
  return (
    <App
      title="Estuary Documentation: API: /deals/make/:miner"
      description="https://api.estuary.tech/deals/make/:miner"
      url="https://docs.estuary.tech/api-make-deal-with-provider"
      active="api-make-deal-with-provider"
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

export default APIMakeDealWithProvider;
