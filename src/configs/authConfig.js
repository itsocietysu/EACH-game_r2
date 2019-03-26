import { AuthSession } from 'expo';
import {backend_api_url} from "../utils/constants";

const googleClientId = '190923403189-srp0gleu6imvtph8gcauf03uhb66q65h.apps.googleusercontent.com';
const eachClientId = 'Gu2SCEBUwQV3TSlNIu8uMzvKRMYuGP5ePh044jGErO6O9RR0';
const vkontakteClientId = '6682398';

export const redirectUrl = AuthSession.getRedirectUrl();
export const requestUrlGet = `${backend_api_url}/each/token/get?expansion=true`;
export const requestUrlRevoke = `${backend_api_url}/each/token/revoke`;

export const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?` +
  `&client_id=${encodeURIComponent(googleClientId)}` +
  `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent(['profile','email'].join(' '))}`;

export const eachAuthUrl = `http://museeach.ru:5000/oauth2/authorize?` +
  `&client_id=${encodeURIComponent(eachClientId)}` +
  `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent(['email'].join(' '))}`;

export const vkontakteAuthUrl = `https://oauth.vk.com/authorize?revoke=1` +
  `&client_id=${encodeURIComponent(vkontakteClientId)}` +
  `v=${encodeURIComponent("5.85")}` +
  `display=mobile` +
  `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent(['offline','email'].join(' '))}`;
