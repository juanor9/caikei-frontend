import { useState } from 'react';

const useForm = (initialValue) => {
  const [form, setForm] = useState(initialValue);

  const handleChange = ({ target }) => {
    const { value, name, type } = target;
    if (type === 'radio') {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: value });
    }
    // console.log(form);
  };

  return {
    form,
    handleChange,
  };
};

export default useForm;
