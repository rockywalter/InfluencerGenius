import { CForm, CFormLabel, CFormInput, CFormCheck, CButton,CCard,CCardBody,CCardHeader,CCol,CFormTextarea,CFormSelect} from '@coreui/react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from '@mui/material/TextField';
import { DocsExample } from 'src/components'
import { alignProperty } from '@mui/material/styles/cssUtils';
import { TagsInput } from "react-tag-input-component";


const Analyzer = () => {

    const [expanded, setExpanded] = React.useState(false);
    const [selected, setSelected] = useState([]);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

  
  return (    
    <div>

<CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tell about Your Product</strong>
          </CCardHeader>
          <CCardBody>
          
              <CForm>
                <div className="mb-3">
                 <CFormSelect 
                    aria-label="Default select example"
                    options={['Choose Your Category',
                    { label: 'Technology and Electronics', value: '1' },
                   { label: 'Fashion and Apparel', value: '2' },
                    { label: 'Health and Wellness', value: '3' },
                    { label: 'Personal Development and Education', value: '4' },
                    { label: 'Hospitality and Food Services', value: '5' }
                      ]}
                     />
                </div>
                <div className="mb-3">
                <div>

                 {/* <pre>{JSON.stringify(selected)}</pre> */}

                   <TagsInput
                      value={selected}
                    onChange={setSelected}
                    name="keywords"
                       placeHolder="Enter Keywords"
                   />
                   <em>press enter to add new tag</em>
    </div>
                </div>
                <div className="mb-3">
                <CButton color="success" size="lg" >Satrt Analyzing</CButton>
                </div>
              </CForm>
  
          </CCardBody>
        </CCard>
      </CCol>


  <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            General settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
   
    </div>

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

    
     


    </div>
  )
}

export default Analyzer
