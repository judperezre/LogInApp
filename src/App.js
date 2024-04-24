import { Routes, Route, Outlet,} from "react-router-dom";
import LoginForm from "./loginForm.jsx";
import PokemonTable from './PokemonTable.jsx'; // Ajusta la ruta de importación si es necesario



export default function App() {
  return (
      <div>

        {/* Routes nest inside one another. Nested route paths build upon
              parent route paths, and nested route elements render inside
              parent route elements. See the note about <Outlet> below. */}
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<LoginForm/>}/>
            <Route path="/pokemontable" element={<PokemonTable />}/>
          </Route>
        </Routes>
      </div>
  );
}

function Layout() {
  return (
      <Outlet />
  );
}
