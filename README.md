# people-powApi-v5
Upgrades from the existing api-gateway(api-4)

Lastest updates on the api and structure of People's pow org


#### Sharing
The share carries id and name of the item it shared on the author schema

the item shared cares the the id of the author


#### Commenting 
The item carries a comment array
having a structure as
 `
  authorId,
  authorName,
  body,
  id,
  like

`

Post {
  creator{

  }
  like: {
    author{

    }
  }
  commet{
    author
  }
}
