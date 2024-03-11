import MdEditor from '@/components/Md-editor/Md-editor';
import { useState } from 'react';
const PostAdd: React.FC<unknown> = () => {
  const [mdValue, handleChangeValue] = useState<string>('');
  const handleSave = () => {
    console.log(JSON.stringify(mdValue), '=====mdValue=======');
  }
  const handleBack = () => {
    console.log(mdValue, '返回');
    history.go(-1);
  }
  return <MdEditor value={mdValue} onChange={handleChangeValue} onSave={handleSave} onBack={handleBack}></MdEditor>
}
export default PostAdd;