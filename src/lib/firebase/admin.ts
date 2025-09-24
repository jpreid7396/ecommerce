import { initializeApp } from "firebase-admin/app";
import { getRemoteConfig } from 'firebase-admin/remote-config'

export async function isDarkMode() {
    const serverApp = initializeApp();
    const serverSideConfig = getRemoteConfig(serverApp);
    console.log(serverSideConfig);
    const template = serverSideConfig.initServerTemplate({
        defaultConfig: {
            darkmode: false
        }
    });
    console.log(typeof template);
    await template.load();
    const config = template.evaluate({
        randomizationId: 'phju4kdgc2v3'
    });
    let darkModeValue = false;
    if (config.getBoolean('darkmode') !== undefined) {
        darkModeValue = config.getBoolean('darkmode');
    }
    return darkModeValue;
};