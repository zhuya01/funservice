import {graphql, commitMutation} from 'react-relay';

const mutation = graphql`
mutation updateBase_Mutation(
  $annexCreate:[knowledgeFileInput]!,
  $author: String!, 
  $bookName: String!, 
  $userName: String!, 
  $bookType: enumTypeBookType, 
  $content: String) {
  createPoliceKnowledgeBase(
    author: $author, 
    bookName: $bookName, 
    userName: $userName, 
    bookType: $bookType, 
    content: $content, 
    annexCreate:$annexCreate
    ) {
    author
    bookName
    bookType
    content
    createdAt
    deletedAt
    id
    updatedAt
    annexCreate {
      name
      url
    }
  }
}
`;

export default function updateBase(
    id,
    formInfo,
    environment,
    onCompleted,
    onError,
) {
    return commitMutation(environment, {
            mutation,
            onCompleted: onCompleted,
            onError: onError,
            variables: {
              "annexCreate":formInfo.annexCreate,
              "author":formInfo.author,
              "bookName":formInfo.bookName,
              "userName":formInfo.userName,
              "bookType":formInfo.bookType,
              "contnet":formInfo.contnet
            },
        }
    );
}

