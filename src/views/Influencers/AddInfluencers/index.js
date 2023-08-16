import React, { useEffect ,useState } from 'react';
import { CNav, CNavItem, CNavLink, CTabContent, 
    CTabPane,CCard,CCardBody,CCardHeader,CCol,CSpinner,
    CTableBody,CTableDataCell,CAvatar,CProgress,CTable,CButtonGroup,CButton,
    CModalHeader, CFormTextarea, CForm , CFormInput  } from '@coreui/react'
    import * as XLSX from 'xlsx';

const AddInfluencers = () => {
    const [activeKey, setActiveKey] = useState(1)
    const [isProcessing, setIsProcessing] = useState(false);

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



  return (
    <div>

<CCol xs={12}>
  <CCard className="mb-4">
            <CCardHeader>
     <strong>File-Based Update</strong>
            </CCardHeader>
            <CCardBody>
  
  
            <div className="mb-3">
  <CFormInput type="file" id="formFile" label="Upload the influencer data XLSX file!" />
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
          Home
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
          Profile
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
          Contact
        </CNavLink>
      </CNavItem>
      <CNavItem role="presentation">
        <CNavLink
          active={activeKey === 4}
          component="button"
          disabled
          role="tab"
          aria-controls="disabled-tab-pane"
          aria-selected={activeKey === 4}
          onClick={() => setActiveKey(4)}
        >
          Disabled
        </CNavLink>
      </CNavItem>
    </CNav>
    <CTabContent>
      <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
      <CForm validated={true}>
  <div className="mb-3">
    <CFormTextarea
      feedbackInvalid="Please enter a message in the textarea."
      id="validationTextarea"
      label="Textarea"
      placeholder="Required example textarea"
      required
    ></CFormTextarea>
  </div>
  
  <div className="mb-3">
    <CFormInput
      type="file"
      id="validationTextarea"
      feedbackInvalid="Example invalid form file feedback"
      aria-label="file example"
      required
    />
  </div>
  <div className="mb-3">
    <CButton type="submit" color="primary" disabled>
      Submit form
    </CButton>
  </div>
</CForm>
      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2}>
        Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid.
        Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan
        four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft
        beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic,
        assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero
        magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit,
        sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party
        scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.
      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 3}>
        Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic
        lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork
        tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie
        helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.
        Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro
        mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog
        stumptown. Pitchfork sustainable tofu synth chambray yr.
      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="disabled-tab-pane" visible={activeKey === 3}>
        Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic
        lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork
        tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica.
        DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh
        mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog.
        Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown.
        Pitchfork sustainable tofu synth chambray yr.
      </CTabPane>
    </CTabContent>
  

                </CCardBody>
          </CCard>
        </CCol>







    
   
    </div>
  )
}

export default AddInfluencers
