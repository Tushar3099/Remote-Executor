import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../constants/theme";
import { GlobalStyles } from "../../constants/global";
import { useDarkMode } from "../../utils/useDarkMode";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Editor from "./Editor";

const CodeEditorIndex = (props) => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />;
  }
  // console.log(props.match.params)

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Footer />
      <Editor theme={theme} id={props.match.params.id}/>
    </ThemeProvider>
  );
};

export default CodeEditorIndex;
