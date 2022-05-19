import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarComp from './components/NavBarComp';
import CreateRoutes from './router'
import { Container } from 'react-bootstrap';

export default function App() {
  return (
    <div>
      <NavBarComp />
      <Container>
        <CreateRoutes />
      </Container>
    </div>
  )
}
