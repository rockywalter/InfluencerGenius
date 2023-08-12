import React, { useEffect ,useState } from 'react';
import { CNav, CNavItem, CNavLink, CTabContent, 
    CTabPane,CCard,CCardBody,CCardHeader,CCol,CSpinner,
    CTableBody,CTableDataCell,CAvatar,CProgress,CTable,CButtonGroup,CButton,
    CModalHeader, CModalTitle, CModalBody, CFormInput  } from '@coreui/react'
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
     <strong>Update through a File!</strong>
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
     <strong>Update through a File!</strong>
            </CCardHeader>
            <CCardBody>
  
  
  

                </CCardBody>
          </CCard>
        </CCol>







    
   
    </div>
  )
}

export default AddInfluencers
