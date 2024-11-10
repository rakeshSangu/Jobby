import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobDetailsBox from '../JobDetailsBox'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiStatusConsts = {
  initital: 'INITIAL',
  pending: 'PENDING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConsts.initital,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  onSuccessJobDetailsApi = (jobDetailsObj, similarJobsList) => {
    const updatedJobDetails = {
      companyLogoUrl: jobDetailsObj.company_logo_url,
      companyWebsiteUrl: jobDetailsObj.company_website_url,
      employmentType: jobDetailsObj.employment_type,
      id: jobDetailsObj.id,
      jobDescription: jobDetailsObj.job_description,
      skills: jobDetailsObj.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      })),
      lifeAtCompany: {
        description: jobDetailsObj.life_at_company.description,
        imageUrl: jobDetailsObj.life_at_company.image_url,
      },
      location: jobDetailsObj.location,
      packagePerAnnum: jobDetailsObj.package_per_annum,
      rating: jobDetailsObj.rating,
      title: jobDetailsObj.title,
    }
    const updatedSimilarjobs = similarJobsList.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))
    this.setState({
      jobDetails: updatedJobDetails,
      similarJobs: updatedSimilarjobs,
      apiStatus: apiStatusConsts.success,
    })
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConsts.pending})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.onSuccessJobDetailsApi(data.job_details, data.similar_jobs)
    } else {
      this.setState({apiStatus: apiStatusConsts.failure})
    }
  }

  renderLoadingView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderFailureView = () => {
    const onClickRetry = () => {
      this.getJobItemDetails()
    }

    return (
      <div className="failure-jobItem-view-container">
        <img
          className="jobItem-failureView-image"
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        />
        <h1 className="jobItem-failureView-heading">
          Oops! Something Went Wrong
        </h1>
        <p className="jobItem-failureView-para">
          We cannot seem to find the page you are looking for.
        </p>
        <button type="button" onClick={onClickRetry} className="jobItem-failureView-button">
          Retry
        </button>
      </div>
    )
  }

  switchPossibleViews = () => {
    const {jobDetails, similarJobs, apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConsts.pending:
        return this.renderLoadingView()
      case apiStatusConsts.success:
        return (
          <>
            <JobDetailsBox jobDetails={jobDetails} />
            <SimilarJobs similarJobs={similarJobs} />
          </>
        )
      case apiStatusConsts.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobItemDetails-container">
          {this.switchPossibleViews()}
        </div>
      </>
    )
  }
}
export default JobItemDetails
