// @ts-ignore
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.applicationDefault() });
}

export const adminAuth = admin.auth();
export async function getRemoteConfigDarkMode() {
  const remoteConfig = admin.remoteConfig();
  const template = await remoteConfig.getTemplate();
  const darkModeParam = template.parameters['darkmode'];
  const value = darkModeParam?.defaultValue?.value || 'false';
  return value === 'true';
}
