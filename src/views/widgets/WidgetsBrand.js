import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibFacebook, cibCoveralls, cibInstagram,cibYoutube} from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'
import React, { useEffect ,useState } from 'react';

const WidgetsBrand = ({ withCharts }) => {
  const chartOptions = {
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  }

  let[facebookCount,setFacebookCount] = useState('');
  let[youtubeCount,setYoutubeCount] = useState('');
  let[instaCount,setInstaCount] = useState('');
  let[allinfCount,setAllInfCount] = useState('');

  useEffect(() => {
    // This code will run only once when the component is mounted
    console.log('Component mounted.');

    fetch(`http://localhost:5000/influencerinfo/socialmediacount/Facebook`)
    .then(response => response.json())
    .then(data => {
      const responseString = JSON.stringify(data.count);
      setFacebookCount(responseString)
    })
    .catch(error => {
      // Handle any errors
      console.error('Error fetching flights:', error);
    });

    fetch(`http://localhost:5000/influencerinfo/socialmediacount/Youtube`)
    .then(response => response.json())
    .then(data => {
      const responseString = JSON.stringify(data.count);
      setYoutubeCount(responseString)
    })
    .catch(error => {
      // Handle any errors
      console.error('Error fetching flights:', error);
    });

    fetch(`http://localhost:5000/influencerinfo/socialmediacount/Instagram`)
    .then(response => response.json())
    .then(data => {
      const responseString = JSON.stringify(data.count);
      setInstaCount(responseString)
    })
    .catch(error => {
      // Handle any errors
      console.error('Error fetching flights:', error);
    });
  

    fetch(`http://localhost:5000/influencerinfo/allcount`)
    .then(response => response.json())
    .then(data => {
      const responseString = JSON.stringify(data.count);
      setAllInfCount(responseString)
    })
    .catch(error => {
      // Handle any errors
      console.error('Error fetching flights:', error);
    });

  
    return () => {
      console.log('Component unmounted.');
      // Cleanup code here
    };
  }, []);

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsD
          className="mb-4"
          {...(withCharts && {
            chart: (
              <CChart
                className="position-absolute w-100 h-100"
                type="line"
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      backgroundColor: 'rgba(255,255,255,.1)',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointHoverBackgroundColor: '#fff',
                      borderWidth: 2,
                      data: [65, 59, 84, 84, 51, 55, 40],
                      fill: true,
                    },
                  ],
                }}
                options={chartOptions}
              />
            ),
          })}
          icon={<CIcon icon={cibFacebook} height={52} className="my-4 text-white" />}
          values={[
            { title: 'Influencer Count', value: facebookCount },
            // { title: 'All Influencer Count', value: allinfCount },
          ]}
          style={{
            '--cui-card-cap-bg': '#3b5998',
          }}
        />
      </CCol>

      <CCol sm={6} lg={3}>
        <CWidgetStatsD
          className="mb-4"
          {...(withCharts && {
            chart: (
              <CChart
                className="position-absolute w-100 h-100"
                type="line"
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      backgroundColor: 'rgba(255,255,255,.1)',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointHoverBackgroundColor: '#fff',
                      borderWidth: 2,
                      data: [1, 13, 9, 17, 34, 41, 38],
                      fill: true,
                    },
                  ],
                }}
                options={chartOptions}
              />
            ),
          })}
          icon={<CIcon icon={cibYoutube} height={52} className="my-4 text-white" />}
          values={[
            { title: 'Influencer Count', value: youtubeCount },
            // { title: 'All Influencer Count', value: allinfCount },
          ]}
          style={{
            '--cui-card-cap-bg': '#FF0000',
          }}
        />
      </CCol>

      <CCol sm={6} lg={3}>
        <CWidgetStatsD
          className="mb-4"
          {...(withCharts && {
            chart: (
              <CChart
                className="position-absolute w-100 h-100"
                type="line"
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      backgroundColor: 'rgba(255,255,255,.1)',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointHoverBackgroundColor: '#fff',
                      borderWidth: 2,
                      data: [78, 81, 80, 45, 34, 12, 40],
                      fill: true,
                    },
                  ],
                }}
                options={chartOptions}
              />
            ),
          })}
          icon={<CIcon icon={cibInstagram} height={52} className="my-4 text-white" />}
          values={[
            { title: 'Influencer Count', value: instaCount },
            // { title: 'All Influencer Count', value: allinfCount },
          ]}
          style={{
            '--cui-card-cap-bg': '#F70F59',
          }}
        />
      </CCol>

      <CCol sm={6} lg={3}>
        <CWidgetStatsD
          className="mb-4"
          color="warning"
          {...(withCharts && {
            chart: (
              <CChart
                className="position-absolute w-100 h-100"
                type="line"
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      backgroundColor: 'rgba(255,255,255,.1)',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointHoverBackgroundColor: '#fff',
                      borderWidth: 2,
                      data: [35, 23, 56, 22, 97, 23, 64],
                      fill: true,
                    },
                  ],
                }}
                options={chartOptions}
              />
            ),
          })}
          icon={<CIcon icon={cibCoveralls} height={52} className="my-4 text-white" />}
          values={[
            { title: 'All Influencers', value: allinfCount },
          ]}
        />
      </CCol>
    </CRow>
  )
}

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
}

export default WidgetsBrand
