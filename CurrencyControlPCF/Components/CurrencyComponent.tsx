import React, { FC, useReducer } from 'react';
import CurrencyInput, { formatValue } from '../CurrencyInput';
import { IOutputs } from '../generated/ManifestTypes';

type Field = {
  value: number | undefined;
  validationClass: string;
  errorMessage: string;
};

type ExampleState = {
  field1: Field;
  field2: Field;
};

type Action = {
  fieldName: string;
  value: Field;
};

function reducer(state: ExampleState, { fieldName, value }: Action): ExampleState {
  return {
    ...state,
    [fieldName]: value,
  };
}

const initialState: ExampleState = {
  field1: {
    value: 100,
    validationClass: '',
    errorMessage: '',
  },
  field2: {
    value: 200,
    validationClass: '',
    errorMessage: '',
  },
};

interface CurrencyComponentProps {
  _prefix: string;
  defaultValue: string;
  OutputObj : IOutputs;
  notifyOutputChanged() : void;
}


export const CurrencyComponent: FC<CurrencyComponentProps> = ({ _prefix, defaultValue,OutputObj, notifyOutputChanged }) => {
  const prefix = _prefix;
  const DefaultVal = defaultValue;
  const [state, dispatch] = useReducer(reducer, initialState);
  

  const UpdateOuts = (_value: string | undefined) : void =>{

  }
  const handleOnValueChange = (_value: string | undefined, fieldName: string | undefined): void => {
    console.log(_value);
    OutputObj.inputtedValue = _value || "";

    notifyOutputChanged();
    if (!fieldName) {

      return;
    }

    if (!_value) {
      return dispatch({
        fieldName,
        value: {
          value: undefined,
          validationClass: '',
          errorMessage: '',
        },
      });
    }

    const value = Number(_value);
    

    if (!Number.isNaN(value)) {
      dispatch({
        fieldName,
        value: {
          value,
          validationClass: 'is-valid',
          errorMessage: '',
        },
      });
    } else {
      dispatch({
        fieldName,
        value: {
          value,
          validationClass: 'is-invalid',
          errorMessage: 'Please enter a valid number',
        },
      });
    }
  };

  const total = (state.field1.value || 0) + (state.field2.value || 0);

  return (
    <div className="row">

            <div className="col"> 
              <CurrencyInput
                id="validation-example-3-field2"
                name="field2"
                //placeholder= {defaultValue}
                className={`form-control`}  //${state.field2.validationClass}
                defaultValue = {defaultValue}
                onValueChange={handleOnValueChange}
                prefix={prefix}
              />
              <div className="invalid-feedback">{state.field1.errorMessage}</div>
            </div>
    </div>
  );
};

export default CurrencyComponent;
