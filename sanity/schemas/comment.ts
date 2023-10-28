
export default {
  name: 'comment',
  title: 'comment',
  type: 'document',
  fields: [
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string',
    },
    {
      name: 'tweet',
      title: 'Tweet',
      description: 'Refrence the Tweet the comment is assosiated to:',
      type: 'reference',
      to: {
        type: 'tweet'
          }
    }
  ] 
}
    
    
