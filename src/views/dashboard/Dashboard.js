import React, { useEffect ,useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

import { getStyle} from '@coreui/utils'
import { CChart } from '@coreui/react-chartjs'


import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)



  
  let[categoryCount,setCategoryCount] = useState('');
  let[commentCount,setallCommentCount] = useState('');
  useEffect(() => {
    // This code will run only once when the component is mounted
    console.log('Component mounted.');

    fetch(`http://localhost:5000/descriptions/categorycount`)
    .then(response => response.json())
    .then(data => {
      setCategoryCount(data)
    })
    .catch(error => {
      // Handle any errors
      console.error('Error fetching flights:', error);
    });

    

    fetch(`http://localhost:5000/comments/allcount`)
    .then(response => response.json())
    .then(data => {
      setallCommentCount(data)
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
    <>
          <WidgetsBrand withCharts />
      {/* <WidgetsDropdown /> */}

     
      <CCard className="mb-4"  >
      <CCardHeader><strong>Social Media Posts Based on the Category</strong></CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
              
              </h4>
              <div className="small text-medium-emphasis">From Currrent Database</div>
            </CCol>
            
          </CRow>
          <CChart 
  type="bar"
  data={{
    labels: ['Technology and Electronics', 'Fashion and Apparel', 'Health and Wellness', 'Personal Development and Education', 'Hospitality and Food Services'],
    datasets: [
      {
        label: 'Social Media Post Count',
        backgroundColor: '#5141E0',
        data: [categoryCount["Technology and Electronics"], categoryCount["Fashion and Apparel"], 
        categoryCount["Health and Wellness"], categoryCount["Personal Development and Education"],
        categoryCount["Hospitality and Food Services"]],
      },
    ],
  }}
  labels="category"
  options={{
    plugins: {
      legend: {
        labels: {
          color: getStyle('--cui-body-color'),
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
      },
      y: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
      },
    },
  }}
/>


        </CCardBody>

      </CCard>

  

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Total Posts {' & '} Comments from all Influencers</CCardHeader>
            <CCardBody>
              <CRow>
            
                  
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">Total number of social media posts</div>
                        <div className="fs-5 fw-semibold">{categoryCount["total"]}</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Total number of social media comments</div>
                        <div className="fs-5 fw-semibold">{commentCount.count}</div>
                      </div>
                    </CCol>
                

              </CRow>

            
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
