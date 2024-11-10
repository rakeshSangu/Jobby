import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobItem from '../JobItem'
import UserProfile from '../UserProfile'

import './index.css'

const apiStatusObj = {
  intitial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  pending: 'PENDING',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobsApiStatusObj = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  pending: 'PENDING',
}

class Jobs extends Component {
  state = {
    apiStatus: jobsApiStatusObj.initial,
    jobsList: [],
    searchInput: '',
    salary: '',
    inputEmployment: [],
    search: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  onSuccessGetJobsApi = data => {
    const {jobs} = data
    const jobsListDetails = jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))
    this.setState({
      apiStatus: jobsApiStatusObj.success,
      jobsList: jobsListDetails,
    })
  }

  onFailureGetJobsApi = () => {
    this.setState({
      apiStatus: jobsApiStatusObj.failure,
    })
  }

  getJobs = async () => {
    this.setState({
      apiStatus: jobsApiStatusObj.pending,
    })
    const {search, salary, inputEmployment} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const getJobsUrl = `https://apis.ccbp.in/jobs?employment_type=${inputEmployment.join(
      ',',
    )}&minimum_package=${salary}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(getJobsUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.onSuccessGetJobsApi(data)
    } else {
      this.onFailureGetJobsApi()
    }
  }

  onChangeEmploymentType = event => {
    const {inputEmployment} = this.state
    const employmentType = event.target.value
    if (inputEmployment.includes(employmentType)) {
      const updatedInputEmployment = inputEmployment.filter(
        each => each !== employmentType,
      )
      this.setState({inputEmployment: updatedInputEmployment}, this.getJobs)
    } else {
      this.setState(
        prevState => ({
          inputEmployment: [...prevState.inputEmployment, employmentType],
        }),
        this.getJobs,
      )
    }
  }

  onChangeSalary = event => {
    this.setState({salary: event.target.value}, this.getJobs)
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  getSearchJobs = () => {
    const {searchInput} = this.state
    this.setState({search: searchInput}, this.getJobs)
  }

  renderFilters = () => {
    return (
      <>
        <div className='employment-filter-container'>
          <h1 className='filter-heading'>Type of Employment</h1>
          <ul className='filter-input-container'>
            {employmentTypesList.map(each => (
              <li className='filter-listItem' key={each.employmentTypeId}>
                <input
                  className='filter-input'
                  id={each.employmentTypeId}
                  type='checkbox'
                  value={each.employmentTypeId}
                  onChange={this.onChangeEmploymentType}
                />
                <label className='filter-label' htmlFor={each.employmentTypeId}>
                  {each.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <hr className='hr-line' />
        <div className='salary-filter-container'>
          <h1 className='filter-heading'>Salary Range</h1>
          <ul className='filter-input-container'>
            {salaryRangesList.map(each => (
              <li className='filter-listItem' key={each.salaryRangeId}>
                <input
                  className='filter-input'
                  id={each.salaryRangeId}
                  type='radio'
                  name='salary'
                  value={each.salaryRangeId}
                  onChange={this.onChangeSalary}
                />
                <label className='filter-label' htmlFor={each.salaryRangeId}>
                  {each.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => {
    return (
      <div className='loader-container' data-testid='loader'>
        <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
      </div>
    )
  }

  renderJobItemsSuccessView = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className='empty-jobItems-view'>
          <img
            className='no-jobs-image'
            alt='no jobs'
            src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'
          />
          <h1 className='no-jobs-heading'>No Jobs Found</h1>
          <p className='no-jobs-para'>
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    } else {
      return jobsList.map(each => (
        <li key={each.id} className='jobListItem'>
          <JobItem jobListItemDetails={each} />
        </li>
      ))
    }
  }

  renderFailureView = () => {
    const onClickRetry = () => {
      this.getJobs()
    }

    return (
      <div className='failure-jobItem-view-container'>
        <img
          className='jobItem-failureView-image'
          alt='failure view'
          src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
        />
        <h1 className='jobItem-failureView-heading'>
          Oops! Something Went Wrong
        </h1>
        <p className='jobItem-failureView-para'>
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type='button'
          onClick={onClickRetry}
          className='jobItem-failureView-button'
        >
          Retry
        </button>
      </div>
    )
  }

  renderJobItemsPageView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusObj.pending:
        return this.renderLoadingView()
      case apiStatusObj.success:
        return this.renderJobItemsSuccessView()
      case apiStatusObj.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className='jobs-container'>
          <div className='profile-filters-container'>
            <div className='mobile-search-container'>
              <input
                aria-label='search'
                placeholder='Search'
                type='search'
                className='search-input'
                onChange={this.onChangeSearchInput}
              />
              <button
                type='button'
                data-testid='searchButton'
                aria-label='search'
                onClick={this.getSearchJobs}
                className='search-button'
              >
                <FaSearch className='search-icon' />
              </button>
            </div>
            <UserProfile />
            <hr />
            <div className='filters-container'>{this.renderFilters()}</div>
          </div>

          <ul className='jobs-list-container'>
            <div className='large-search-container'>
              <input
                placeholder='Search'
                type='search'
                className='search-input'
                onChange={this.onChangeSearchInput}
              />
              <button
                aria-label='icon'
                onClick={this.getSearchJobs}
                className='search-button'
              >
                <FaSearch className='search-icon' />
              </button>
            </div>
            {this.renderJobItemsPageView()}
          </ul>
        </div>
      </>
    )
  }
}
export default Jobs
