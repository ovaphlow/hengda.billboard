import React, { useState, useEffect } from 'react'

export const TextCheckbox = props => {

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (props.checked)
      setChecked(props.checked)
  }, 
  [props, checked])

  const changeChecked = () => {
    if (props.onChange)
      props.onChange({
        value:props.value,
        checked:!checked 
      })
    setChecked(!checked)
  }

  return (
    <span onClick={changeChecked} className={`pl-1 pr-1 ${checked?'text-success bg-light':'text-secondary'}` }>
      {props.children}
    </span>
  )
}