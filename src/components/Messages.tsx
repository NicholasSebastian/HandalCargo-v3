/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'

interface MessagesProps {
  close: Function
}

const Messages = ({ close }: MessagesProps): JSX.Element => {
  return (
    <div id="messages">
      <button onClick={() => close()}>✕</button>
      Feature In Progress
    </div>
  )
}

export default Messages
