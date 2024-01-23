import PropTypes from 'prop-types';
import InternalId from './InternalId/InternalId';
import FormDate from './FormDate/FormDate';

const FormHeader = ({
  setId,
  internalId,
  setDate,
}) => (
  <>
    <InternalId
      setId={setId}
      internalId={internalId}
    />
    <FormDate
      setFormDate={setDate}
    />

    {/*  */}
  </>
);

FormHeader.propTypes = {
  setId: PropTypes.func.isRequired,
  internalId: PropTypes.number,
  setDate: PropTypes.func.isRequired,
};

FormHeader.defaultProps = {
  internalId: 0,
};

export default FormHeader;
