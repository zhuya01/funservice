import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation UploadPackageMutation($file: Upload!) {
    singleUpload(file: $file) {
      id
      hash
      type
      size
    }
  }
`

function commit(environment, input, uploadables, onCompleted, onError) {
  return commitMutation(environment, {
    mutation,
    variables: { input },
    uploadables,
    onCompleted,
    onError
  })
}

export default { commit }