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
    component: CNavItem,
    name: 'All Campaigns',
    to: '/campaigns/mycampaigns',
    icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
  },

]

export default _nav
