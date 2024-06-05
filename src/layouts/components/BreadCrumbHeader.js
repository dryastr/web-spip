import React from 'react';

// ** Next Import
import Link from 'next/link'

import { makeStyles } from '@mui/styles';
import { emphasize, styled, useTheme } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from 'src/@core/components/mui/chip'
import {useMediaQuery} from '@mui/material';

// ** Custom Components Imports
import Icon from 'src/@core/components/icon'

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColorPalette =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  
return {
    backgroundColorPalette,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    backgroundColor: emphasize(backgroundColorPalette, 0.  ),
    '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColorPalette, 0.06),
    },
    '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColorPalette, 0.12),
    },
  };
});

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: "transparent",
  },
  clicked_item: {
    // marginLeft: theme.spacing(0.25),
    // marginTop: theme.spacing(0.4),
    // marginRight: theme.spacing(0.25),
    backgroundColor: "transparent",
    boxShadow      : theme.shadows[1],
    textTransform: 'capitalize',
    fontSize: 12,
    '&:hover': {
        backgroundColor: "transparent",
        color : theme.palette.text.secondary,
    },
    color: "#000",
  },
  separate_item: {
    marginTop: theme.spacing(0.5),
  },
  current_item: {
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    textTransform: 'capitalize',
    fontSize: 12,
    color : theme.palette.text.primary,
  }
}));

function BreadCrumbHeader(props) {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const parent = props.parent;
  const title = props.title;

  if (sm) {
    if (title !== 'Dashboard') {
      return (
        <StyledBreadcrumb style={{ marginLeft: -25 }} icon={<Icon icon={'mdi:arrow-right-thin'} />} label={title} />
      )
    }

    return (

      // <Link href={'/'}>
        <StyledBreadcrumb
          style={{
              cursor: 'pointer',
              marginLeft: -20 
          }}
          label="Home"
          icon={<Icon icon={'mdi:home-circle'} />}
        />

      // </Link>
    );
  }

  return (
      (title !== 'Dashboard')
      ?
      <React.Fragment>
          <Breadcrumbs aria-label="breadcrumb">
          {
              parent
              ? 
              parent.map((item) => (
                  <>
                      {
                          item.link === '/' ? (
                            <Link href={'/'}>
                              <StyledBreadcrumb
                                  style={{
                                      cursor: 'pointer'
                                  }}
                                  label="Home"
                                  icon={<Icon icon={'mdi:home-circle'} />}
                                  noWrap
                              />
                            </Link>
                          ) : (
                            <Link href={item.link || '/'}>
                              <StyledBreadcrumb
                                style={{
                                    cursor: 'pointer'
                                }}
                                label={item.label}
                              />
                            </Link>
                          )
                      }
                  </>
              ))
              : null
          }
              <StyledBreadcrumb label={title} />
          </Breadcrumbs>
      </React.Fragment>
      : 
      <React.Fragment className={classes.breadcrumbText}>
        <Breadcrumbs aria-label="breadcrumb">
          {/* <Link href={'/'}> */}
            <StyledBreadcrumb
                style={{
                    cursor: 'pointer'
                }}
                label="Home"
                icon={<Icon icon={'mdi:home-circle'} />}
            />
          {/* </Link> */}
        </Breadcrumbs>
      </React.Fragment>
  );
}

export default BreadCrumbHeader;
