import React from 'react'
import { CForm, CCol, CFormLabel, CFormInput, CButton} from '@coreui/react'

const MyCampaigns = () => {

  const inlineStyles = {
    margin: '200px',
  };


  return (
    <div style={inlineStyles}>
      <CForm className="row g-3">
  <CCol xs="auto">
    <CFormLabel htmlFor="staticEmail2" className="visually-hidden">Email</CFormLabel>
    <CFormInput type="text" id="staticEmail2" defaultValue="email@example.com" readOnly plainText/>
  </CCol>
  <CCol xs="auto">
    <CFormLabel htmlFor="inputPassword2" className="visually-hidden">Password</CFormLabel>
    <CFormInput type="password" id="inputPassword2" placeholder="Password"/>
  </CCol>
  <CCol xs="auto">
    <CButton type="submit" className="mb-3">Confirm identity</CButton>
  </CCol>
</CForm>
    </div>
  )
}

export default MyCampaigns
