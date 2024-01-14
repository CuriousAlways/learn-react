const Notification = ({message}) => {
  if(message === null) {
    return null;
  }

  return (
    <h1 className={message.type}>
      {message.text}
    </h1>
  )
}

export default Notification;
