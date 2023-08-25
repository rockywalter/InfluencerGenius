import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { CNav, CNavItem, CNavLink, CTabContent, 
    CTabPane,CCard,CCardBody,CCardHeader,CCol,CSpinner,
    CFormSelect,CButton, CFormTextarea, CForm , CFormInput  } from '@coreui/react'
    import * as XLSX from 'xlsx';
    

    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

const AddInfluencers = () => {
    const [activeKey, setActiveKey] = useState(1)
    const [isProcessing, setIsProcessing] = useState(false);
    const[influencerID,setInfluencerID] = useState(0)  
    const[influencerName,setInfluencerName] = useState("")
    const[influencerFollowersCount,setInfluencerFollowersCount] = useState(0)
    const[country,setCountry] = useState("")
    const[scoialMediaPlatform,setScoialMediaPlatform] = useState("")
    const[infDescription,setInfDescription] = useState("")
    const[likeCount,setLikeCount] = useState(0)
    const[commentCount,setCommentCount] = useState(0)
    const[comments,setComment] = useState("")

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };


    const readFile = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve(event.target.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsArrayBuffer(file);
        });
      };

      const parseExcel = (fileData) => {
        const workbook = XLSX.read(fileData, { type: 'array' });
        const jsonDataArrays = [];
      
        workbook.SheetNames.forEach((sheetName) => {
          const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
          jsonDataArrays.push(sheetData);
        });
      
        return jsonDataArrays;
      };
      

    const handleUpload = async () => {
        setIsProcessing(true);
        const selectedFile = document.getElementById('formFile').files[0];
        if (selectedFile) {
          const fileData = await readFile(selectedFile);
          const sheetDataArray = parseExcel(fileData);
    
          if (sheetDataArray.length === 3) {
            handleSheet1(sheetDataArray[0]);
            handleSheet2(sheetDataArray[1]);
            handleSheet3(sheetDataArray[2]);
          }
        }
        setIsProcessing(false);
        setOpen(true);
      };
    
      const handleSheet1 = (data) => {
        for (let i = 1; i < data.length; i++) {
            const rowData = data[i];
            const requestBody = {
              influencer_id: rowData[0],
              "Influencer Name": rowData[1],
              "Followers Count": rowData[2],
              "Country": rowData[3],
              "Social Media Platform": rowData[4],
            }; 
            sendRequest('http://localhost:5000/influencerinfo/add', requestBody);
          }
      };
    
      const handleSheet2 = (data) => {
        for (let i = 1; i < data.length; i++) {
          const rowData = data[i];
          const requestBody = {
            influencer_id: rowData[0],
            description: rowData[1],
            "Like Count for the post": rowData[2],
            "Comment Count for the post": rowData[3],
            "Followers Count for influencer": rowData[4],
          };
    
          sendRequest('http://127.0.0.1:5000/description', requestBody);
        }
      };
    
      const handleSheet3 = (data) => {
        for (let i = 1; i < data.length; i++) {
            const rowData = data[i];
            const requestBody = {
              influencer_id: rowData[0],
              comment: rowData[1],
            };
      
            sendRequest('http://127.0.0.1:5000/comment', requestBody);
          }
      };
    
      const sendRequest = async (apiEndpoint, data) => {
        try {
            fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              })
                .then(response => response.json())
                .then(data => {
              
                  console.log(data);
                
                })
                .catch(error => {
                  console.error('Error fetching data:', error);

                });
        } catch (error) {
          console.error('Error sending API request:', error);
        }
      };
    
      // Define readFile and parseExcel functions

      const handleInfluencersSubmit = (e) => { 
        e.preventDefault();

        const requestBody = {
          influencer_id: parseInt(influencerID),
          "Influencer Name":influencerName,
          "Followers Count":parseInt(influencerFollowersCount),
          "Country":country,
          "Social Media Platform":scoialMediaPlatform,

        
        };

        console.log(requestBody)
        
        sendRequest('http://localhost:5000/influencerinfo/add', requestBody);
        setOpen(true);
      };

      
      const handleDescriptionSubmit = (e) => { 
        e.preventDefault();

        const requestBody = {
          influencer_id: parseInt(influencerID),
          description: infDescription,
          "Like Count for the post": parseInt(likeCount),
          "Comment Count for the post": parseInt(commentCount),
          "Followers Count for influencer": parseInt(influencerFollowersCount)
        
        };

        console.log(requestBody)
        
        sendRequest('http://127.0.0.1:5000/description', requestBody);
        setOpen(true);
      };

      
      const handleCommentSubmit = (e) => { 
        e.preventDefault();

        const requestBody = {
          influencer_id: parseInt(influencerID),
          comment: comments,
      
        
        };

        console.log(requestBody)
        
        sendRequest('http://127.0.0.1:5000/comment', requestBody);
        setOpen(true);
      };

  return (
    <div>

<CCol xs={12}>
  <CCard className="mb-4">
            <CCardHeader>
     <strong>File-Based Update</strong>
            </CCardHeader>
            <CCardBody>
  
  
            <div className="mb-3">
  <CFormInput type="file" id="formFile" label="Upload the influencer data XLSX file!" required accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
</div>

<CButton onClick={handleUpload} className="mb-3">
{isProcessing ? (
        <>
          <CSpinner component="span" size="sm" className="mr-1" />
          Saving...
        </>
      ) : (
        'Save'
      )}
    </CButton>
  

                </CCardBody>
          </CCard>
        </CCol>


        <CCol xs={12}>
  <CCard className="mb-4">
            <CCardHeader>
     <strong>Form-based Update</strong>
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
          onClick={() => setActiveKey(1)}
        >
          Add Influencers
        </CNavLink>
      </CNavItem>
      <CNavItem role="presentation">
        <CNavLink
          active={activeKey === 2}
          component="button"
          role="tab"
          aria-controls="profile-tab-pane"
          aria-selected={activeKey === 2}
          onClick={() => setActiveKey(2)}
        >
          Add Descriptions/Captions
        </CNavLink>
      </CNavItem>
      <CNavItem role="presentation">
        <CNavLink
          active={activeKey === 3}
          component="button"
          role="tab"
          aria-controls="contact-tab-pane"
          aria-selected={activeKey === 3}
          onClick={() => setActiveKey(3)}
        >
          Add Comments
        </CNavLink>
      </CNavItem>
    </CNav>
    <CTabContent>
      <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
      <CForm className="row g-3" onSubmit={handleInfluencersSubmit}>
  <CCol md={4}>
    <CFormInput onChange={(e)=>{setInfluencerID(e.target.value);}}
      type="text"
      id="validationServer01"
      label="Influencer ID"
      // feedback="Looks good!"
      // defaultValue="name@surname.com"
      // valid
      required
    />
  </CCol>
  <CCol md={4}>
    <CFormInput onChange={(e)=>{setInfluencerName(e.target.value);}}
      type="text"
      id="validationServer02"
      label="Influencer Name"
      // feedback="Looks good!"
      // defaultValue="name@surname.com"
      // valid
      required
    />
  </CCol>
  <CCol md={4}>
  <CFormInput onChange={(e)=>{setInfluencerFollowersCount(e.target.value);}}
      type="text"
      id="validationServer02"
      label="Followers Count"
      // feedback="Looks good!"
      // defaultValue="name@surname.com"
      // valid
      required
    />
  </CCol>
  <CCol md={4}>
  <CFormInput onChange={(e)=>{setCountry(e.target.value);}}
      type="text"
      id="validationServer02"
      label="Country"
      // feedback="Looks good!"
      // defaultValue="name@surname.com"
      // valid
      required
    />
  </CCol>
  <CCol md={3}>
    <CFormSelect onChange={(e)=>{setScoialMediaPlatform(e.target.value);}}
      id="validationServer04"
      label="Scial Medai Platform"
      // feedback="Please provide a valid city."
      // invalid
    >
      <option defaultChecked>Choose</option>
      <option >Facebook</option>
      <option>Instagram</option>
      <option>Youtube</option>
    </CFormSelect>
  </CCol>
 

  <CCol xs={12}>
    <CButton color="primary" type="submit">
      Add
    </CButton>
  </CCol>
</CForm>
      </CTabPane>
        


      <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2}>
      <CForm className="row g-3" onSubmit={handleDescriptionSubmit}>
  <CCol md={3}>
    <CFormInput onChange={(e)=>{setInfluencerID(e.target.value);}}
      type="text"
      id="validationServer01"
      label="Influencer ID"
      // feedback="Looks good!"
      // defaultValue="name@surname.com"
      // valid
      required
    />
  </CCol>

  <CCol md={3}>
  <CFormInput onChange={(e)=>{setLikeCount(e.target.value);}}
      type="text"
      id="validationServer02"
      label="Like Count"
      // feedback="Looks good!"
      // defaultValue="name@surname.com"
      // valid
      required
    />
  </CCol>
  <CCol md={3}>
  <CFormInput onChange={(e)=>{setCommentCount(e.target.value);}}
      type="text"
      id="validationServer02"
      label="Comment Count"
      // feedback="Looks good!"
      // defaultValue="name@surname.com"
      // valid
      required
    />
  </CCol>
  <CCol md={3}>
  <CFormInput onChange={(e)=>{setInfluencerFollowersCount(e.target.value);}}
      type="text"
      id="validationServer02"
      label="Followers Count"
      // feedback="Looks good!"
      // defaultValue="name@surname.com"
      // valid
      required
    />
  </CCol>
  <CCol md={12}>
    <CFormTextarea onChange={(e)=>{setInfDescription(e.target.value);}}
      type="text"
      id="validationServer02"
      label="Description/Caption"
      // feedback="Looks good!"
      // defaultValue="name@surname.com"
      // valid
      required
    />
  </CCol>

  <CCol xs={12}>
    <CButton color="primary" type="submit">
      Add
    </CButton>
  </CCol>
</CForm> 
      </CTabPane>



      <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 3}>
      <CForm className="row g-3" onSubmit={handleCommentSubmit}>
  <CCol md={12}>
    <CFormInput onChange={(e)=>{setInfluencerID(e.target.value);}}
      type="text"
      id="validationServer01"
      label="Influencer ID"
      // feedback="Looks good!"
      // defaultValue="name@surname.com"
      // valid
      required
    />
  </CCol>
  
  <CCol md={12}>
  <CFormTextarea onChange={(e)=>{setComment(e.target.value);}}
      feedbackInvalid="Please enter a comment"
      id="validationTextarea"
      label="Comment"
      placeholder="Type a Comment"
      required
    ></CFormTextarea>
  </CCol>

 

  <CCol xs={12}>
    <CButton color="primary" type="submit">
      Add
    </CButton>
  </CCol>
</CForm>
      </CTabPane>
 
    </CTabContent>
  

                </CCardBody>
          </CCard>
        </CCol>


 
 
 
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Successfully Saved!
        </Alert>
      </Snackbar>



    
   
    </div>
  )
}

export default AddInfluencers
