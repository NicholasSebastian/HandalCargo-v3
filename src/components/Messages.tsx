/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'

interface MessagesProps {
  close: Function
}

const Messages = ({ close }: MessagesProps): JSX.Element => {
  return (
    <div id="messages" className='accent1 shadow'>
      <button onClick={() => close()}>✕</button>
      Feature In Progress
    </div>
  )
}

export default Messages
