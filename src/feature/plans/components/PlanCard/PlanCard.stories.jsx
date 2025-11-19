import PlanCard from './PlanCard';

export default {
  title: 'Features/Plans/PlanCard',
  component: PlanCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const FreePlan = {
  args: {
    plan: 'Plan Gratuito',
    cost: 0,
    titles: 10,
  },
};

export const BasicPlan = {
  args: {
    plan: 'Plan Basico',
    cost: 29900,
    titles: 20,
  },
};

export const StandardPlan = {
  args: {
    plan: 'Plan Estandar',
    cost: 49900,
    titles: 60,
  },
};

export const PremiumPlan = {
  args: {
    plan: 'Plan Premium',
    cost: 99900,
    titles: 200,
  },
};

export const EnterprisePlan = {
  args: {
    plan: 'Plan Empresarial',
    cost: 199900,
    titles: 400,
  },
};
