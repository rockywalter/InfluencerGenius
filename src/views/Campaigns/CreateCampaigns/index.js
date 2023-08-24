// import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton} from '@coreui/react'
// import React, { useState } from 'react';
// import { TagsInput } from "react-tag-input-component";

// const CreateCampaigns = () => {

//   const [selected, setSelected] = useState(["papaya"]);
//   const [visible, setVisible] = useState(true)

//   return (
//     <div>


//     <CModal visible={visible} onClose={() => setVisible(false)}>
//       <CModalHeader onClose={() => setVisible(false)}>
//         <CModalTitle>Modal title</CModalTitle>
//       </CModalHeader>
//       <CModalBody>
//         <p>Woohoo, you're reading this text in a modal!</p>
//       </CModalBody>
//       <CModalFooter>
//         <CButton color="secondary" onClick={() => setVisible(false)}>
//           Close
//         </CButton>
//         <CButton color="primary">Save changes</CButton>
//       </CModalFooter>
//     </CModal>



//     <div>
//       <h1>Add Fruits</h1>

//       <pre>{JSON.stringify(selected)}</pre>

//       <TagsInput
//         value={selected}
//         onChange={setSelected}
//         name="fruits"
//         placeHolder="enter fruits"
//       />
//       <em>press enter to add new tag</em>
//     </div>


//     </div>





//   )
// }

// export default CreateCampaigns