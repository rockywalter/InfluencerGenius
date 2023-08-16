import { CFormLabel, CFormInput} from '@coreui/react'
import React, { useEffect ,useState } from 'react';
import CIcon from '@coreui/icons-react'
import { CForm, CTableHead, CTableRow, CTableHeaderCell, 
  CButton,CCard,CCardBody,CCardHeader,CCol,CFormSelect,
  CTableBody,CTableDataCell,CAvatar,CProgress,CTable,CButtonGroup,CModal,
  CModalHeader, CModalTitle, CModalBody, CModalFooter  } from '@coreui/react'
  import { useNavigate } from 'react-router-dom';
  import {
    cilTrash,
    cilFolderOpen,
    cilLayers,
    cilPin,
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
  const navigate = useNavigate();
  const [visibleXL, setVisibleXL] = useState(false)
  let[influencers,setInfluencers] = useState([])
  let[campaignData,setCampaign] = useState([])

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


  const showModel = (item) => {
    setCampaign(item)
    setInfluencers(item.influencers)
    setVisibleXL(!visibleXL)
  };
  



  return (
    <div>

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
                             <CButton color="info" onClick={() => showModel(item)} >
                            <CIcon icon={cilFolderOpen} size="md"/></CButton>
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

        <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
      <CModalHeader>
        <CModalTitle><strong>{campaignData.campaignName} </strong><CIcon icon={cilPin} size="xl"/></CModalTitle>
      </CModalHeader>
      <CModalBody>
   
      <CCol xs={12}>
  <CCard className="mb-4">
            <CCardHeader>
             <div><strong>Keywords: </strong> {campaignData.campaignKeywords}</div>
            </CCardHeader>
            
            <CCardBody>
  
  
      <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell className="text-center">
                        <CIcon icon={cilPeople} />
                      </CTableHeaderCell>
                      <CTableHeaderCell>Influencer Name</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Social Media Platform</CTableHeaderCell>
                      <CTableHeaderCell>Followers/Sub count</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Category</CTableHeaderCell>
                      <CTableHeaderCell>Review Score</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>   
                    {influencers.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                        
                        <CIcon icon={cilUser} size="lg"/>
                            
                         
                        </CTableDataCell>
                        <CTableDataCell>
                          <div> <strong>{item['Influencer Name']}</strong></div>
                          {/* <div className="small text-medium-emphasis">
                            <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                            {item.user.registered}
                          </div> */}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                        <div>{item['Social Media Platform']}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="clearfix">
                            <div className="float-start">
                                 {item['Followers Count']}
                            </div>
                            <div className="float-end">
                              {/* <small className="text-medium-emphasis">{item.usage.period}</small> */}
                            </div>
                          </div>
                          {/* <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                        <div>{item['category']}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          {/* <div className="small text-medium-emphasis">Last login</div> */}
                         {item['review_score']}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>

  
                </CCardBody>
          </CCard>
        </CCol>   

      </CModalBody>
    </CModal>

        </div>
  )
}

export default MyCampaigns
