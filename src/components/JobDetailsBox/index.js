import {IoMdStar} from 'react-icons/io'
import {IoLocationSharp} from 'react-icons/io5'
import {IoBagRemove} from 'react-icons/io5'
import {FaExternalLinkAlt} from 'react-icons/fa'

import './index.css'

const JobDetailsBox = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    skills,
    lifeAtCompany,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  const {description, imageUrl} = lifeAtCompany
  return (
    <div className="job-details-box-container">
      <div className="company-role-jobItem-container">
        <img
          alt="job details company logo"
          className="jobItem-logo"
          src={companyLogoUrl}
        />
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
        <div className="description-website-link-container">
          <h1 className="jobitem-description-para">Description</h1>
          <a
            href={companyWebsiteUrl}
            target="_blank"
            className="company-website-anchor"
          >
            Visit
            <span>
              <FaExternalLinkAlt className="link-icon" />
            </span>
          </a>
        </div>
        <p className="jobItem-description">{jobDescription}</p>
      </div>
      <h1 className="jobDetails-skills-heading">Skills</h1>
      <ul className="skills-list-container">
        {skills.map(each => (
          <li key={each.name} className="skill-list-item">
            <img alt={each.name} className="skill-image" src={each.imageUrl} />
            <p className="skill-name">{each.name}</p>
          </li>
        ))}
      </ul>
      <h1 className="life-at-company-heading">Life at Company</h1>
      <div className="life-at-company-container">
        <p className="life-at-company-description">{description}</p>
        <img
          alt="life at company"
          className="life-at-company-image"
          src={imageUrl}
        />
      </div>
    </div>
  )
}
export default JobDetailsBox
