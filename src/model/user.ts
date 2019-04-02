import { ThemeOptions } from "@material-ui/core/es/styles/createMuiTheme";


export interface UserSettings {
    themeOptions: ThemeOptions;
}

/* Serializable Firebase User */
export interface SerializableUser {
    uid?: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    phoneNumber?: string;
    providerId?: string;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    creationTime?: string;
    lastSignInTime?: string;
    settings?: UserSettings;
}
