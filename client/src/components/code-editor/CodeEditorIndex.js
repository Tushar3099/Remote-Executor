import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../constants/theme";
import { GlobalStyles } from "../../constants/global";
import { useDarkMode } from "../../utils/useDarkMode";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Editor from "./Editor";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:3000";

const socket = io(ENDPOINT);

const CodeEditorIndex = () => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    // (1): Send a ping event with
    // some data to the server
    console.log("socket: browser says ping (1)");
    socket.emit("ping", { some: "data" });

    // (4): When the browser receives a pong event
    // console log a message and the events data
    socket.on("pong", function (data) {
      console.log("socket: browser receives pong (4)", data);
    });
  }, []);

  if (!componentMounted) {
    return <div />;
  }

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Footer />
      <Editor theme={theme} />
    </ThemeProvider>
  );
};

export default CodeEditorIndex;
