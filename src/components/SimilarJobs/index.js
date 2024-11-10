import {IoMdStar} from 'react-icons/io'
import {IoLocationSharp} from 'react-icons/io5'
import {IoBagRemove} from 'react-icons/io5'

import './index.css'

const SimilarJobs = props => {
  const {similarJobs} = props
  const renderSimilarJobItem = each => {
    return (
      <li key={each.id} className="similarJob-list-item">
        <div className="company-role-jobItem-container">
          <img
            alt="similar job company logo"
            className="jobItem-logo"
            src={each.companyLogoUrl}
          />
          <div className="title-rating-container">
            <h1 className="jobItem-title">{each.title}</h1>
            <div className="jobItem-rating-container">
              <IoMdStar className="jobItem-rating-icon" />
              <p className="rating-para">{each.rating}</p>
            </div>
          </div>
        </div>
        <hr className="jobItem-line" />
        <div className="jobitem-descripton-container">
          <h1 className="jobitem-description-para">Description</h1>
          <p className="jobItem-description">{each.jobDescription}</p>
        </div>
        <div className="jobItem-location-type-salary-container">
          <div className="location-type-container">
            <div className="logo-details-container">
              <IoLocationSharp className="details-icon" />
              <p className="details-para">{each.location}</p>
            </div>
            <div className="logo-details-container">
              <IoBagRemove className="details-icon" />
              <p className="details-para">{each.employmentType}</p>
            </div>
          </div>
        </div>
      </li>
    )
  }

  return (
    <div>
      <h1 className="similar-jobs-heading">Similar Jobs</h1>
      <ul className="similar-jobs-list-container">
        {similarJobs.map(each => renderSimilarJobItem(each))}
      </ul>
    </div>
  )
}
export default SimilarJobs
