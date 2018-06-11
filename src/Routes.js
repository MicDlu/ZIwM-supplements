import Products from './pages/Products';
import Producers from './pages/Producers';
import Substances from './pages/Substances';
import Symptoms from './pages/Symptoms';
import Conflicts from './pages/Conflicts';


export default [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: Products
  },
  {
    path: '/products',
    component: Products
  },
  {
    path: '/producers',
    component: Producers
  },
  {
    path: '/substances',
    component: Substances
  },
  {
    path: '/symptoms',
    component: Symptoms
  },
  {
    path: '/conflicts',
    component: Conflicts
  }
]
