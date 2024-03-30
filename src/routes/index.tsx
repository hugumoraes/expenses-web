/* ---------- External ---------- */
import { createBrowserRouter } from 'react-router-dom';

/* ---------- Components ---------- */
import { private_routes } from '_routes/private';
import { public_routes } from '_routes/public';

const router = createBrowserRouter([private_routes(), public_routes()]);

export { router };
