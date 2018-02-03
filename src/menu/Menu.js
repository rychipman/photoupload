import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Icon,
    Label,
    Menu,
} from 'semantic-ui-react'
import { createNotification } from '../actions'

const MenuComponent = (props) => (
    <Menu
      borderless
      color='teal'
      fixed='top'
      size='huge'
    >
        <Menu.Item
          header
          content='PhotoUpload'
        />

        <Menu.Item
          header
          content='Upload'
          name='upload'
          active={true}
          onClick={() => console.log('clicked upload menu item')}
        />

        <Menu.Item
          name='organize'
          active={false}
          onClick={() => props.notify('Not Available', 'Photo organization is not available at this time. Check back later for updates!', 'warning')}
        >
            Organize <Label circular color='teal' size='mini'>22</Label>
        </Menu.Item>

        { props.email === ''
          ? <Menu.Item
              position='right'
              name='login'
              active={false}
              onClick={() => console.log('clicked login menu item')}
            >
                <Link to='/login'>Log In</Link>
            </Menu.Item>
          : <Menu.Item
              link
              position='right'
              name='user'
              onClick={() => console.log('clicked user menu item')}
            >
                <Icon name='user circle' />
                {'   ' + props.email}
            </Menu.Item>
        }
    </Menu>
)

const mapStateToProps = (state) => ({
    email: state.auth.email,
})

const mapDispatchToProps = (dispatch) => ({
    notify: (title, msg, purpose) => dispatch(createNotification(title, msg, purpose)),
})

const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MenuComponent)

export default MenuContainer
