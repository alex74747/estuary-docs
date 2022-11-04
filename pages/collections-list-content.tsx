import styles from '@pages/Page.module.scss';

import * as React from 'react';

import App from '@components/App';

const COLLECTION_ID = `845c2920-0201-416f-86f9-c7da7b859707`;

// %method:get%
const endpoint = '/collections/{coluuid}';
const markdown =
  `# ➟ ` +
  endpoint +
  `

Use this endpoint to get the contents of a specific collection. If you do not use the path parameter, you will get **all** the contents regardless of directory

### ?dir=/YOUR_COLLECTION_DIRECTORY

Use this (optional) query parameter to only view the contents in a specific collection directory.

### Swagger
For more information about this API swagger specification, see [here](swagger-ui-page#/collections/get_collections_content__coluuid_)

### This page is a work in progress

We will be adding more code examples and more details over time. Thanks for bearing with us and our team! If you have ideas, write us some [feedback](https://docs.estuary.tech/feedback).
`;

const code = `class Example extends React.Component {
  componentDidMount() {
    fetch('https://api.estuary.tech/collections/REPLACE_WITH_COLUUID?dir=/REPLACE_WITH_DIRECTORY/', {
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

const curl = `curl -X GET -H "Authorization: Bearer REPLACE_ME_WITH_API_KEY" https://api.estuary.tech/collections/REPLACE_ME_WITH_YOUR_COLUUID?dir=/REPLACE_ME_WITH_COLLECTION_PATH`;
function APICollectionsListContent(props) {
  return (
    <App
      title="Estuary Documentation: API: /collections/{coluuid}?dir=PATH"
      description="https://api.estuary.tech/collections/{coluuid}?dir=PATH"
      url="https://docs.estuary.tech/api-collections-list-content"
      active="api-collections-content-by-id"
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

export default APICollectionsListContent;
