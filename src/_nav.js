import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilSearch,
  cilLibraryAdd,
  cilBookmark
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: '',
    },   
  },
  {
    component: CNavTitle,
    name: 'Influencers Analysis',
  },
  {
    component: CNavItem,
    name: 'Analyzer',
    to: '/analyzer',
    icon: <CIcon icon={cilSearch} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Campaigns',
  },
  {
    component: CNavItem,
    name: 'Create Campaigns',
    to: '/campaigns/createcampaigns',
    icon: <CIcon icon={cilLibraryAdd} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'My Campaigns',
    to: '/mycampaings',
    icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'NIBM Campaigns',
        to: '/campaigns/mycampaigns',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },

]

export default _nav
