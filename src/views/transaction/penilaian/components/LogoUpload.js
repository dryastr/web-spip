// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const LogoUpload = (props) => {
  // ** State
  const [files, setFiles] = useState([])

  // ** Hook
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      props.setFile(acceptedFiles[0]);
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const img = files.map(file => (
    <img width='100%' key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file)} />
  ))

  return (
    <>
      <List>
        {
          files.map(file => (
            <>
              {file.path} - {file.size} bytes
            </>
          ))
        }
      </List>
      <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 450 } : {}}>
        <input {...getInputProps()} />
        {files.length ? (
            img
        ) : (
            <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
            <Img width={200} alt='Upload img' src='/images/misc/upload.png' />
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                <HeadingTypography variant='h5'>Letakkan file di sini atau klik untuk mengunggah logo.</HeadingTypography>
                <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
                    Letakkan file di sini atau klik{' '}
                <Link href='/' onClick={e => e.preventDefault()}>
                    browse
                </Link>{' '}
                thorough your machine
                </Typography>
            </Box>
            </Box>
        )}
      </Box>
    </>
  )
}

export default LogoUpload
