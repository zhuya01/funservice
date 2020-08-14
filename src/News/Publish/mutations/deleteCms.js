import {graphql, commitMutation} from 'react-relay';

const mutation = graphql`
mutation deleteCms_Mutation($id: ID!) {
  deleteCms(id:$id){
    id
    title
  }
}
`;
export default function deleteCms(
    id,
    environment,
    onCompleted,
    onError,
) {
    return commitMutation(environment, {
            mutation,
            onCompleted: onCompleted,
            onError: onError,
            variables: {
               "id":id
            },
        }
    );
}

