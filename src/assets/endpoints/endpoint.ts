import { iEndpointConfig } from "@shared/interfaces/end-point.interface";
import { ePreview, eVersion } from "@shared/interfaces/url.interface";
import { environment } from "src/assets/environments/enviroment";

export function createUrl(url: iEndpointConfig): string {
    return `${url.property.protocol}${url.property.subdomain ? url.property.subdomain : ''}${url.property.domain}${url.property.TLD ? url.property.TLD.join('') : ''}${url.property.port ? url.property.port : ''}${url.property.version ? url.property.version : ''}${url.property.preview ? url.property.preview : ''}${url.property.subdirectory ? url.property.subdirectory : ''}`;
}

export const IS_EMAIL_ALREADY: iEndpointConfig = {
    method: 'POST',
    property: {
        protocol: environment.protocol,
        domain: environment.domain,
        port: environment.port,
        preview: ePreview.public,
        version: eVersion.v1,
        subdirectory: '/auth/is-email-already'
    },
    api: (): string => {
        return createUrl(IS_EMAIL_ALREADY)
    }
}

export const CREATE_NEW_ACCOUNT: iEndpointConfig = {
    method: 'POST',
    property: {
        protocol: environment.protocol,
        domain: environment.domain,
        port: environment.port,
        preview: ePreview.public,
        version: eVersion.v1,
        subdirectory: '/auth/create-new-account'
    },
    api: (): string => {
        return createUrl(CREATE_NEW_ACCOUNT)
    }
}

export const REFRESH_TOKEN: iEndpointConfig = {
    method: 'GET',
    property: {
        protocol: environment.protocol,
        domain: environment.domain,
        port: environment.port,
        preview: ePreview.public,
        version: eVersion.v1,
        subdirectory: '/auth/refresh-token'
    },
    api: (): string => {
        return createUrl(REFRESH_TOKEN)
    }
}

export const SIGN_IN_WITH_EMAIL_AND_PASSWORD: iEndpointConfig = {
    method: 'POST',
    property: {
        protocol: environment.protocol,
        domain: environment.domain,
        port: environment.port,
        preview: ePreview.public,
        version: eVersion.v1,
        subdirectory: '/auth/sign-in-with-email-and-password'
    },
    api: (): string => {
        return createUrl(SIGN_IN_WITH_EMAIL_AND_PASSWORD)
    }
}

export const GET_CURRENT: iEndpointConfig = {
    method: 'GET',
    property: {
        protocol: environment.protocol,
        domain: environment.domain,
        port: environment.port,
        preview: ePreview.public,
        version: eVersion.v1,
        subdirectory: '/auth/get-current-user'
    },
    api: (): string => {
        return createUrl(GET_CURRENT)
    }
}

export const FORGOT_PASSWORD: iEndpointConfig = {
    method: 'GET',
    property: {
        protocol: environment.protocol,
        domain: environment.domain,
        port: environment.port,
        preview: ePreview.public,
        version: eVersion.v1,
        subdirectory: '/auth/forgot-password'
    },
    api: (): string => {
        return createUrl(FORGOT_PASSWORD)
    }
}

export const VALID_TOKEN: iEndpointConfig = {
    method: 'GET',
    property: {
        protocol: environment.protocol,
        domain: environment.domain,
        port: environment.port,
        preview: ePreview.public,
        version: eVersion.v1,
        subdirectory: '/auth/valid-token'
    },
    api: (): string => {
        return createUrl(VALID_TOKEN)
    }
}

export const REVOKE_TOKEN: iEndpointConfig = {
    method: 'GET',
    property: {
        protocol: environment.protocol,
        domain: environment.domain,
        port: environment.port,
        preview: ePreview.public,
        version: eVersion.v1,
        subdirectory: '/auth/revoke-token'
    },
    api: (): string => {
        return createUrl(REVOKE_TOKEN)
    }
}

export const GET_CURRENT_TOKEN: iEndpointConfig = {
    method: 'GET',
    property: {
        protocol: environment.protocol,
        domain: environment.domain,
        port: environment.port,
        preview: ePreview.public,
        version: eVersion.v1,
        subdirectory: '/auth/get-current-token'
    },
    api: (): string => {
        return createUrl(GET_CURRENT_TOKEN)
    }
}

export const LOGOUT: iEndpointConfig = {
    method: 'GET',
    property: {
        protocol: environment.protocol,
        domain: environment.domain,
        port: environment.port,
        preview: ePreview.public,
        version: eVersion.v1,
        subdirectory: '/auth/logout'
    },
    api: (): string => {
        return createUrl(LOGOUT)
    }
}
