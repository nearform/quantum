const Header = ({ description, selectedItem }) => (
  <div className="main-content-header">
    <p>{description}</p>
    <div className="main-content-header-buttons">
      <a
        href="./"
        className={`view-option ${
          selectedItem == 'overview' ? 'view-option-selected' : ''
        }`}
      >
        {' '}
        Overview
      </a>
      <a
        href="./react"
        className={`view-option ${
          selectedItem == 'react' ? 'view-option-selected' : ''
        }`}
      >
        {' '}
        React
      </a>
    </div>
  </div>
)

export default Header
