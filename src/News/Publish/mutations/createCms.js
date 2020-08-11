import {graphql, commitMutation} from 'react-relay';

const mutation = graphql`
mutation createCms_Mutation($order: Int, $status: CMSStatusType, $cmstypeid: ID!, $title: String!, $pic: String, $content: String!, $from: String!,$abstract: String,$attachment: JSON) {
  createCms(order: $order, status: $status, cmstypeid: $cmstypeid, title: $title, pic: $pic, content: $content, from: $from,abstract:$abstract,attachment:$attachment){
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
    attachment
    abstract
  }
}
`;

export default function createCms(
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
                "attachment":formInfo.attachment,
                "abstract":formInfo.abstract,
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

