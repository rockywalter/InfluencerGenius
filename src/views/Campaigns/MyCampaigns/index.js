
import React, { useEffect ,useState } from 'react';
import CIcon from '@coreui/icons-react'
import { CTableHead, CTableRow, CTableHeaderCell, 
  CButton,CCard,CCardBody,CCardHeader,CCol,
  CTableBody,CTableDataCell,CTable,CButtonGroup,CModal,
  CModalHeader, CModalTitle, CModalBody, CSpinner  } from '@coreui/react'
  import {
    cilTrash,
    cilFolderOpen,
    cilLayers,
    cilPin,
    cilUser,
    cilPeople,
  } from '@coreui/icons'





const MyCampaigns = () => {

  let[fetcheddata,setData] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  let[influencers,setInfluencers] = useState([])
  let[campaignData,setCampaign] = useState([])
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    // This code will run only once when the component is mounted
    setIsVisible(true);
    console.log('Component mounted.');

    fetch(`http://localhost:5000/campaign`)
    .then(response => response.json())
    .then(data => {
          setData(data)
          console.log(data);
          setIsVisible(false);
    })
    .catch(error => {
      // Handle any errors
      console.error('Error fetching flights:', error);
    });
    
    setIsVisible(false);
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
  
  const deleteCampaign = async (item) => {

    try {
      const response = await fetch(`http://localhost:5000/campaign/${item._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Deleted item with ID: ${item._id}`);
        window.location.reload();
      } else {
        // Handle errors
        console.error(`Failed to delete item with ID: ${item._id}`);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
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
                             <CButton color="danger" onClick={() => deleteCampaign(item)}><CIcon icon={cilTrash} size="md"/></CButton>
                           
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
             <div><strong>Keywords: </strong> {campaignData.campaignKeywords} {" "}</div>
            </CCardHeader>
            
            <CCardBody>
            {isVisible &&  <div className="text-center"> <CSpinner color="primary" /></div>}
  
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
                      <CTableDataCell className="text-center">
                        {/* <div className="clearfix"> */}
                          <div>
                               {item['Followers Count']}
                          </div>
                          {/* <div className="float-end"> */}
                            {/* <small className="text-medium-emphasis">{item.usage.period}</small> */}
                          {/* </div> */}
                        {/* </div> */}
                        {/* <CProgress thin color={blue} value={item['Followers Count']} /> */}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      <div>{item['category']}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {/* <div className="small text-medium-emphasis">Last login</div> */}
                       {item['review_score']}
                       
                      </CTableDataCell>
                      {/* <CTableDataCell className="text-center">
                       {item['hash_tags']}
                      </CTableDataCell> */}
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
