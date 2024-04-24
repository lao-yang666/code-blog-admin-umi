import MdEditor from '@/components/Md-editor/Md-editor';
import services from '@/services/api';
const { postControllerGetPostById: getPostDetail, postControllerCreatePost: addPost, postControllerCreateDraft: addDraft, postControllerUpdateDraft: modifyDraft, postControllerUpdatePost: modifyPost } =
  services.wenzhangguanli;
import { Button, Input, message } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { throttle, debounce } from '@/utils/common';
import styled from 'styled-components'
import { useSearchParams, useLocation, useParams } from '@umijs/max';
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
  const timeRef = useRef<any>(null);
  const [postDetailId, setPostDetailId] = useState<string>('');
  const [mdValue, handleChangeValue] = useState<string>('');
  const [title, handleChangeTitle] = useState<string>('');
  const mdInfoRef = useRef<{ title: string, content: string, lastContent: string }>({ title, content: mdValue, lastContent: mdValue });
  const [searchParams, setSearchParams] = useSearchParams();

  const btnText = useMemo(() => {
    return postDetailId ? '更新' : '发布';
  }, [postDetailId]);

  const getUrlParams = () => {
    const urlParams = new URLSearchParams(document.location.search.substring(1));
    return urlParams.get('id');
  }

  const handleBack = () => {
    console.log(mdValue, '返回');
    history.go(-1);
  }

  const handlePub = async () => {
    if (!mdValue) {
      message.warning('请输入文章内容');
      return
    }
    const postId = getUrlParams() ?? searchParams.get('id');
    if (!postId) {
      message.warning('操作频繁,稍后再试');
      return
    }
    const hide = message.loading(`正在${btnText}`);
    try {
      await modifyDraft({ id: postId }, { title, content: mdValue, id: Number(postId), published: true, postId: postDetailId ? Number(postDetailId) : undefined });
      hide();
      message.success(`${btnText}成功`);
      history.go(-1);
      return true
    } catch (error) {
      hide();
      message.error(`${btnText}失败请重试！`);
      return false;
    }
  }

  /**
   * @description 保存至草稿箱
   * @returns 
   */
  const handleDraftSave = async () => {
    handleChangeStatus('保存中...');
    try {
      const postId = getUrlParams() ?? searchParams.get('id');
      if (postId) {
        await modifyDraft({ id: postId }, { title: mdInfoRef.current.title, content: mdInfoRef.current.content, id: Number(postId) });
        return true;
      } else {
        const { data } = await addDraft({ title, content: mdInfoRef.current.content, authorId: 1, authorName: '32', postId: postId ? Number(postId) : undefined });
        setSearchParams({ id: data?.id });
        return true;
      }
    } catch (error) {
      return false;
    } finally {
      mdInfoRef.current.lastContent = mdInfoRef.current.content;
      handleChangeStatus('保存成功');
    }
  }

  useEffect(() => {
    mdInfoRef.current.title = title;
    mdInfoRef.current.lastContent = mdInfoRef.current.content; // mdInfoRef.current.content 是 mdValue上一次的内容
    mdInfoRef.current.content = mdValue; // mdValue 最新内容 
    if (!timeRef.current) {
      timeRef.current = setInterval(() => {
        // 5秒保存一次 当当前内容和上一次的内容不一致才保存
        if (mdInfoRef.current.content !== mdInfoRef.current.lastContent) {
          handleDraftSave()
        }
      }, 5000)
    }
  }, [mdValue, title])

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      getPostDetail({ id }).then((res: any) => {
        if (res.data?.postId) setPostDetailId(res.data?.postId);
        handleChangeValue(res.data?.content);
        handleChangeTitle(res.data?.title);
      })
    }
    return () => {
      clearInterval(timeRef.current);
      console.log('组件卸载time清除');
    };
  }, [])
  return (
    <div>
      <Div>
        <Input size='large' value={title} onChange={(e) => { handleChangeTitle(e.target.value) }} placeholder="请输入标题" maxLength={80} />
        <ButtonBox>
          <StatusText>{statusText}</StatusText>
          <Button size='large' onClick={handleDraftSave} style={{ margin: '0 20px' }}>暂存至草稿箱</Button>
          <Button size='large' onClick={handlePub} type='primary'>{btnText}</Button>
        </ButtonBox>
      </Div>
      <MdEditor value={mdValue} onChange={(val: string) => { handleChangeValue(val); }} onBack={handleBack}></MdEditor>
    </div>
  )
}
export default PostAdd;