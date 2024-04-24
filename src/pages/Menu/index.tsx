import MenuTree from './components/MenuTree'
import MenuTable from './components/MenuTable'
import styled from 'styled-components'
import { useSearchParams, useLocation, useParams } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';
const FlexDiv = styled.div`
  display:flex;
  padding-top:10px;
  `

const TableList: React.FC<unknown> = () => {
  return <PageContainer>
    <FlexDiv>
      <MenuTree></MenuTree>
      <MenuTable></MenuTable>
    </FlexDiv>
  </PageContainer>
}
export default TableList