import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { withStyles, Divider, Paper, Grid } from '@material-ui/core';
import Dashboard from 'src/containers/Templates/Dashboard';
import { GazetteSlider, ObrasSlider, Contacts, SliderLanding, MunicipalStats, Features } from 'src/containers/Dashboard/components'
import styles from 'src/containers/Dashboard/dashboard-jss';

import MunicipalityApi from '../api/services/municipality.service'
import { MUNICIPALITY_DATA, GET_FEATURES, GET_DEPARTMENTS } from '@actions/actionConstants'
import { useDispatch } from "react-redux"

const Page = ({ municipality, changeMode, classes }) => {
  const dispatch = useDispatch()
  const brand = { name: 'Inicio', desc: 'Municipios de Bolivia' };
  const title = brand.name + ' - Municipios de Bolivia';
  const description = brand.desc;

  React.useEffect(() => {
    loadMunicipality()
  }, [])

  const loadMunicipality = () => {
    if (municipality.id) {
      dispatch({ type: MUNICIPALITY_DATA, value: municipality })
      dispatch({ type: GET_FEATURES, value: municipality.id })
      dispatch({ type: GET_DEPARTMENTS, value: municipality.id })
    }
  }

  return (
    <Dashboard changeMode={changeMode}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Head>
      <SliderLanding overTop />
      <Divider className={classes.divider} />
      <Features classes={classes} />
      <Divider className={classes.divider} />

      <Paper className={classes.paperRoot} elevation={4}>
        <Grid container spacing={2} className={classes.root}>
          <Grid item md={4} xs={12}>
            <GazetteSlider />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <ObrasSlider />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <MunicipalStats />
          </Grid>
        </Grid>
      </Paper>
      <Divider className={classes.divider} />
      <Contacts classes={classes} />
    </Dashboard>
  )
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
  municipality: PropTypes.object.isRequired,
};

Page.getInitialProps = async ({ req }) => {
  if(!req) return { municipality: { } }
  const hostname = req.headers.host.indexOf('localhost') !== -1 ? 'localhost' : req.headers.host
  const municipality = await MunicipalityApi.hostingProgress(hostname)
  return { municipality }
}

export default withStyles(styles)(Page)