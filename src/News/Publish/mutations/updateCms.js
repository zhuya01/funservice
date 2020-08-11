import {graphql, commitMutation} from 'react-relay';

const mutation = graphql`
mutation updateCms_Mutation($order: Int, $status: CMSStatusType, $cmstypeid: ID!, $title: String!, $pic: String, $content: String!, $from: String!,$id: ID!) {
  updateCms(order: $order, status: $status, cmstypeid: $cmstypeid, title: $title, pic: $pic, content: $content, from: $from,id:$id) {
    cmstype {
      id
      name
      order
      remark
      updatedAt
      createdAt
      deletedAt
    }
    content
    createdAt
    deletedAt
    from
    id
    order
    pic
    reads
    status
    title
    updatedAt
  }
}
`;

export default function updateCms(
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
                "id":id,
                "order": formInfo.order,
                "status":formInfo.status,
                "cmstypeid": formInfo.cmstypeid,
                "title": formInfo.title,
                "pic": formInfo.pic,
                "content": formInfo.content,
                "from": formInfo.from,
            },
        }
    );
}

