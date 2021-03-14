import { Collapse, Radio } from 'antd'
import CollapsePanel from 'antd/lib/collapse/CollapsePanel'
import React, { useState } from 'react'
import { price } from './Datas'

function RadioBox(props) {
  const [Value, setValue] = useState('0')

  const renderRadioBox = () =>
    price.map(value => (
      <Radio key={value._id} value={value._id}>
        {value.name}
      </Radio>
    ))

  const handleChange = event => {
    setValue(event.target.value)

    props.handleFilters(event.target.value)
  }

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <CollapsePanel header='price' key='1'>
          <Radio.Group onChange={handleChange} value={Value}>
            {renderRadioBox()}
          </Radio.Group>
        </CollapsePanel>
      </Collapse>
    </div>
  )
}

export default RadioBox
