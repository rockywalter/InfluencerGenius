import { CForm, CTableHead, CTableRow, CTableHeaderCell, 
  CButton,CCard,CCardBody,CCardHeader,CCol,CFormSelect,
  CTableBody,CTableDataCell,CAvatar,CTable, CModal,
  CModalHeader, CModalTitle, CModalBody, CModalFooter,CFormInput,CFormSwitch,CSpinner } from '@coreui/react'
  import { CChart } from '@coreui/react-chartjs'
  import CIcon from '@coreui/icons-react'
  import React, {useEffect,useState } from 'react';
  import Box from "@mui/material/Box";
  import { TagsInput } from "react-tag-input-component";
import LinearProgress from '@mui/material/LinearProgress';
import { getStyle } from '@coreui/utils'
  import {
    cilLibraryAdd,
    cilPeople,
    cilSave,
    cilSearch,
  } from '@coreui/icons'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
  import avatar1 from 'src/assets/images/avatars/1.jpg'
  import avatar2 from 'src/assets/images/avatars/2.jpg'
  import avatar3 from 'src/assets/images/avatars/3.jpg'
  import avatar4 from 'src/assets/images/avatars/4.jpg'
  import avatar5 from 'src/assets/images/avatars/5.jpg'
  import avatar6 from 'src/assets/images/avatars/6.jpg'
  import avatar7 from 'src/assets/images/avatars/7.jpg'
  import avatar8 from 'src/assets/images/avatars/8.jpg'
  import avatar9 from 'src/assets/images/avatars/9.jpg'
  import avatar10 from 'src/assets/images/avatars/10.jpg'
  import avatar11 from 'src/assets/images/avatars/11.jpg'
  import avatar12 from 'src/assets/images/avatars/12.jpg'
  import avatar13 from 'src/assets/images/avatars/13.jpg'
  import avatar14 from 'src/assets/images/avatars/14.jpg'
  import avatar15 from 'src/assets/images/avatars/15.jpg'
  import avatar16 from 'src/assets/images/avatars/16.jpg'
  import avatar17 from 'src/assets/images/avatars/17.jpg'
  import avatar18 from 'src/assets/images/avatars/18.jpg'
  import avatar19 from 'src/assets/images/avatars/19.jpg'
  import avatar20 from 'src/assets/images/avatars/20.jpg'


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
  
  const Analyzer = () => {

    const [open, setOpen] = React.useState(false);
    const [openError, setErrorOpen] = React.useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const sentences = ['Counting Category Posts...', 'Calculating Review Score...', 'Matching Keywords...'];
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [displaying, setDisplaying] = useState(false);


    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
     
    const avatarImages = [
      avatar1,  
      avatar2,  
      avatar3,  
      avatar4,
      avatar5,
      avatar6,
      avatar7,
      avatar8,
      avatar9,
      avatar10,
      avatar11,  
      avatar12,  
      avatar13,  
      avatar14,
      avatar15,
      avatar16,
      avatar17,
      avatar18,
      avatar19,
      avatar20,
      
    ];

    
  
   

      const[category,setCategory] = useState("")
      const[keywords,setKeywords] = useState([])
      let[influencers,setInfluencersData] = useState([])
      const [influencerNames, setInfluencerNames] = useState([]);
      const [influencerFollowers, setInfluencerFollowers] = useState([]);

      

      useEffect(() => {
        console.log("Updated influencers:", influencers);
      }, [influencers]);

      useEffect(() => {
        let interval;
    
        if (displaying) {
          interval = setInterval(() => {
            setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
          }, 1500); // Change the interval time (in milliseconds) as needed
        } else {
          clearInterval(interval);
        }
    
        return () => clearInterval(interval);
      }, [displaying, sentences.length]);
    

      const [isLoading, setIsLoading] = useState(false);
      const [isShowingResults, setIsShowingResults] = useState(false);

      const handleSubmit = async (e) => {
        e.preventDefault();
        setDisplaying(!displaying)
        setIsShowingResults(false)
        setIsLoading(true);     
        console.log(category)
        console.log(keywords)
    
        const productData = {
          "hash_tags":keywords,
          "category":category
        };
         
        let requestURL = '';

        if (isChecked) {
          requestURL = 'http://127.0.0.1:5000/influencerwithoutfollowers';
        } else {
          requestURL = 'http://127.0.0.1:5000/influencer';
        } 

        
        await fetch(requestURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productData)
        })
          .then(response => response.json())
          .then(data => {
            setInfluencersData(data);
            console.log(data);
            console.log("hello");
            console.log(influencers);
            const names = data.map(item => item["Influencer Name"]);
          setInfluencerNames(names);
          const followers = data.map(item => item["Followers Count"]);
          setInfluencerFollowers(followers);
            setIsLoading(false);
            setDisplaying(false)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setIsLoading(false);
            setIsShowingResults(false)
            setErrorOpen(true)
            setDisplaying(false)
          });
 

          


          setIsShowingResults(true)
        
      };

      const [visible, setVisible] = useState(false)  
      const[campaignName,setCampaignName] = useState("")

      const saveCampaign = () => {
        
        const campaignData = {
          "campaignName": campaignName,
          "category": category,
          "campaignKeywords": keywords,
          "influencers": influencers
        };
        
        fetch('http://localhost:5000/campaign/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(campaignData)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setErrorOpen(true)
          });
          setVisible(false)
          setOpen(true);
         
      };
  
    
    return (    
      <div>
     
      
  <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Tell about Your Product</strong>
            </CCardHeader>
            <CCardBody>
            
                <CForm onSubmit={handleSubmit}> 
                  <div className="mb-3">
                   <CFormSelect onChange={(e)=>{setCategory(e.target.value);}}
                      aria-label="Default select example"
                      options={['Choose Your Category',
                      { label: 'Technology and Electronics', value: 'Technology and Electronics' },
                     { label: 'Fashion and Apparel', value: 'Fashion and Apparel' },
                      { label: 'Health and Wellness', value: 'Health and Wellness' },
                      { label: 'Personal Development and Education', value: 'Personal Development and Education' },
                      { label: 'Hospitality and Food Services', value: 'Hospitality and Food Services' }
                        ]}
                       />
                  </div>
                  <div className="mb-3">
                  <div>
  
                   {/* <pre>{JSON.stringify(selected)}</pre> */}
  
                     <TagsInput
                        value={keywords}
                      onChange={setKeywords}
                      name="keywords"
                         placeHolder="Enter Keywords"
                     />
                     <em>press enter to add new tag</em>
      </div>                                 
                  </div>
                  <CFormSwitch label="Disable Follower Count Sorting" id="formSwitchCheckDefault" onChange={(event) => setIsChecked(event.target.checked)}/>
                  {/* <CFormCheck id="flexCheckDefault" label="Don't sort by follower count"  onChange={(event) => setIsChecked(event.target.checked)}/> */}
                  <div className="d-grid gap-2 col-3 mx-auto">
                    <CButton color="success" type='submit'>Analyze <CIcon icon={cilSearch} size="md"/></CButton>
                  </div>
                        
                </CForm>
            
            </CCardBody>
           
            {isLoading && (
        <Box sx={{ width: '100%' }}>
        <LinearProgress />
          </Box>
      )}

          </CCard>
        </CCol>

     
  
  <br/>

  
         { displaying &&  <div className="text-center"><h5>{sentences[currentSentenceIndex]}</h5> <CSpinner color="primary" /></div> }
            



  {isShowingResults && (

<CCol xs={12}>
<CCard className="mb-4" >
          <CCardHeader>
          {/* <CButton color="primary"   >Save <CIcon icon={cilSave} size="md"/></CButton> */}
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton color="primary" className="me-md-2" onClick={() => setVisible(!visible)}><CIcon icon={cilSave} size="md"/> Save</CButton>
               </div>
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
                    <CTableHeaderCell className="text-center">Category Posts</CTableHeaderCell>
                    <CTableHeaderCell>Review Score</CTableHeaderCell>
                    <CTableHeaderCell>Keyword Frequency</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>   
                  {influencers.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                      
                         <CAvatar size="md" src={avatarImages[index % avatarImages.length]} /> 
                         {/* <CIcon icon={cilUser} size="md"/>  */}
                       
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
                      <CTableDataCell className="text-center">
                       {item['hash_tags']}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

              <CChart 
  type="bar"
  data={{
    labels:influencerNames,
    datasets: [
      {
        label: 'Followers Count',
        backgroundColor: '#4DC374',
        data: influencerFollowers,
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
      </CCol>
  
  )}


  

        <>
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>  <CIcon icon={cilLibraryAdd} size="lg"/> Campaign Name</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CFormInput type="text" placeholder="Enter Name" aria-label="default input example" onChange={
        (e)=>{setCampaignName(e.target.value);}}/>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary" onClick={saveCampaign}>Create</CButton>
      </CModalFooter>
    </CModal>
  </>
                
 
  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Campaign Saved!
        </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Something went wrong!
        </Alert>
      </Snackbar>
  
   
  
  
      </div>
    )
  }
  
  export default Analyzer
  