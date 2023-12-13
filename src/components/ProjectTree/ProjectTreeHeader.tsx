import React from 'react'
import { Add, Delete, Edit } from '../../assets/icons'
import ActionButton from './ActionButton'
import { ButtonMethods, ButtonRules } from './types'

type Props = {
  methods: ButtonMethods,
  rules: ButtonRules
}

const ProjectTreeHeader = ({ rules, methods }: Props) => {
  return (
    <div className="gpanel">
      <ActionButton
        icon={Add}
        onClick={methods.add}
        text='Добавить'
        isDisabled={!rules.add}
      />
      <ActionButton
        icon={Delete}
        onClick={methods.delete}
        text='Удалить'
        isDisabled={!rules.delete}
      />
      <ActionButton
        icon={Edit}
        onClick={methods.edit}
        text='Редактировать'
        isDisabled={!rules.edit}
      />
    </div>
  )
}

export default ProjectTreeHeader