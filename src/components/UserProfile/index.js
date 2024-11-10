import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusObj = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  pending: 'PENDING',
}

class UserProfile extends Component {
  state = {
    apiStatus: apiStatusObj.initial,
    profileObj: {},
  }

  componentDidMount = () => {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusObj.pending})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const details = data.profile_details
      const profileDetails = {
        name: details.name,
        profileImageUrl: details.profile_image_url,
        shortBio: details.short_bio,
      }
      this.onSuccessUserProfileApi(profileDetails)
    } else {
      this.onFailureProfileApi()
    }
  }

  onSuccessUserProfileApi = profileDetails => {
    this.setState({
      apiStatus: apiStatusObj.success,
      profileObj: profileDetails,
    })
  }

  onFailureProfileApi = () => {
    this.setState({
      apiStatus: apiStatusObj.failure,
    })
  }

  renderLoader = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderProfile = () => {
    const {profileObj} = this.state
    const {name, shortBio, profileImageUrl} = profileObj
    return (
      <div className="profile-container">
        <img alt="profile" className="profile-image" src={profileImageUrl} />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => {
    return (
      <div className="profile-failure-container">
        <button type="button" onClick={this.retryProfileApi} className="retry-button">
          Retry
        </button>
      </div>
    )
  }

  retryProfileApi = () => {
    this.getProfileDetails()
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusObj.pending:
        return this.renderLoader()
      case apiStatusObj.success:
        return this.renderProfile()
      case apiStatusObj.failure:
        return this.renderFailureView()
      default:
        return <h1>hi null</h1>
    }
  }
}
export default UserProfile
