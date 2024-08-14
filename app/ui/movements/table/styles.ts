import styled from 'styled-components'

export const TableContainer = styled.div`
  thead tr th, td {
    padding: 1rem;
  }

  tbody tr {    
    &:last-child > td:last-child {
      border-bottom-right-radius: 8px;
    }

    &:last-child > td:first-child {
      border-bottom-left-radius: 8px;
    }

    &:first-child > td:last-child {
      border-top-right-radius: 8px;
    }

    &:first-child > td:first-child {
      border-top-left-radius: 8px;
    }
  }
`;