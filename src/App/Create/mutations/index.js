import { graphql, commitMutation } from 'react-relay';

const mutation = graphql`
  mutation mutations_CreateAppMutation($name: String!, $space: AppSpace!, $type: AppType!, $config: String!, $mode: AppMode!, $url: String, $remark: String) {
    createApp(name: $name, space: $space, type: $type, config: $config, mode: $mode, url: $url, remark: $remark) {
      id
      name
      space
      type
      config
      mode
      url
      package{
       version
      }
      remark
    }
  }
`;

function commit(
  environment,
  name,
  space,
  type,
  config,
  mode,
  url,
  remark,
  onCompleted,
  onError
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      name: name,
      space: space,
      config: config,
      type: type,
      mode: mode,
      url: url,
      remark: remark
    },
    onCompleted: onCompleted,
    onError: onError
  }
  );
}

export default { commit };