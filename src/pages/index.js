import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {
  withStyles, Divider, Paper, Grid
} from '@material-ui/core';
import Dashboard from 'src/containers/Templates/Dashboard';

import {
  GazetteSlider,
  ObrasSlider,
  MunicipalStats,
  Contacts,
  Features,
  SliderLanding,
} from 'src/containers/Dashboard/components'
import styles from 'src/containers/Dashboard/dashboard-jss';
// import dynamic from 'next/dynamic';


import MunicipalityApi from '../api/services/municipality.service'
import MunicipalitiesApi from '../api/services/municipalities.service'
// import { MUNICIPALITY_DATA, SET_FEATURES, SET_DEPARTMENTS } from '@actions/actionConstants'
import { playTransitionAction } from '@actions/UiActions'
import { setMunicipalityAction, setFeaturesAction, setDepartmentsAction } from '@actions/MunicipalityDataActions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Page extends React.Component {

  componentDidMount = () => {
    const { municipality, features, channels, departments }= this.props
    this.props.setFeatures(features, channels)
    this.props.setDepartments(departments)
    this.props.setMunicipality(municipality)
    this.props.loadTransition(true)
  }


  render() {
    console.log('SE RENDER INDEX')
    const { changeMode } = this.props;
    const brand = { name: 'Inicio', desc: 'Municipios de Bolivia' };
    const title = brand.name + ' - Municipios de Bolivia';
    const description = brand.desc;
    const { classes } = this.props;

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
}

Page.getInitialProps = async ({req, store}) => {
  const hostname = req.headers.host.indexOf('localhost') !== -1  ? 'localhost' : req.headers.host
  const municipality = await MunicipalityApi.hostingProgress(hostname)
  const { features, channels } = await MunicipalitiesApi.getFeatures(municipality.id)
  const departments = await MunicipalitiesApi.getDepartments(municipality.id)

  // await store.dispatch({ type: MUNICIPALITY_DATA, value: municipality })
  // await store.dispatch({ type: SET_FEATURES, features, channels })
  // await store.dispatch({ type: SET_DEPARTMENTS, departments })

  return { municipality, features, channels, departments }
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadTransition: bindActionCreators(playTransitionAction, dispatch),
  setMunicipality: bindActionCreators(setMunicipalityAction, dispatch),
  setFeatures: bindActionCreators(setFeaturesAction, dispatch),
  setDepartments: bindActionCreators(setDepartmentsAction, dispatch),
})

const PageWithRedux = connect(null, mapDispatchToProps)(Page)

export default withStyles(styles)(PageWithRedux)