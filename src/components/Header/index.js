import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {MdHome} from 'react-icons/md'
import {IoBagHandleSharp} from 'react-icons/io5'
import {IoMdExit} from 'react-icons/io'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <ul className="header-container">
      <li>
        <Link to="/">
          <img
            className="header-website-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          />
        </Link>
      </li>
      <li className="header-mobile-view">
        <Link to="/">
          <MdHome className="header-icon" />
        </Link>
        <Link to="/jobs">
          <IoBagHandleSharp className="header-icon" />
        </Link>
        <button
          type="button"
          aria-label="Save"
          onClick={onClickLogout}
          className="mobile-logout-button"
        >
          <IoMdExit className="header-icon" />
        </button>
      </li>
      <li className="large-header-view">
        <Link to="/" className="header-link">
          Home
        </Link>
        <Link to="/jobs" className="header-link">
          Jobs
        </Link>
      </li>
      <li className="large-button-link">
        <button type="button" onClick={onClickLogout} className="large-button">
          Logout
        </button>
      </li>
    </ul>
  )
}
export default withRouter(Header)
