
// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import LinearProgressWithLabel from 'src/components/LinearProgressWithLabel'

const FormProgress = () => {

  return (
    <>
      <Card sx={{ marginBottom: 3 }}>
        <CardHeader
            title='Kesiapan Penilaian'
            titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
        />
        <CardContent>
            <LinearProgressWithLabel value={80} />
        </CardContent>
      </Card>
    </>
  )
}

export default FormProgress
