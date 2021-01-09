import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import './style.css';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  flex: 1;
`;

const Div = styled.div`
  height: 100%;
  flex: 1;
  box-sizing: border-box;
  margin: 20;
  color: ${props => props.error && 'red'};
  background-color: '#eeeeee';
  overflow: scroll;
  outline: none;
`;

const TextInput = styled.textarea`
  color: ${props => (props.theme === 'dark' ? 'white' : 'black')};
  background-color: ${props => (props.theme === 'dark' ? '#1e1e1e' : 'white')};
`;

const InputOutput = ({ input, setInput, theme }) => {
  let output = useSelector(state => state.code.output);
  let error = useSelector(state => state.code.error);

  useEffect(() => {
    console.log(output);
  }, [output]);
  return (
    <Container>
      <Div className='input-field'>
        <TextInput
          theme={theme}
          value={input}
          onChange={e => {
            console.log(e.target.value);
            setInput(e.target.value);
          }}
          className='textarea-input'
        />
      </Div>
      {/* <Div error={error === '' ? false : true}>
        <pre>{output === '' ? error : output}</pre>
      </Div> */}
    </Container>
  );
};

export default InputOutput;
