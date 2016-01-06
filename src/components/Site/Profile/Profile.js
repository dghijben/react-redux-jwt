import React from 'react';
import Helmet from 'react-helmet';
import PageHeader from '../Includes/PageHeader';

export default class About extends React.Component {
  render() {
    return (
      <div id="content" role="main">
        <Helmet
          title="Profiel"
        />
        <PageHeader
          title="WNF"
          desc="Bedreigde dieren hebben baat bij de bescherming van hun leefgebied."
          links={[
            {to: '/', name: 'Home'},
            {to: '/dashboard', name: 'Dashboard'},
            {name: 'Account'}
          ]}
        />

        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="portfolio-media">
                <img src="/boss/images/portfolio/project.jpg" className="img-responsive" alt="Sinle Project" />
              </div>
            </div>

            <div className="col-md-5">

              <div className="portfolio-details">
                <h2 className="title-underblock custom">One big Buggy family</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in est justo. Sed sollicitudin augue ut massa fermentum, sit amet condimentum nulla volutpat. Vestibulum non dui condimentum, pulvinar lectus quis, molestie erat. Cras dapibus eros urna.</p>
                <p>Etiam et risus vehicula, pulvinar velit quis, sagittis nisi. Aliquam eu augue id mauris porttitor tempor et eget quam. Mauris elementum enim.</p>
                <ul className="portfolio-details-list">
                  <li><span>Author:</span> Eon Dean</li>
                  <li><span>Published at:</span> 20 February 2014</li>
                  <li><span>Category:</span> <a href="#">Design</a>, <a href="#">Illustration</a></li>
                  <li><span>Designed for:</span> EonyThemes Corporation</li>
                  <li><span>Favourite Count: </span> 34</li>
                  <li className="share-li">
                    <span>Share Now:</span>
                    <div className="social-icons">
                      <a href="#" className="social-icon icon-facebook add-tooltip" data-placement="top" title="Facebook">
                        <i className="fa fa-facebook">{' '}</i>
                      </a>
                      <a href="#" className="social-icon icon-twitter add-tooltip" data-placement="top" title="Twitter">
                        <i className="fa fa-twitter">{' '}</i>
                      </a>
                      <a href="#" className="social-icon icon-dribbble add-tooltip" data-placement="top" title="Dribbble">
                        <i className="fa fa-dribbble">{' '}</i>
                      </a>
                      <a href="#" className="social-icon icon-google-plus add-tooltip" data-placement="top" title="Google Plus">
                        <i className="fa fa-google-plus">{' '}</i>
                      </a>
                      <a href="#" className="social-icon icon-linkedin add-tooltip" data-placement="top" title="Linkedin">
                        <i className="fa fa-linkedin">{' '}</i>
                      </a>
                      <a href="#" className="social-icon icon-rss add-tooltip" data-placement="top" title="Rss Feed">
                        <i className="fa fa-rss">{' '}</i>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
