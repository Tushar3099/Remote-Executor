import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { executeCode, setLoadingTrue } from '../../actions/code';
import { useDispatch, useSelector } from 'react-redux';
import InputOutput from '../output/InputOutput';
import Submit from './Submit';
import styled from 'styled-components';
import './style.css';

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  flex: 1;
`;

const SubmitButton = styled.button`
  background-color: #3b8d47;
  color: white;
  margin-left: 10px;
  padding: 10px;
  box-sizing: border-box;
  border: none;
  outline: none;
  font-size: 16px;
  width: 100px;
`;

const OutputWindow = styled.div`
  flex: 1;
  background-color: #eeeeee;
  margin: 20px;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
  color: ${props => (props.error ? 'red' : 'black')};
`;

const CodeEditor = ({ theme }) => {
  const loading = useSelector(state => state.code.isFetching);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [language, setLanguage] = useState('c');
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const valueGetter = useRef();
  let output = useSelector(state => state.code.output);
  let error = useSelector(state => state.code.error);

  const handleEditorDidMount = _valueGetter => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  const SubmitCode = async () => {
    dispatch(setLoadingTrue());
    const res = await executeCode(valueGetter.current(), language, input);
    console.log(res);
    dispatch(res);
  };

  const changeLanguage = e => {
    setLanguage(e.target.value);
  };

  return (
    <>
      <Row>
        <Editor
          height='70vh'
          width='50%'
          language={language}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          editorDidMount={handleEditorDidMount}
        />
        <Column>
          <Row style={{ marginLeft: 20 }}>
            <Submit language={language} changeLanguage={changeLanguage} />
            <SubmitButton onClick={SubmitCode} disabled={!isEditorReady}>
              {loading ? 'Loading..' : 'Submit'}
            </SubmitButton>
          </Row>
          <OutputWindow error={error === '' ? false : true}>
            <pre>{output === '' ? error : output}</pre>
          </OutputWindow>
        </Column>
      </Row>
      <InputOutput input={input} setInput={setInput} theme={theme} />
    </>
  );
};

export default CodeEditor;
