import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useForm from '../../../../hooks/useForm';
import { getUser } from '../../../users/services/users';
import { getBooksByPublisher } from '../../../books/services/books';
import { getLibrariesById } from '../../../libraries/services/libraries';
import { createMovement } from '../../services/movements';
import FormHeader from './FormHeader/FormHeader';
import MovementTypeSelector from './MovementTypeSelector/MovementTypeSelector';
import BookDetailsForm from './BookDetailsForm/BookDetailsForm';
import BooksSelector from './BooksSelector/BooksSelector';
import RegisterDevolutionForm from '../RegisterDevolutionForm/RegisterDevolutionForm';
import RegisterRemisionForm from '../RegisterRemisionForm/RegisterRemisionForm';
import RegisterSaleForm from '../RegisterSaleForm/RegisterSaleForm';
import MovementTotals from './MovementTotals/MovementTotals';
import './MovementRegisterForm.scss';

const MovementRegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleChange } = useForm({});
  const { publisher } = useSelector((state) => state.user.userData);
  const userToken = localStorage.getItem('login-token');

  const [kind, setKind] = useState('');
  const [remisionFrom, setRemisionFrom] = useState(null);
  const [remisionTo, setRemisionTo] = useState(null);
  const [remisionDiscount, setremisionDiscount] = useState(0);
  const [salesDiscount, setSalesDiscount] = useState(0);
  const [internalId, setInternalId] = useState(null);
  const [date, setDate] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState(null);
  const [formBookData, setFormBookData] = useState([]);
  const [grossTotal, setGrossTotal] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [formfulldata, setFormfulldata] = useState({});

  useEffect(() => {
    if (userToken) {
      try {
        dispatch(getUser(userToken));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [userToken]);

  useEffect(() => {
    if (publisher) {
      try {
        dispatch(getBooksByPublisher({ publisher, userToken }));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [publisher]);

  useEffect(() => {
    if (remisionTo) {
      dispatch(getLibrariesById({ id: remisionTo, userToken }));
    }
  }, [remisionTo]);

  useEffect(() => {
    setFormfulldata((prevState) => ({
      ...prevState,
      internalId,
      date,
      kind,
      books: formBookData,
      grossTotal,
      publisher,
      createdBy: publisher,
      ...(kind === 'remisión' && {
        netTotal, from: remisionFrom, to: remisionTo, discount: remisionDiscount,
      }),
      ...(kind === 'devolución' && { from: remisionFrom, to: remisionTo }),
      ...(kind === 'liquidación' && { netTotal, from: remisionFrom, discount: salesDiscount }),
    }));
  }, [
    internalId, date, kind, formBookData, grossTotal,
    netTotal, remisionFrom, remisionTo, remisionDiscount,
    salesDiscount, publisher,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(createMovement({ formfulldata, userToken }));
      navigate('/movements');
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <form action="" className="movement-form" onSubmit={handleSubmit}>
      <FormHeader
        setId={setInternalId}
        internalId={internalId}
        setDate={setDate}
      />
      <MovementTypeSelector setKind={setKind} handleChange={handleChange} />

      {kind === 'remisión' && (
        <RegisterRemisionForm
          from={setRemisionFrom}
          to={setRemisionTo}
          remisionDiscount={remisionDiscount}
          setRemisionDiscount={setremisionDiscount}
          userToken={userToken}
        />
      )}

      {kind === 'devolución' && (
        <RegisterDevolutionForm
          from={setRemisionFrom}
          to={setRemisionTo}
          publisher={publisher}
        />
      )}

      {kind === 'liquidación' && (
        <RegisterSaleForm
          setFrom={setRemisionFrom}
          salesDiscount={salesDiscount}
          setSalesDiscount={setSalesDiscount}
          remisionFrom={remisionFrom}
          userToken={userToken}
        />
      )}

      <BooksSelector
        setSelectedBooks={setSelectedBooks}
        selectedBooks={selectedBooks}
        userToken={userToken}
      />
      <BookDetailsForm
        selectedBooks={selectedBooks}
        kind={kind}
        formBookData={formBookData}
        setFormBookData={setFormBookData}
        remisionDiscount={remisionDiscount}
        salesDiscount={salesDiscount}
      />
      <MovementTotals
        formBookData={formBookData}
        kind={kind}
        setGrossTotal={setGrossTotal}
        setNetTotal={setNetTotal}
        grossTotal={grossTotal}
        netTotal={netTotal}
      />
      {formfulldata.grossTotal === 0
        ? (
          <button
            id="form-button"
            type="submit"
            className="movement-form__submit-button--disabled"
          >
            Guardar {kind}
          </button>
        )
        : (
          <button
            id="form-button"
            type="submit"
            className="movement-form__submit-button"
          >
            Guardar {kind}
          </button>
        )}

    </form>
  );
};

export default MovementRegisterForm;
