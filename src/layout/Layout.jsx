import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '../components/ui/Container';

export default function Layout() {
  return (
    <Container>
      <Header />
      <Suspense fallback={<div>Loading main content...</div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </Container>
  );
}
