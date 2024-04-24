import MdViewer from '@/components/Md-editor/Md-viewer';
import services from '@/services/api';
const { postControllerGetPostById: getPostDetail } =
  services.wenzhangguanli;
import { useState } from 'react';
import { useSearchParams } from '@umijs/max';

const PostAdd: React.FC<unknown> = () => {
  const [mdValue, handleChangeValue] = useState<string>('');
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  if (id) {
    getPostDetail({ id }).then(res => {
      handleChangeValue(res.data?.content);
    })
  }
  return (
    <MdViewer value={mdValue}></MdViewer>
  )
}
export default PostAdd;