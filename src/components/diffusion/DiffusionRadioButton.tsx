import {Dispatch, SetStateAction} from 'react';

type RadioButtonType = {
  label: string;
  value: string;
  color: string;
};

const radioButtons: RadioButtonType[] = [
  {
    label: '青',
    value: 'blue hair',
    color: 'radio-info',
  },
  {
    label: '赤',
    value: 'red hair',
    color: 'radio-error',
  },
  {
    label: '黄',
    value: 'blond hair',
    color: 'radio-warning',
  },
  {
    label: '指定なし',
    value: '',
    color: '',
  },
];

type DiffusionRadioButtonType = {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

const DiffusionRadioButton = ({
  selected,
  setSelected,
}: DiffusionRadioButtonType) => {
  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSelected(event.target.value);

  return (
    <div>
      <div className='flex my-2'>
        <div>髪の色：</div>
        {radioButtons.map((radio) => (
          <div key={radio.value} className='mr-2 flex'>
            <input
              className={`radio ${radio.color}`}
              type='radio'
              name='sweets'
              value={radio.value}
              checked={radio.value === selected}
              onChange={changeValue}
            />
            <label className='form-check-label'>
              <span className='fs-6'>{radio.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiffusionRadioButton;
