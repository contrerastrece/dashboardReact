const navigation = () => {
  return [
    {
      title: 'Inicio',
      path: '/home',
      icon: 'mdi:home',
    },
    {
      title: 'Compras',
      path: '/compras',
      icon: 'mdi:shopping-cart',
    },
    {
      title: 'Ventas',
      path: '/ventas',
      icon: 'mdi:shopping',
    },
    {
      title: 'Categorias',
      path: '/categorias',
      icon: 'mdi:shopping',
    },
    {
      title: 'Productos',
      path: '/productos',
      icon: 'mdi:shopping',
    },
    {
      title: 'Reportes',
      path: '/reportes',
      icon: 'mdi:chart-bar',
    },
    {
      title: 'Clientes',
      path: '/clientes',
      icon: 'mdi:people',
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'mdi:shield-outline',
    },
  ]
}

export default navigation
