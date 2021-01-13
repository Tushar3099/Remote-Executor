import React, { useRef, useState, useEffect } from "react";
import { ControlledEditor } from "@monaco-editor/react";
import { executeCode, setLoadingTrue } from "../../actions/code";
import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import Submit from "./Submit";
import Split from "react-split";
import styled from "styled-components";
import styles from "./styles/editor.module.css";
import io from "socket.io-client";
import { Play } from "react-feather";

const ENDPOINT = "http://localhost:3000";

const socket = io(ENDPOINT);

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

const OutputWindow = styled.div`
  border-radius: 5px;
  padding: 0 20px;
  box-sizing: border-box;
  color: ${(props) => (props.error ? "red" : "black")};
`;

const CodeEditor = ({ theme }) => {
  const loading = useSelector((state) => state.code.isFetching);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [language, setLanguage] = useState("c");
  const [input, setInput] = useState("");
  // const [output, setOutput] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const valueGetter = useRef();
  let output = useSelector((state) => state.code.output);

  let error = useSelector((state) => state.code.error);

  useEffect(() => {
    console.log("socket: browser says ping (1)");
    socket.on("setLanguage", function (data) {
      // console.log(data);
      setLanguage(data);
    });
    socket.on("setInput", (data) => {
      setInput(data);
    });
    socket.on("setOutput", (data) => {
      dispatch(data);
    });
    socket.on("setCodeExec", (data) => {
      setCode(data);
    });
  }, []);

  const handleEditorDidMount = (_valueGetter) => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  const getOutput = () => {
    // setOutput(out);
    // socket.emit("getOutput", output);
    // setOutput(out);
  };
  const onChangeCode = (newValue, e) => {
    // console.log("onChange" + e);
    socket.emit("getCodeExec", e);
    setCode(e);
  };

  const SubmitCode = async () => {
    dispatch(setLoadingTrue());
    const res = await executeCode(code, language, input);
    dispatch(res);
    // getOutput();
    socket.emit("getOutput", res);
  };

  const changeLanguage = (e) => {
    socket.emit("getLanguage", e.target.value);
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
              {loading ? "Loading.." : "Run Code"}
              <Play style={{ paddingLeft: 10, fontSize: "1em" }} />
            </div>
          </div>
          <ControlledEditor
            wrapperClassName="editor"
            language={language}
            theme={theme === "dark" ? "vs-dark" : "light"}
            editorDidMount={handleEditorDidMount}
            value={code}
            onChange={onChangeCode}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.column}>
            <div className={styles.output}>
              <div className={styles.outputHead}>Output</div>
              <OutputWindow error={error === "" ? false : true}>
                {output ? console.log(output) : null}
                <pre style={{ width: "100%" }}>
                  {output === "" ? error : output}
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
