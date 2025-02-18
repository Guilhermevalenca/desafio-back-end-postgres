import { createRoot } from 'react-dom/client';
import './index.scss';
import Routes from "./Routes.tsx";

createRoot(document.getElementById('root')!).render(
  <Routes />,
)
