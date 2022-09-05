import styles from '@pages/Page.module.scss';

import * as React from 'react';

import App from '@components/App';

const name = '"A new collection"';
const description = '"A new collection test"';

const endpoint = '/collections/create';
const markdown = `# ➟ ` + endpoint + `

Use this endpoint to create a collection where you can add data to it.

### Swagger
For more information about this API swagger specification, see [here](swagger-ui-page#/collections/post_collections_create)

### This page is a work in progress

A collection is used to store a set of files or 'directory' of data in the Filecoin network. This can be used for bulk 'directory' uploads from a typical hierarchical files system. 

To add files to this collection or 'directory' (which are pinned as child of the CID created for this collection), use the Add Content POST API call.`;

const code = `class Example extends React.Component {
              componentDidMount() {
                fetch('https://api.estuary.tech/collections/create', {
                  method: 'POST',
                  headers: {
                    Authorization: 'Bearer REPLACE_ME_WITH_API_KEY',
                  },
                  body: JSON.stringify({
body: 'BODY',
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

const curl = `curl -X POST https://api.estuary.tech/collections/create -H "Authorization: Bearer REPLACE_ME_WITH_API_KEY" -H "Accept: application/json" -d '{"body": "BODY"}'`;

function APICollectionCreate(props) {
  return (
    <App
      title="Estuary Documentation: API: /collections/create"
      description="https://api.estuary.tech/collections/create"
      url="https://docs.estuary.tech/collections-create"
      active="api-collections-create"
      curl={curl}
      markdown={markdown}
      code={code}
    />
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default APICollectionCreate;
