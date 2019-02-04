import { AuthSession } from 'expo';

const googleClientId = '190923403189-srp0gleu6imvtph8gcauf03uhb66q65h.apps.googleusercontent.com';
const eachClientId = 'Gu2SCEBUwQV3TSlNIu8uMzvKRMYuGP5ePh044jGErO6O9RR0';
const vkontakteClientId = '6682398';

export const redirectUrl = AuthSession.getRedirectUrl();
export const requestUrlGet = `http://eachdev.itsociety.su:4201/each/token/get?expansion=true`;
export const requestUrlRevoke = `http://eachdev.itsociety.su:4201/each/token/revoke`;

export const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?` +
  `&client_id=${encodeURIComponent(googleClientId)}` +
  `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent(['profile','email'].join(' '))}`;

export const eachAuthUrl = `http://eachdev.itsociety.su:5000/oauth2/authorize?` +
  `&client_id=${encodeURIComponent(eachClientId)}` +
  `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent(['email'].join(' '))}`;

export const vkontakteAuthUrl = `https://oauth.vk.com/authorize?` +
  `&client_id=${encodeURIComponent(vkontakteClientId)}` +
  `v=${encodeURIComponent("5.85")}` +
  `display=mobile` +
  `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent(['offline','email'].join(' '))}`;
