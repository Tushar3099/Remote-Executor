import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { executeCode, setLoadingTrue } from '../../actions/code';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input';
import Submit from './Submit';
import Split from 'react-split';
import styled from 'styled-components';
import styles from './styles/editor.module.css';

import { Play } from 'react-feather';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

const OutputWindow = styled.div`
  border-radius: 5px;
  padding: 0 20px;
  box-sizing: border-box;
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
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.runCode}>
            <Submit language={language} changeLanguage={changeLanguage} />
            <div
              className={styles.submitButton}
              onClick={SubmitCode}
              disabled={!isEditorReady}
            >
              {loading ? 'Loading..' : 'Run Code'}
              <Play style={{ paddingLeft: 10, fontSize: '1em' }} />
            </div>
          </div>
          <Editor
            wrapperClassName='editor'
            language={language}
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            editorDidMount={handleEditorDidMount}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.column}>
            <div className={styles.output}>
              <div className={styles.outputHead}>Output</div>
              <OutputWindow error={error === '' ? false : true}>
                {output ? console.log(output) : null}
                <pre style={{ width: '100%' }}>
                  {output === '' ? error : output}
                </pre>
              </OutputWindow>
            </div>
            <div className={styles.input}>
              <Input input={input} setInput={setInput} theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
