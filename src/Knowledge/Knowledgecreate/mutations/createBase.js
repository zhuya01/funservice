import {graphql, commitMutation} from 'react-relay';

const mutation = graphql`
mutation createBase_Mutation(
  $annexCreate:[knowledgeFileInput]!,
  $content: String,
  $title: String!,
  $createTime:DateTime
) {
  viewer {
    id
    username
    user {
      ... on Employee {
        id
        name
      }
    }
  }
  createPoliceKnowledgeBase(
    annexCreate:$annexCreate, 
    title:$title, 
    content:$content, 
    createTime:$createTime) {
    content
    createdAt
    id
    title
  }
}

`

export default function createBase(
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
                "title":formInfo.title,
                "content":formInfo.content,
                "createTime":formInfo.createTime
            },
        }
    );
}

