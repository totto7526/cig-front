import { ReactNode } from 'react';

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
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeIcon from '@mui/icons-material/Home';


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
        name: 'Inicio',
        link: '/dashboards/cards',
        icon: HomeIcon,
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
    heading:'Transacciones',
    items:[
      {
        name:'Gestion transacciones',
        icon: MonetizationOnIcon,
        link: '/transacciones/gestion_transacciones',
        items:[
          {
            name: 'pago-cuotas',
            icon: MonetizationOnIcon,
            link: '/transacciones/gestion_transacciones/pago-cuotas',
          },
          {
            name: 'ventas',
            icon: MonetizationOnIcon,
            link: '/transacciones/gestion_transacciones/ventas',
          }
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
          {
            name:'Asignar Barrio',
            icon: CreateIcon,
            link:'/opcionesRuta/gestion_rutas/asignar-barrio',
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
  }
];

export default menuItems;
