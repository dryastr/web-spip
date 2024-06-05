// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import MuiTimeline from '@mui/lab/Timeline'

// ** Custom Components Imports
import TableApproval from './approvalTable'

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  '& .MuiTimelineItem-root:before': {
    display: 'none'
  }
})

const KlpViewList = ({ rows }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableApproval rows={rows} />
      </Grid>
    </Grid>
  )
}

export default KlpViewList
