# Working with Collections
A collection in Estuary can be thought of as a bucket of CIDs put together. Collections are used to organize files and other types of data uploaded to Estuary. There is no restriction about the type of data that can be held in a collection, provided it's pinned on, or in other words, uploaded to Estuary, and that it has a CID.

### Creating a collection
Before being able to use a collection, it needs to be created. Here's how to do it using curl:
```
curl -X POST https://api.estuary.tech/collections/ -d '{ "name": "My super nice new collection", "description": "This collection holds only the best content" }' -H "Content-Type: application/json" -H "Authorization: Bearer REPLACE_ME_WITH_API_KEY"
```
**Obs:** If you're running your own Estuary node, you will need to change **https://api.estuary.tech** to your own address such as **https://localhost:3004**

Upon success, Estuary returns the created collection:
```
{
  "createdAt": "2022-02-23T16:20:50.518337618-03:00",
  "uuid": "28d923b5-2561-43ee-8ab3-fb42088666f2",
  "name": "My super nice new collection",
  "description": "this collection holds only the best content",
  "userId": 1
}
```
We're specially interested in the **uuid** field here, which is the unique identifier we will use to add data to that collection in the following section.


### Adding a file to a collection
There are multiple ways to add data to a collection. Here we will explore two endpoints: **/collections/fs/add** and **/content/add-ipfs**.

Let's first add a file (**file1.txt**) to estuary using the **/content/add** endpoint in order to get its contentID:
```
curl -X POST https://upload.estuary.tech/content/add -H "Authorization: Bearer REPLACE_ME_WITH_API_KEY" -H "Accept: application/json" -H "Content-Type: multipart/form-data" -F "data=@/tmp/file1.txt"

{
  "cid": "bafkqadlumvzxi2lom4qgm2lmmufa",
  "estuaryId": 10,
  "providers": [
    "/ip4/192.168.2.107/tcp/6744/p2p/12D3KooWPmL4jXD2y1sgzyyYc36XUoNw1rmLnsg5woPF24vabEVR",
    "/ip4/127.0.0.1/tcp/6744/p2p/12D3KooWPmL4jXD2y1sgzyyYc36XUoNw1rmLnsg5woPF24vabEVR",
    "/ip4/192.168.0.20/tcp/32457/p2p/12D3KooWPmL4jXD2y1sgzyyYc36XUoNw1rmLnsg5woPF24vabEVR"
  ]
}
```
**Obs:** There are two ways files are referenced in estuary: **cids** and **estuaryIDs**. A **cid** is an IPFS hash, this file's cid is **bafkqadlumvzxi2lom4qgm2lmmufa**. This hash is *separate* from a file's **estuaryID** (which can also be called **contentID**, **contID**, **id**, or **requestID**). An **estuaryID** is not a hash, but merely a number. This file's estuaryID is: **10** (your estuaryIDs will likely be several digits longer).

Now that we've obtained our file's estuaryID and cid, we can add it to our collections with either identifier.

#### /content/add-ipfs (adding by cid)
We can use the **/content/add-ipfs** endpoint to add CIDs to estuary and also put them in a collection at the same API call. Using this endpoint we must specify the content by CID (in the **root** field):
```
curl -X POST https://api.estuary.tech/content/add-ipfs -d '{ "filename": "file1.txt", "root": "bafkqadlumvzxi2lom4qgm2lmmufa", "coluuid": "28d923b5-2561-43ee-8ab3-fb42088666f2", "dir": "/test-dir" }' -H "Content-Type: application/json" -H "Authorization: Bearer REPLACE_ME_WITH_API_KEY"
```

Notice we also specified a field **dir**. In the next section we will explore another feature of collections: collection directory paths.

#### /collections/fs/add (adding by estuaryID)
Let's add the same file using its **estuaryID** (which is **10**), using the **/collections/fs/add** endpoint.
```
curl -X POST 'https://api.estuary.tech/collections/fs/add?coluuid=28d923b5-2561-43ee-8ab3-fb42088666f2&content=10&path=/test-dir2' -H 'accept: application/json' -H 'Authorization: Bearer EST9ed28259-a191-45dd-a949-b98bc57eff79ARY'
```
**Obs:** Notice we used the uuid of the collection we created earlier (**28d923b5-2561-43ee-8ab3-fb42088666f2**) to identify the collection we want to upload content to.

### Collection directory paths
Besides having several collections to organize data, users can also further organize content inside collections using directory paths. Directory paths are filesystem-like paths such as **/this/is/a/path/to/a/file**. To create a path, we just need to put a file inside it using the **dir** field. Let's take the example used in the last section:
```
curl -X POST https://api.estuary.tech/content/add-ipfs -d '{ "filename": "file1.txt", "root": "bafkqadlumvzxi2lom4qgm2lmmufa", "coluuid": "28d923b5-2561-43ee-8ab3-fb42088666f2", "dir": "/test-dir" }' -H "Content-Type: application/json" -H "Authorization: Bearer REPLACE_ME_WITH_API_KEY"
```
Since the **dir** for **file1.txt** is **/test-dir/file1.txt**, the path **/test-dir/** inside that collection gets created, and we can list only the contents of that path:
```
curl -X GET -H "Authorization: Bearer REPLACE_ME_WITH_API_KEY" "https://api.estuary.tech/collections/28d923b5-2561-43ee-8ab3-fb42088666f2?dir=/test-dir/"
[
  {
    "name": "file1.txt",
    "type": "directory",
    "size": 20,
    "contId": 10,
    "dir":"/test-dir",
    "cid": "bafkqadlumvzxi2lom4qgm2lmmufa"
    "coluuid":"28d923b5-2561-43ee-8ab3-fb42088666f2"
  }
]
```

### Listing the contents of a collection
In order to list all the contents of a collection, even the ones that don't have a directory path set, we can use the GET method on **/collections/YOUR_COLLECTION_UUID**:

```
curl -X GET -H "Authorization: Bearer REPLACE_ME_WITH_API_KEY" https://api.estuary.tech/collections/28d923b5-2561-43ee-8ab3-fb42088666f2
```

### Deleting a collection
You can use the GET method on the **/collections/** endpoint to view all collections you have created. If you want to delete a previously created collection, you can do so with the following curl:

```
curl -X DELETE  https://api.estuary.tech/collections/<coluuid> -H "Authorization: Bearer REPLACE_ME_WITH_API_KEY"
```

where the query parameter **coluuid** is the uuid of the collection you are trying to delete.



























