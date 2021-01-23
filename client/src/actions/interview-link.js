import axios from 'axios';
import {
  INTERVIEW_LINK_GENERATION_FAILURE,
  INTERVIEW_LINK_GENERATION_SUCCESS,
  SET_INTERVIEW_LINK_LOADING_TRUE,
  FETCH_HOSTED_LINKS_FAILURE,
  FETCH_HOSTED_LINKS_SUCCESS,
  DELETE_LINK_FAILURE,
  DELETE_LINK_SUCCESS
} from './type';
import { api_route } from './route';
import { alert } from './alert';

export const generateInterviewLink = async () => {
  try {
    const res = await axios.post(`${api_route}/link/generate`);
    if (res) alert('success', 'Link generated successfully');
    return {
      type: INTERVIEW_LINK_GENERATION_SUCCESS,
      payload: res.data.link
    };
  } catch (err) {
    alert('error', err.message || 'Something went wrong');
    return {
      type: INTERVIEW_LINK_GENERATION_FAILURE
    };
  }
};

export const fetchHostedLinks = async () => {
  try {
    const res = await axios.get(`${api_route}/link/fetchHostedLinks`);
    return {
      type: FETCH_HOSTED_LINKS_SUCCESS,
      payload: res.data.links
    };
  } catch (err) {
    alert('error', err.message || 'Something went wrong');
    return {
      type: FETCH_HOSTED_LINKS_FAILURE
    };
  }
};

export const deleteLink = async link => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ link });
    const res = await axios.post(`${api_route}/link/delete`, body, config);
    if (res) {
      const links = await axios.get(`${api_route}/link/fetchHostedLinks`);
      return {
        type: FETCH_HOSTED_LINKS_SUCCESS,
        payload: links.data.links
      };
    }
  } catch (err) {
    alert('error', err.message || 'Something went wrong');
    return {
      type: DELETE_LINK_FAILURE
    };
  }
};

export const setLoadingTrue = () => {
  return {
    type: SET_INTERVIEW_LINK_LOADING_TRUE
  };
};
