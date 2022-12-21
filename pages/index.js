import React from 'react'
import withRedux from 'next-redux-wrapper'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import { Grid, Row, Col } from 'react-bootstrap'

import Page from '../containers/TableContainer'
import { initStore } from '../store'
import { RECEIVE_ASTRONAUTS } from '../reducers'
import { reactTable, bootstrap } from '../styles/all'

class Index extends React.Component {
  static async getInitialProps({ store, isServer }) {
    const response = await fetch('http://localhost:3004/astronauts')
    const json = await response.json()
    store.dispatch({ type: RECEIVE_ASTRONAUTS, payload: { astronauts: json } })
    return { isServer, state: { astronauts: json } }
  }

  render() {
    return (
      <div>
        <Head>
          <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
          <style>{bootstrap}</style>
          <style>{reactTable}</style>
        </Head>
        <Grid>
          <Row className="show-grid">
            <Col xs={12}>
              <h1>Správa kosmonautů</h1>
              <p>
                Vítejte ve správě kosmonautů. Tato jednoduchá aplikace vám umožní přidávat, upravovat a mazat existující kosmonauty. Pokud chcete editovat nějakého kosmonauta, pak stačí kliknout na danou položku.
              </p>
              <Page />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default withRedux(initStore)(Index)
