import { addAstronaut } from './actions'

export function dateFormat(cell) {
  const astronautBirthday = new Date(cell)
  return `${astronautBirthday.getDate()}. ${astronautBirthday.getMonth() + 1}. ${astronautBirthday.getFullYear()}`
}

export function onAfterInsertRow(row) {
  addAstronaut(row)
}
