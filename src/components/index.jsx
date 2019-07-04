import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

const StorybookDiv = styled(Grid)`
  padding: 3rem;
`;

export const FullPageGrid = styled(Grid)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export default StorybookDiv;
