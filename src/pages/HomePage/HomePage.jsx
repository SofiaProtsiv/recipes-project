import { Outlet } from 'react-router-dom';
import Hero from '../../components/Hero';
import Testimonials from '../../components/Testimonials';
import { Suspense } from 'react';
import Container from '../../components/ui/Container';
import cl from './homePage.module.scss';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Container addClass={cl.homepage}>
        <Suspense fallback={<div>Loading main content...</div>}>
          <Outlet />
        </Suspense>
      </Container>
      <Testimonials />
    </>
  );
}
