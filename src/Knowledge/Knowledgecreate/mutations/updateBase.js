import {graphql, commitMutation} from 'react-relay';

const mutation = graphql`
mutation updateBase_Mutation(
  $annexCreate: [knowledgeFileInput]!, 
  $content: String,
	$createTime:DateTime,
  $title:String!
) {
  createPoliceKnowledgeBase(
		content: $content, 
    annexCreate: $annexCreate, 
    createTime:$createTime, 
    title:$title) {
    content
    createdAt
    id
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
              "title":formInfo.title,
              "userName":formInfo.userName,
              "bookType":formInfo.bookType,
              "contnet":formInfo.contnet,
              "createTime":formInfo.createTime
            },
        }
    );
}

