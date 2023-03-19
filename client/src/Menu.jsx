import "./index.css";
const { AppBar, Container, Toolbar, Box, Button } = require("@mui/material");
const { default: React } = require("react");
const { NavLink } = require("react-router-dom");

const pages = [
  { name: "Home", path: "/" },
  { name: "Todos", path: "/todos" },
  { name: "Friends", path: "/friends" },
];

const Menu = () => {
  return (
    <AppBar position="static" style={{ marginBottom: 20 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {pages.map((page, index) => {
            return (
              <NavLink
                to={page.path}
                className={({ isActive }) =>
                  isActive ? "active menu" : "inactive menu"
                }
                key={index}
              >
                {page.name}
              </NavLink>
            );
          })}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Menu;
