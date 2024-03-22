import MdEditor from '@/components/Md-editor/Md-editor';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { imdebounce } from '@/utils/common';
import styled from 'styled-components'
const Div = styled.div`
  display:flex;
  justify-content:space-between;
  padding-bottom:10px;
`

const ButtonBox = styled.div`
  display:flex;
  justify-content:flex-end;
  align-items:center;
  margin-left:8px;
`

const StatusText = styled.div`
  font-size: 14px;
  white-space: nowrap;
  color: #c9cdd4;
  cursor: default;
`

const PostAdd: React.FC<unknown> = () => {
  const [statusText, handleChangeStatus] = useState<string>('自动保存至草稿箱');
  const [mdValue, handleChangeValue] = useState<string>('');
  const handleSave = () => {
    console.log(JSON.stringify(mdValue), '=====mdValue=======');
    handleChangeStatus('保存成功');
  }
  const handleBack = () => {
    console.log(mdValue, '返回');
    history.go(-1);
  }
  const handleChange = imdebounce(() => {
    handleChangeStatus('保存中');
    handleSave()
  }, 2000)
  const handlePub = () => {

  }
  return (
    <div>
      <Div>
        <Input size='large' placeholder="请输入标题" maxLength={80} />
        <ButtonBox>
          <StatusText>{statusText}</StatusText>
          <Button size='large' onClick={handleSave} style={{ margin: '0 20px' }}>草稿箱</Button>
          <Button size='large' onClick={handlePub} type='primary'>提交</Button>
        </ButtonBox>
      </Div>
      <MdEditor value={mdValue} onChange={(val: string) => { handleChangeValue(val); handleChange() }} onSave={handleSave} onBack={handleBack}></MdEditor>
    </div>
  )
}
export default PostAdd;