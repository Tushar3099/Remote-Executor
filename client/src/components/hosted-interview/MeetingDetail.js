import React from 'react';
import { Link2, Link, Edit2, Trash, Copy, UserPlus } from 'react-feather';
import styles from './styles/hostedinterview.module.css';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import { deleteLink } from '../../actions/interview-link';
import { useDispatch } from 'react-redux';

const MeetingDetail = ({ link }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const interviewLink = () => {
    return `${window.location.href}interview/${link.link}`;
  };

  const onLink = () => {
    history.push(`/interview/${link.link}`);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(interviewLink());
  };

  const onDeleteLink = async () => {
    const res = await deleteLink(link.link);
    dispatch(res);
  };

  return (
    <li>
      <div className={styles.rowDate}>
        <span>{link.link}</span>
      </div>
      <div className={styles.rowDate}>
        <span>
          <Moment date={link.createdAt} format={'DD/MM/YYYY'} />
        </span>
        <div>
          <Link style={{ marginLeft: 20 }} onClick={onLink} />
          <Copy style={{ marginLeft: 20 }} onClick={onCopy} />
          <UserPlus style={{ marginLeft: 20 }} />
          <Trash style={{ marginLeft: 20 }} onClick={onDeleteLink} />
        </div>
      </div>
    </li>
  );
};

export default MeetingDetail;
