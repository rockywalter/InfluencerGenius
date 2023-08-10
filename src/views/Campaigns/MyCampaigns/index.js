import { CFormLabel, CFormInput} from '@coreui/react'
import React, { useEffect ,useState } from 'react';
import CIcon from '@coreui/icons-react'
import { CForm, CTableHead, CTableRow, CTableHeaderCell, 
  CButton,CCard,CCardBody,CCardHeader,CCol,CFormSelect,
  CTableBody,CTableDataCell,CAvatar,CProgress,CTable,CButtonGroup  } from '@coreui/react'
  import {
    cilTrash,
    cilFolderOpen,
    cilLayers,
    cibCcPaypal,
    cibCcStripe,
    cibCcVisa,
    cibGoogle,
    cibFacebook,
    cibLinkedin,
    cifBr,
    cifEs,
    cifFr,
    cifIn,
    cifPl,
    cifUs,
    cibTwitter,
    cilUser,
    cilPeople,
    cilSave,
    cilUserFemale,
  } from '@coreui/icons'
  import avatar1 from 'src/assets/images/avatars/1.jpg'
  import avatar2 from 'src/assets/images/avatars/2.jpg'
  import avatar3 from 'src/assets/images/avatars/3.jpg'
  import avatar4 from 'src/assets/images/avatars/4.jpg'
  import avatar5 from 'src/assets/images/avatars/5.jpg'
  import avatar6 from 'src/assets/images/avatars/6.jpg'



const MyCampaigns = () => {

  let[fetcheddata,setData] = useState([])


  useEffect(() => {
    // This code will run only once when the component is mounted
    console.log('Component mounted.');

    fetch(`http://localhost:5000/campaign`)
    .then(response => response.json())
    .then(data => {
          setData(data)
          console.log(data);
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

<CCol xs={12}>
  <CCard className="mb-4">
            <CCardHeader>
            <strong>All Campaigns</strong>
            </CCardHeader>
            <CCardBody>
  
  
      <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell className="text-center">
                        <CIcon icon={cilPeople} />
                      </CTableHeaderCell>
                      <CTableHeaderCell>Campaign Name</CTableHeaderCell>
                      <CTableHeaderCell>Cateogory</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Created Date</CTableHeaderCell>
                      <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>   
                    {fetcheddata.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                        
                        <CIcon icon={cilLayers} size="lg"/>
                            
                         
                        </CTableDataCell>
                        <CTableDataCell>
                          <div> <strong>{item['campaignName']}</strong></div>
                          {/* <div className="small text-medium-emphasis">
                            <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                            {item.user.registered}
                          </div> */}
                        </CTableDataCell>
                        <CTableDataCell >
                        <div>{item['category']}</div>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                        <div>{item['createdAt']}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                        <CButtonGroup role="group" aria-label="Basic mixed styles example">
                             <CButton color="info"><CIcon icon={cilFolderOpen} size="md"/></CButton>
                             <CButton color="danger"><CIcon icon={cilTrash} size="md"/></CButton>
                           
                        </CButtonGroup>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>

                </CCardBody>
          </CCard>
        </CCol>
  )
}

export default MyCampaigns
