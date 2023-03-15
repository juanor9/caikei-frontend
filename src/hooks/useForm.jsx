import { useState } from 'react';

const useForm = (initialValue) => {
  const [form, setForm] = useState(initialValue);
  const handleChange = ({ target }) => {
    const { value, name, type } = target;
    if (type === 'radio') {
      setForm({ ...form, [name]: value });
    } else if (type === 'checkbox') {
      const values = form[name] || [];
      if (target.checked) {
        setForm({ ...form, [name]: [...values, value] });
      } else {
        setForm({ ...form, [name]: values.filter((v) => v !== value) });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  return {
    form,
    handleChange,
  };
};

export default useForm;
