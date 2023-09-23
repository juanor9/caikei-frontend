import { useEffect, useState } from 'react';
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

  const [$plans, set$Plans] = useState(null);

  useEffect(() => {
    if (Array.isArray(plans)) {
      const sortedPlans = [...plans].sort((a, b) => a.cost - b.cost);
      set$Plans(sortedPlans);
    }
  }, [plans]);
  return (
    <article className="allPlans__container">
      {$plans
        ? $plans.map((plan) => (
          plan.plan !== 'especial' ? <PlanCard key={plan._id} plan={plan.plan} cost={plan.cost} titles={plan.titles} /> : null
        ))
        : null}
    </article>
  );
};

export default AllPlans;
