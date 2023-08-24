import React, { useEffect ,useState } from 'react';
import { CNav, CNavItem, CNavLink, CTabContent, 
  CTabPane,CCard,CCardBody,CCardHeader,CCol,CSpinner,
  CTableBody,CTableDataCell,CAvatar,CProgress,CTable,CButtonGroup,CButton,
  CModalHeader, CModalTitle, CModalBody, CFormInput  } from '@coreui/react'
import { DataGrid } from '@mui/x-data-grid'; 
import { v4 as uuidv4 } from 'uuid';
  

const ViewInfluencers = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [influencerRows, setInfRows] = useState([]);
  const [CommentRows, setCommentRows] = useState([]);
  const [desRows, setDesRows] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  
  const clickDes =  () => {
    setActiveKey(2)
    setIsVisible(true);
    fetch(`http://localhost:5000/descriptions`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const newRow = data.map(item => {
          return {
            id: item._id,
            influencer_id: item.influencer_id,
              description: item.description,
              likeCount: item["Like Count for the post"],
              commentCount: item["Comment Count for the post"],
              followersCount: item["Followers Count for influencer"],
              category: item.category,
          };
      }); 
      setDesRows(newRow);
      setIsVisible(false);
    })
  }

  const clickInf =  () => {
    setActiveKey(1)
    setIsVisible(true);
    fetch(`http://localhost:5000/influencerinfo`)
    .then(response => response.json())
    .then(data => {
       
        const newRow = data.map(item => {
          return {
              id: item._id,
              influencer_id: item.influencer_id,
              influencerName: item["Influencer Name"],
              followersCount: item["Followers Count"],
              country: item.Country,
              socialMediaPlatform: item["Social Media Platform"]
          };
      }); 
      setInfRows(newRow);
      setIsVisible(false);

    })
  }

  const clickComment =  () => {
    setActiveKey(3)
    setIsVisible(true);
    fetch(`http://localhost:5000/comments`)
    .then(response => response.json())
    .then(data => {
       
        const newRow = data.map(item => {
          return {
             
              id: item._id,
              influencer_id: item.influencer_id,
              comment: item.comment,
              sentiment: item.sentiment,
          };
      }); 
    
      setCommentRows(newRow);
      setIsVisible(false);
  

    })
  }


  const influencerColumns = [
    { field: 'influencer_id', headerName: 'ID',type: 'number', width: 70 },
    { field: 'influencerName', headerName: 'Influencer Name', width: 160 },
    { field: 'followersCount', headerName: 'Followers Count',type: 'number', width: 130 },
    {
      field: 'country',
      headerName: 'Country',
      width: 90,
    },
    {
      field: 'socialMediaPlatform',
      headerName: 'Social Media Platform',
      description: 'This column has a value getter and is not sortable.',
      width: 160,
    },
  ];

  const desColumns = [
    { field: 'influencer_id', headerName: 'ID',type: 'number', width: 70 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'likeCount', headerName: 'Like Count',type: 'number', width: 150 },
    {
      field: 'commentCount',
      headerName: 'Comment Count',
      width: 160,
      type: 'number'
    },
    {
      field: 'followersCount',
      headerName: 'Followers Count',
      description: 'This column has a value getter and is not sortable.',
      width: 160,
      type: 'number'
    },
    {
      field: 'category',
      headerName: 'Category',
      description: 'This column has a value getter and is not sortable.',
      width: 200,
    },
  ];

  const commentsColumns = [
    { field: 'influencer_id', headerName: 'ID',type: 'number', width: 70 },
    { field: 'comment', headerName: 'Comment', width: 300 },
    { field: 'sentiment', headerName: 'Sentiment', width: 130 },
  ];


  useEffect(() => {
    setIsVisible(true);
    console.log('Component mounted.');
   

    fetch(`http://localhost:5000/influencerinfo`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const newRow = data.map(item => {
          return {
            id: item._id,
            influencer_id: item.influencer_id,
              influencerName: item["Influencer Name"],
              followersCount: item["Followers Count"],
              country: item.Country,
              socialMediaPlatform: item["Social Media Platform"]
          };
      }); 
      setInfRows(newRow);
      setIsVisible(false);
    })


    .catch(error => {
      // Handle any errors
      console.error('Error fetching influencers:', error);
    });
  

  
  
    return () => {
      console.log('Component unmounted.');
    };
  }, []);


  

  return (
    <div>
   
<CCol xs={12}>
  <CCard className="mb-4">
            <CCardHeader>

            </CCardHeader>
            <CCardBody>
  
            <CNav variant="tabs" role="tablist">
      <CNavItem role="presentation">
        <CNavLink
          active={activeKey === 1}
          component="button"
          role="tab"
          aria-controls="home-tab-pane"
          aria-selected={activeKey === 1}
          onClick={clickInf}
        >
          Influencer Details
        </CNavLink>
      </CNavItem>
      <CNavItem role="presentation">
        <CNavLink
          active={activeKey === 2}
          component="button"
          role="tab"
          aria-controls="profile-tab-pane"
          aria-selected={activeKey === 2}
          onClick={clickDes}
        >
          Discription Details
        </CNavLink>
      </CNavItem>
      <CNavItem role="presentation">
        <CNavLink
          active={activeKey === 3}
          component="button"
          role="tab"
          aria-controls="contact-tab-pane"
          aria-selected={activeKey === 3}
          onClick={clickComment}
        >
          Comment Details
        </CNavLink>
      </CNavItem>

    </CNav>

    <CTabContent>
      <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
      <div style={{ height: 400, width: '100%' }}>
      {isVisible &&  <div className="text-center"> <CSpinner color="primary" /> Fetching Data..</div>}
      <DataGrid
        rows={influencerRows}
        columns={influencerColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        
      />
    </div>
      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2}>
      <div style={{ height: 400, width: '100%' }}>
      {isVisible && <div className="text-center"> <CSpinner color="primary" /> Fetching Data..</div> }
      <DataGrid
           rows={desRows}
           columns={desColumns}
           getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 3}>
      <div style={{ height: 400, width: '100%' }}>
      {isVisible &&  <div className="text-center"> <CSpinner color="primary" /> Fetching Data..</div>}
      <DataGrid
        rows={CommentRows}
        columns={commentsColumns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
      </CTabPane>

    </CTabContent>

                </CCardBody>
          </CCard>
        </CCol>


    </div>
  )
}

export default ViewInfluencers
