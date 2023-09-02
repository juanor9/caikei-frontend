import TopNav from '../../components/TopNav/TopNav';
import AllPlans from '../../feature/plans/components/AllPlans/AllPlans';

const PlansPage = () => (
  <div className="plans">
    <TopNav />
    <main className="plans__main-container">
      <h2>Planes de suscripción</h2>
      <AllPlans />
    </main>
  </div>
);

export default PlansPage;
