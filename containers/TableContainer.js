import React from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import PropTypes from 'prop-types'

import { dateFormat } from '../utils'
import { addAstronaut, deleteAstronaut, editAstronaut } from '../actions'

const TableContainer = ({ astronauts, addAstr, deleteAstr, editAstr }) => {
  const tableOptions = {
    noDataText: 'Nemáte uloženy žádné kosmonauty.',
    defaultSortName: 'name',
    defaultSortOrder: 'asc',
    afterInsertRow: addAstr,
    afterDeleteRow: deleteAstr,
  }
  const selectRowProp = {
    mode: 'checkbox',
  }
  const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    afterSaveCell: editAstr,
  }
  return (
    <BootstrapTable
      data={astronauts}
      striped hover
      search
      insertRow deleteRow
      selectRow={selectRowProp}
      cellEdit={cellEditProp}
      options={tableOptions}
    >
      <TableHeaderColumn isKey dataField="id" hidden autoValue>ID</TableHeaderColumn>
      <TableHeaderColumn dataField="name" dataSort>Name</TableHeaderColumn>
      <TableHeaderColumn dataField="surname" dataSort>Surname</TableHeaderColumn>
      <TableHeaderColumn
        dataField="birthday"
        dataSort
        dataFormat={dateFormat}
        editable={{ type: 'datetime' }}
      >
        Birthday
      </TableHeaderColumn>
      <TableHeaderColumn dataField="superpowers">Superpowers</TableHeaderColumn>
    </BootstrapTable>
  )
}

TableContainer.propTypes = {
  astronauts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      surname: PropTypes.string,
      birthday: PropTypes.string,
      superpowers: PropTypes.string,
    }),
  ).isRequired,
  addAstr: PropTypes.func.isRequired,
  editAstr: PropTypes.func.isRequired,
  deleteAstr: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ astronauts: state.astronauts })

const mapDispatchToProps = dispatch => ({
  addAstr: (astronaut) => {
    dispatch(addAstronaut(astronaut))
  },
  deleteAstr: (astronautIds) => {
    astronautIds.map((astronautId) => {
      dispatch(deleteAstronaut(astronautId))
      return astronautId
    })
  },
  editAstr: (astronaut) => {
    dispatch(editAstronaut(astronaut))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer)
