// ** MUI Imports
import { useTheme } from '@mui/material/styles'

// ** Third Party Components
import toast from 'react-hot-toast'

const Toast = (message, type) => {
  // ** Hook
  const theme = useTheme()

  switch (type) {
    case "success":
      return toast.success(message, {
          style: {
            padding: '16px',
            color: theme.palette.primary.main,
            border: "1px solid " + theme.palette.primary.main
          },
          iconTheme: {
            primary: theme.palette.primary.main,
            secondary: theme.palette.primary.contrastText
          }
      });
    }
  };

  export default Toast;
