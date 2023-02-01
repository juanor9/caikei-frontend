import generalThema from './20221010_Thema_v1.5_es.json';
import './ThemaForm.scss';

const ThemaForm = () => {
  const thema = generalThema.CodeList.ThemaCodes.Code;
  console.log(thema);
  return (
    <form className="thema-form">
      <fieldset>
        <legend>Seleccione la categoría THEMA que mejor se ajuste al contenido del libro</legend>
        <div className="thema-form__choice">
          {thema.map((code) => {
            if (!code.CodeParent) {
              return (
                <label htmlFor={code.CodeValue} key={code.CodeValue}>
                  <input type="radio" name="thema" id={code.CodeValue} value={code.CodeValue} />
                  {code.CodeValue} | {code.CodeDescription}
                </label>
              );
            }
            return null;
          })}
        </div>
      </fieldset>
      <p><b>Tu categoría THEMA: </b><span id="themaChoice" /></p>
    </form>
  );
};

export default ThemaForm;
