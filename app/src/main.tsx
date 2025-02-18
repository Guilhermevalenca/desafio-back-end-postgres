import { createRoot } from 'react-dom/client';
import './index.scss';
import Routes from "./Routes.tsx";
import 'sweetalert2/src/sweetalert2.scss';

createRoot(document.getElementById('root')!).render(
  <Routes />,
)
