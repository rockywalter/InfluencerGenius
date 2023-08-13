import { CForm, CTableHead, CTableRow, CTableHeaderCell, 
  CButton,CCard,CCardBody,CCardHeader,CCol,CFormSelect,
  CTableBody,CTableDataCell,CAvatar,CTable,CRow, CModal,
  CModalHeader, CModalTitle, CModalBody, CModalFooter,CFormInput} from '@coreui/react'
  import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from '@mui/x-charts';
  import { CChart } from '@coreui/react-chartjs'
  import CIcon from '@coreui/icons-react'
  import Accordion from '@mui/material/Accordion';
  import AccordionDetails from '@mui/material/AccordionDetails';
  import AccordionSummary from '@mui/material/AccordionSummary';
  import Typography from '@mui/material/Typography';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import React, {useEffect,useState } from 'react';
  import Box from "@mui/material/Box";
  import Container from "@mui/material/Container";
  import TextField from '@mui/material/TextField';
  import { DocsExample } from 'src/components'
  import { alignProperty } from '@mui/material/styles/cssUtils';
  import { TagsInput } from "react-tag-input-component";
import LinearProgress from '@mui/material/LinearProgress';
  import {
    cilLibraryAdd,
    cibCcApplePay,
    cibCcMastercard,
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
    cilSearch,
  } from '@coreui/icons'
  import avatar1 from 'src/assets/images/avatars/1.jpg'
  import avatar2 from 'src/assets/images/avatars/2.jpg'
  import avatar3 from 'src/assets/images/avatars/3.jpg'
  import avatar4 from 'src/assets/images/avatars/4.jpg'
  import avatar5 from 'src/assets/images/avatars/5.jpg'
  import avatar6 from 'src/assets/images/avatars/6.jpg'

  
  import {CCardImage,CCardTitle,CCardText} from '@coreui/react'
  
  
  const Analyzer = () => {

    

    let[fetcheddata,setData] = useState([])

  
      const [expanded, setExpanded] = React.useState(false);
      const [selected, setSelected] = useState([]);
      
  
      const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
  
  
      const tableavatar = [ avatar1,avatar2,avatar3 ,avatar4 ,avatar5 ,avatar6]
   
    
      const progressGroupExample1 = [
        { title: 'Monday', value1: 34, value2: 50 },
        { title: 'Tuesday', value1: 56, value2: 94 },
        { title: 'Wednesday', value1: 12, value2: 67 },
        { title: 'Thursday', value1: 43, value2: 91 },
        { title: 'Friday', value1: 22, value2: 73 },
        { title: 'Saturday', value1: 53, value2: 82 },
        { title: 'Sunday', value1: 9, value2: 69 },
      ]
  
      const progressGroupExample2 = [
        { title: 'Male', icon: cilUser, value: 53 },
        { title: 'Female', icon: cilUserFemale, value: 43 },
      ]
    
      const progressGroupExample3 = [
        { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
        { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
        { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
        { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
      ]
    

      const[category,setCategory] = useState("")
      const[keywords,setKeywords] = useState([])
      let[influencers,setInfluencersData] = useState([])
      const [influencerNames, setInfluencerNames] = useState([]);
      const [influencerFollowers, setInfluencerFollowers] = useState([]);


      useEffect(() => {
        console.log("Updated influencers:", influencers);
      }, [influencers]);

      const [isLoading, setIsLoading] = useState(false);
      const [isShowingResults, setIsShowingResults] = useState(false);

      const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(category)
        console.log(keywords)
    
        const productData = {
          "hash_tags":keywords,
          "category":category
        };
        
        fetch('http://127.0.0.1:5000/influencer', {
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
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setIsLoading(false);
            setIsShowingResults(false)
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
          });
          setVisible(false)
         
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
                    <CTableHeaderCell className="text-center">Category</CTableHeaderCell>
                    <CTableHeaderCell>Review Score</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>   
                  {influencers.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                      
                         <CAvatar size="md" src={"de"}  /> 
                          
                       
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

              <BarChart
  xAxis={[
    {
      id: 'barCategories',
      data: influencerNames,
      scaleType: 'band',
    },
  ]}
  series={[
    {
      data:[1,2,3,4,5,6,7,8,98,5,3]
    },
  ]}
  width={1500}
  height={300}
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
                
       {/* <Container component="main" maxWidth="sm">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor:"#46546C"
          }}
        >
         
        </Box>
      </Container> */}
  
  
  {/* <>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
          <CCard style={{ width: '18rem' }}>
    <CCardImage orientation="top"  src={"https://i.ibb.co/8z1nt7x/2.png"}/>
    <CCardBody>
      <CCardTitle>Card title</CCardTitle>
      <CCardText>
        Some quick example text to build on the card title and make up the bulk of the 
      </CCardText>
    </CCardBody>
    <CCardBody>
      <CCardLink href="#">Card link</CCardLink>
      <CCardLink href="#">Another link</CCardLink>
    </CCardBody>
  </CCard>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
          </SwiperSlide>
       
        </Swiper>
      </> */}
      
       
  
  
  
  
      </div>
    )
  }
  
  export default Analyzer
  