import styles from '@pages/Page.module.scss';

import * as React from 'react';

import App from '@components/App';

// %method:get%
const endpoint = '/collections/';
const markdown =
  `# ➟ ` +
  endpoint +
  `

Use the GET method on this endpoint to get the list of all collections you have made

### Swagger
For more information about this API swagger specification, see [here](swagger-ui-page#/collections/get_collections_list)

### This page is a work in progress

We will be adding more code examples and more details over time. Thanks for bearing with us and our team! If you have ideas, write us some [feedback](https://docs.estuary.tech/feedback).
`;

const code = `class Example extends React.Component {
  componentDidMount() {
    fetch('https://api.estuary.tech/collections/', {
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
  'curl -X GET -H "Authorization: Bearer REPLACE_ME_WITH_API_KEY" https://api.estuary.tech/collections/';

function APICollectionsList(props) {
  return (
    <App
      title="Estuary Documentation: API: /collections/"
      description="https://api.estuary.tech/collections/"
      url="https://docs.estuary.tech/api-collections-list"
      active="api-collections-list"
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

export default APICollectionsList;
