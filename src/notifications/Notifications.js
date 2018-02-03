import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'
import { closeNotification } from '../actions'

const messagesStyle = {
    position: 'fixed',
    top: '0',
    right: '0',
    paddingRight: '30px',
    paddingTop: '30px',
    width: '30%',
    zIndex: 10,
}

const NotificationsComponent = ({ dismiss, messages }) => (
    <div className='messages' style={messagesStyle}>
    {messages.map(msg => (
        <Message
          key={msg.id}
          floating
          onDismiss={() => dismiss(msg.id)}
          header={msg.title}
          content={msg.message}
          error={msg.purpose === 'error'}
          warning={msg.purpose === 'warning'}
          success={msg.purpose === 'success'}
        />
    ))}
    </div>
)

const mapStateToProps = (state) => ({
    messages: state.ui.notifications,
})

const mapDispatchToProps = (dispatch) => ({
    dismiss: (id) => dispatch(closeNotification(id))
})

const NotificationsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NotificationsComponent)

export default NotificationsContainer
