import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlans } from '../../services/plans';
import PlanCard from '../PlanCard/PlanCard';
import './AllPlans.scss';

const AllPlans = () => {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem('login-token');
  const { plans } = useSelector((state) => state.plans);

  useEffect(() => {
    dispatch(getAllPlans(userToken));
  }, []);
  return (
    <article className="allPlans__container">
      {plans
        ? plans.map((plan) => (
          plan.plan !== 'especial' ? <PlanCard key={plan._id} plan={plan.plan} cost={plan.cost} titles={plan.titles} /> : null
        ))
        : null}
    </article>
  );
};

export default AllPlans;
