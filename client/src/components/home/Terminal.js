import React from 'react';
import styles from './styles/terminal.module.css';
import styled from 'styled-components';
import { node } from 'prop-types';
import { Settings, User, UserCheck, Code } from 'react-feather';
import { motion } from 'framer-motion';

const color = [
  '#ee7752',
  '#e73c7e',
  '#23a6d5',
  '#23d5ab',
  '#ee7752',
  '#e7c649',
  '#92f25c',
  '#ffffff',
  '#8249e7',
  '#49ebc7'
];
const width = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const Dot = styled.div`
  background-color: ${props => props.color};
  height: 15px;
  width: 15px;
  border-radius: 10px;
  margin-right: 5px;
`;

const Body = styled.div`
  height: 15px;
  width: ${props => props.width}%;
  margin-left: 10px;
  background-color: ${props => props.color};
  border-radius: 15px;
`;

const Terminal = () => {
  return (
    <div className={styles.terminal_container}>
      <div className={styles.terminal_header}>
        <Dot color={'red'} />
        <Dot color={'yellow'} />
        <Dot color={'green'} />
      </div>
      <div className={styles.terminal_body}>
        {Array.from(Array(10), (e, i) => {
          let random_color = Math.floor(Math.random() * 10) + 1;
          let random_width = Math.floor(Math.random() * 10) + 1;
          return (
            <Body
              color={color[random_color - 1]}
              width={width[random_width - 1]}
            />
          );
        })}
        {/* <Body color={color[0]} width={width[0]} />
        <Body color={color[4]} width={width[9]} /> */}
      </div>
      <div className={styles.option_tabs}>
        <button className={styles.button1}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          PLAY WITH IDE
          <motion.div
            initial={{ rotate: '0deg' }}
            animate={{ rotate: '360deg' }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{
              display: 'flex',
              alignItem: 'center',
              justifyContent: 'center'
            }}
          >
            <Settings style={{ marginLeft: 10 }} size={30} />
          </motion.div>
        </button>
        <button className={styles.button2}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>HOST AN INTERVIEW
          <UserCheck style={{ marginLeft: 10 }} size={30} />
        </button>
        <button className={styles.button3}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>ENTER INTERVIEW
          <Code style={{ marginLeft: 10 }} size={30} />
        </button>
      </div>
    </div>
  );
};

export default Terminal;
