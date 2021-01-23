import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../constants/theme';
import { GlobalStyles } from '../../constants/global';
import { useDarkMode } from '../../utils/useDarkMode';
import Footer from './Footer.js';
import Editor from './CollabEditor';
import { useHistory } from 'react-router-dom';
import { isLoggedIn } from '../../utils/isLoggedIn';
import HeaderCollab from './HeaderCollab';

const CollabEditorIndex = () => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const history = useHistory();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    if (!isLoggedIn()) {
      history.push('/');
    }
  }, []);

  if (!componentMounted) {
    return <div />;
  }

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <HeaderCollab theme={theme} toggleTheme={toggleTheme} />
      <Footer />
      <Editor theme={theme} />
    </ThemeProvider>
  );
};

export default CollabEditorIndex;
