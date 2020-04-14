import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

function Callback() {
  return (
    <Dimmer active>
      <Loader content="Loading Tasks" />
    </Dimmer>
  )
}

export default Callback
