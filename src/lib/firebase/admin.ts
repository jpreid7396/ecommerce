// @ts-ignore
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getRemoteConfig, RemoteConfigFetchResponse } from 'firebase-admin/remote-config';

const app = initializeApp({ credential: applicationDefault() });

// Full SSR Remote Config hydration using experimental SDK
export async function getRemoteConfigFetchResponse() {
  const remoteConfig = getRemoteConfig(app);
  const template = await remoteConfig.getTemplate();
  // Directly access parameters from the template
  return JSON.parse(JSON.stringify({ parameters: template.parameters }));
}
