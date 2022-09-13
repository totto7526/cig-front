import { ReactNode } from 'react';

import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


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

const menuItemsSales: MenuItems[] = [
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
            name: 'ventas',
            icon: MonetizationOnIcon,
            link: '/transacciones/gestion_transacciones/ventas',
          }
        ]
      }
    ]
  }
];

export default menuItemsSales;
