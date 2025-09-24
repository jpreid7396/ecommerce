import { initializeApp, getApps, getApp, App } from 'firebase-admin/app'
import { getRemoteConfig } from 'firebase-admin/remote-config'

// Short in-process cache so we don't call the admin API on every request
let cachedTemplate: { template: any; fetchedAt: number } | null = null
const TEMPLATE_TTL_MS = 60 * 1000 // 1 minute

function getServerApp(): App {
    // idempotent initialize per Firebase SSR guidance
    if (getApps().length) return getApp()
    return initializeApp()
}

async function fetchTemplate(): Promise<any | null> {
    try {
        if (cachedTemplate && Date.now() - cachedTemplate.fetchedAt < TEMPLATE_TTL_MS) {
            return cachedTemplate.template
        }

        const app = getServerApp()
        const remoteConfig = getRemoteConfig(app)

        // Use the admin SDK getTemplate API (request-time)
        const template = await remoteConfig.getTemplate()

        cachedTemplate = { template, fetchedAt: Date.now() }
        return template
    } catch (err) {
        // Non-fatal: log and return null so callers can fall back to defaults
        console.error('remote-config fetchTemplate error:', err)
        return null
    }
}

function parseParamValue(param: any): string | undefined {
    if (!param) return undefined
    if (typeof param === 'string') return param
    // remote-config parameter shapes can vary; check common fields
    if (param.defaultValue && typeof param.defaultValue.value === 'string') return param.defaultValue.value
    if (param.defaultValue && typeof param.defaultValue.inAppDefault === 'string') return param.defaultValue.inAppDefault
    if (param.value && typeof param.value === 'string') return param.value
    try {
        return JSON.stringify(param)
    } catch (_e) {
        return undefined
    }
}

export async function getRemoteConfigParam(name: string, fallback?: string): Promise<string | undefined> {
    const template = await fetchTemplate()
    const val = parseParamValue(template?.parameters?.[name])
    if (val === undefined) return fallback
    return val
}

export async function isDarkMode(): Promise<boolean> {
    const val = await getRemoteConfigParam('darkmode', 'false')
    return String(val) === 'true'
}

export function _clearRemoteConfigCache() {
    cachedTemplate = null
}