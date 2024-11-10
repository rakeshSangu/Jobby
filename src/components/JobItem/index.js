import {IoMdStar} from 'react-icons/io'
import {IoLocationSharp} from 'react-icons/io5'
import {IoBagRemove} from 'react-icons/io5'

import {Link} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {jobListItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobListItemDetails
  return (
    <Link className="link-item" to={`/jobs/${id}`}>
      <div className="company-role-jobItem-container">
        <img alt="company logo" className="jobItem-logo" src={companyLogoUrl} />
        <div className="title-rating-container">
          <h1 className="jobItem-title">{title}</h1>
          <div className="jobItem-rating-container">
            <IoMdStar className="jobItem-rating-icon" />
            <p className="rating-para">{rating}</p>
          </div>
        </div>
      </div>
      <div className="jobItem-location-type-salary-container">
        <div className="location-type-container">
          <div className="logo-details-container">
            <IoLocationSharp className="details-icon" />
            <p className="details-para">{location}</p>
          </div>
          <div className="logo-details-container">
            <IoBagRemove className="details-icon" />
            <p className="details-para">{employmentType}</p>
          </div>
        </div>
        <p className="jobItem-package">{packagePerAnnum}</p>
      </div>
      <hr className="jobItem-line" />
      <div className="jobitem-descripton-container">
        <h1 className="jobitem-description-para">Description</h1>
        <p className="jobItem-description">{jobDescription}</p>
      </div>
    </Link>
  )
}
export default JobItem
