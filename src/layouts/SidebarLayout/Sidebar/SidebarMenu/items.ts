import { ReactNode } from 'react';

import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import BeachAccessTwoToneIcon from '@mui/icons-material/BeachAccessTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import FilterVintageTwoToneIcon from '@mui/icons-material/FilterVintageTwoTone';
import HowToVoteTwoToneIcon from '@mui/icons-material/HowToVoteTwoTone';
import LocalPharmacyTwoToneIcon from '@mui/icons-material/LocalPharmacyTwoTone';
import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import TrafficTwoToneIcon from '@mui/icons-material/TrafficTwoTone';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';
import { linkClasses } from '@mui/material';


export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: '',
    items: [
      {
        name: 'Overview',
        link: '/overview',
        icon: DesignServicesTwoToneIcon
      }
    ]
  },
  {
    heading: 'Empleados',
    items: [
      {
        name:'Gestion empleados',
        link :'empleados/gestion_empleados',
        icon: SettingsIcon,
        items:[
          {
            name:'Registro Empleados',
            icon: PersonAddIcon,
            link: '/empleados/gestion_empleados/agregar-empleados'
          },
          {
            name:'Editar Empleados',
            icon: AssignmentIndIcon,
            link: '/empleados/gestion_empleados/editar-empleados',
          },
        ]
      }
    ]
  },
  {
    heading: 'Ruta',
    items:[
      {
        name:'Gestion rutas',
        link:'opcionesRuta/gestion_rutas',
        icon:SettingsIcon,
        items:[
          {
            name:'Opciones Rutas',
            icon: CreateIcon,
            link:'/opcionesRuta/gestion_rutas/opciones-ruta',
          },
        ]
      }
    ]
  },
  {
    heading: 'Productos',
    items: [
      {
        name:'Gestion Productos',
        link:'/productos/gestion_productos',
        icon: SettingsIcon,
        items: [
          {
            name:'Registro Productos',
            icon: AddCircleOutlineIcon,
            link: '/productos/gestion_productos/agregar-productos'
          },
          { 
            name:'Editar Productos',
            icon: ModeEditIcon,
            link:'/productos/gestion_productos/editar-productos'
          },
        ]
      }
    ]
  },
 
  {
    heading: 'Clientes',
    items: [
      {
        name: 'Gestion clientes',
        icon: SettingsIcon,
        link: '/clientes/gestion_clientes',
        items:[
          {
            name: 'Registro Clientes',
            icon: AddShoppingCartIcon,
            link: '/clientes/gestion_clientes/agregar-clientes',
          },
          { 
            name:'Editar Clientes',
            icon: HowToRegIcon,
            link:'/clientes/gestion_clientes/editar-clientes',
          },
        ]
      }
      
    ]
  },
  {
    heading: 'SEGUIMIENTO EMPLEADO',
    items: [
      {
        name: 'Gestion seguimiento',
        icon: SettingsIcon,
        link: '/seguimientoEmpleado/gestion_seguimiento',
        items:[
          {
            name: 'Liquidar Ruta',
            icon: AddShoppingCartIcon,
            link: '/seguimientoEmpleado/gestion_seguimiento/liquidar-ruta'
          },
          {
            name:'Asignar Ruta',
            icon: AddLocationAltOutlinedIcon,
            link: '/seguimientoEmpleado/gestion_seguimiento/asignar-ruta'
    
          },
          {
            name:'Despachar Productos',
            icon: FormatListNumberedIcon,
            link: '/seguimientoEmpleado/gestion_seguimiento/despachar-productos'
    
          },
          {
            name:'Recibir Productos',
            icon: FormatListNumberedIcon,
            link: '/seguimientoEmpleado/gestion_seguimiento/recibir-productos'
    
          },
        ]
      }
    ]
  },
  {
    heading: 'Dashboards',
    items: [
      {
        name: 'Crypto',
        link: '/dashboards/crypto',
        icon: BrightnessLowTwoToneIcon
      },
      {
        name: 'Messenger',
        icon: MmsTwoToneIcon,
        link: '/dashboards/messenger'
      },
    ]
  },
  {
    heading: 'Management',
    items: [
      {
        name: 'Transactions',
        icon: TableChartTwoToneIcon,
        link: '/management/transactions'
      },
      {
        name: 'User Profile',
        icon: AccountCircleTwoToneIcon,
        link: '/management/profile',
        items: [
          {
            name: 'Profile Details',
            link: '/management/profile/details'
          },
          {
            name: 'User Settings',
            link: '/management/profile/settings'
          }
        ]
      }
    ]
  },
  {
    heading: 'Admin',
    items: [
      {
        name: 'Buttons',
        icon: BallotTwoToneIcon,
        link: '/admin/buttons'
      },
      {
        name: 'Modals',
        icon: BeachAccessTwoToneIcon,
        link: '/admin/modals'
      },
      {
        name: 'Accordions',
        icon: EmojiEventsTwoToneIcon,
        link: '/admin/accordions'
      },
      {
        name: 'Tabs',
        icon: FilterVintageTwoToneIcon,
        link: '/admin/tabs'
      },
      {
        name: 'Badges',
        icon: HowToVoteTwoToneIcon,
        link: '/admin/badges'
      },
      {
        name: 'Tooltips',
        icon: LocalPharmacyTwoToneIcon,
        link: '/admin/tooltips'
      },
      {
        name: 'Avatars',
        icon: RedeemTwoToneIcon,
        link: '/admin/avatars'
      },
      {
        name: 'Cards',
        icon: SettingsTwoToneIcon,
        link: '/admin/cards'
      },
      {
        name: 'Forms',
        icon: TrafficTwoToneIcon,
        link: '/admin/forms'
      }
    ]
  },
  {
    heading: 'Extra Pages',
    items: [
      {
        name: 'Status',
        icon: VerifiedUserTwoToneIcon,
        link: '/status',
        items: [
          {
            name: 'Error 404',
            link: '/status/404'
          },
          {
            name: 'Error 500',
            link: '/status/500'
          },
          {
            name: 'Maintenance',
            link: '/status/maintenance'
          },
          {
            name: 'Coming Soon',
            link: '/status/coming-soon'
          }
        ]
      }
    ]
  }
];

export default menuItems;
