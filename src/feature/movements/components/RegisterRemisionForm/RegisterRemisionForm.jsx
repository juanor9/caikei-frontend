import Select from 'react-select';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import getLibrariesByPublisher from '../../../libraries/services/allLibraries';
import { getPublisherById } from '../../../publishers/services/publishers';

const RegisterRemisionForm = ({
  from,
  to,
  setRemisionDiscount,
  remisionDiscount,
  userToken,
}) => {
  const dispatch = useDispatch();
  const { publisher } = useSelector((state) => state.user.userData);
  const { allLibraries } = useSelector((state) => state.allLibraries);
  const publisherData = useSelector((state) => state.publisher.publisher);
  const { library } = useSelector((state) => state.library);

  useEffect(() => {
    if (publisher) {
      try {
        dispatch(getLibrariesByPublisher({ publisher, userToken }));
        dispatch(getPublisherById({ publisher, userToken }));
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }, [publisher, userToken, dispatch]);

  const storages = useMemo(
    () => (Array.isArray(allLibraries)
      ? [...allLibraries, publisherData]
      : [publisherData]),
    [allLibraries, publisherData],
  );
  const storagesSelect = useMemo(() => storages.map((storage) => ({
    value: storage._id,
    label: storage.name,
  })), [storages]);

  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);

  useEffect(() => {
    if (publisherData) {
      setSelectedFrom({
        value: publisherData._id,
        label: publisherData.name,
      });
    }
  }, [publisherData]);

  const handleChangeFrom = (selected) => setSelectedFrom(selected);
  const handleChangeTo = (selected) => setSelectedTo(selected);

  useEffect(() => {
    if (!selectedFrom || !selectedTo) return;

    from(selectedFrom.value);
    to(selectedTo.value);
  }, [selectedFrom, selectedTo, from, to]);

  const handleChangeRemisionDiscount = ({ target: { value } }) => setRemisionDiscount(value);

  useEffect(() => {
    if (publisherData && !selectedFrom) {
      setSelectedFrom({
        value: publisherData._id,
        label: publisherData.name,
      });
    }
  }, [publisherData]);
  const { publishers } = library;
  useEffect(() => {
    const fetchDiscount = async () => {
      if (selectedTo) {
        if (publishers !== undefined && Array.isArray(publishers)) {
          const { discount } = publishers.find((item) => item.publisherId === publisher);
          setRemisionDiscount(discount);
        }
      }
    };
    fetchDiscount();
  }, [selectedTo, publishers]);
  return (
    <>
      <div>
        <p>Desde</p>
        <Select
          id="from"
          options={storagesSelect}
          isSearchable
          isClearable
          required
          value={selectedFrom || ''}
          onChange={handleChangeFrom}
        />
      </div>
      <div>
        <p>Hacia</p>
        <Select
          id="to"
          options={storagesSelect}
          isSearchable
          isClearable
          required
          onChange={handleChangeTo}
        />
      </div>

      <label htmlFor="discount" className="movement-form__label--double">
        Descuento
        <input
          type="number"
          name="discount"
          id="discount"
          required
          value={remisionDiscount}
          onChange={handleChangeRemisionDiscount}
          className="movement-form__input"
        />
      </label>
    </>
  );
};

RegisterRemisionForm.propTypes = {
  from: PropTypes.func.isRequired,
  to: PropTypes.func.isRequired,
  remisionDiscount: PropTypes.number,
  setRemisionDiscount: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};
RegisterRemisionForm.defaultProps = {
  remisionDiscount: 0,
};

export default RegisterRemisionForm;
