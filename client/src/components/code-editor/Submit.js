import React from 'react';

const Submit = ({ language, changeLanguage }) => {
  return (
    <div className='sel-lang '>
      <select value={language} onChange={changeLanguage}>
        <option value='c'>C</option>
        <option value='cpp'>C++</option>
        <option value='python'>Python</option>
        <option value='javascript'>Javascript</option>
        <option value='java'>Java</option>
      </select>
    </div>
  );
};

export default Submit;
