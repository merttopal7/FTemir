import { Database } from "@/utils/Database";
import { Settings, SETTINGS_FILE, defaultSettings } from "./SettingsFile";
import { FTemir } from "@/FTemir";
import { FTemirCache } from "@/FTemir/Cache";

export class FTemir {
    static _Settings: Settings;
    static Cache: FTemirCache = new FTemirCache();

    static async Initalize() {
        await FTemir.LoadSettings();
        await Database.Initalize();
        FTemir.Cache.FetchTablesForCache();
    }

    static GetSettings() {
        return FTemir._Settings as Settings;
    }

    static async LoadSettings(): Promise<Settings> {
        const file = Bun.file(SETTINGS_FILE);
        if (!(await file.exists())) {
            await Bun.write(
                SETTINGS_FILE,
                JSON.stringify(defaultSettings, null, 2)
            );

            console.log("Settings.json created with default values");
            process.exit(0);
            return defaultSettings;
        }
        const text = await file.text();
        FTemir._Settings = JSON.parse(text) as Settings;

        return FTemir._Settings;
    }

}