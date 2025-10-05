import { ApifyClient } from "apify-client";
import type { ScrapedVideoItem } from "@/types/scrapeType";

function extractYouTubeVideoId(url: string): string | null {
    try {
        const trimmed = url.trim();
        // Direct 11-char ID provided
        if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

        const u = new URL(trimmed);
        // watch?v=
        if (u.hostname.includes("youtube.com")) {
            const v = u.searchParams.get("v");
            if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
            // /embed/ID or /shorts/ID
            const match = u.pathname.match(/\/(embed|shorts)\/([a-zA-Z0-9_-]{11})/);
            if (match) return match[2];
        }
        // youtu.be/ID
        if (u.hostname === "youtu.be") {
            const seg = u.pathname.substring(1);
            if (/^[a-zA-Z0-9_-]{11}$/.test(seg)) return seg;
        }
        return null;
    } catch {
        return null;
    }
}

function toDurationRaw(seconds?: number): string | undefined {
    if (seconds == null || isNaN(seconds)) return undefined;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export async function getInfoFromVideo(rawUrl: string): Promise<ScrapedVideoItem> {
    if (!rawUrl || typeof rawUrl !== "string") {
        throw new Error("YouTube URL is required");
    }

    const videoId = extractYouTubeVideoId(rawUrl);
    if (!videoId) {
        throw new Error("Invalid YouTube URL or video ID format");
    }

    const APIFY_KEY = process.env.APIFY_KEY;
    const ACTOR_ID = process.env.ACTOR_ID;
    if (!APIFY_KEY) throw new Error("APIFY_KEY env var not set");
    if (!ACTOR_ID) throw new Error("ACTOR_ID env var not set");


    const client = new ApifyClient({ token: APIFY_KEY });
    console.log(`[scrape] Running actor ${ACTOR_ID} for video ${videoId}`);


    const run = await client.actor(ACTOR_ID).call({ youtube_url: rawUrl });

    if (!run.defaultDatasetId) {
        throw new Error("Actor run returned no defaultDatasetId");
    }

        const { items } = await client
            .dataset(run.defaultDatasetId)
            .listItems({ clean: true, limit: 1 });

    if (!items || items.length === 0) {
        throw new Error("No data returned from actor dataset");
    }

        const raw: any = items[0];

        const durationSeconds: number = typeof raw.duration_seconds === "number" ? raw.duration_seconds : 0;
        const durationRaw = toDurationRaw(durationSeconds);

        const result: ScrapedVideoItem = {
            title: typeof raw.title === "string" ? raw.title : "",
            description: typeof raw.description === "string" ? raw.description : "",
            thumbnail: typeof raw.thumbnail === "string" ? raw.thumbnail : "",
            duration_seconds: durationSeconds,
            durationRaw,
            channel_id: typeof raw.channel_id === "string" ? raw.channel_id : undefined,
            channel_name: typeof raw.channel_name === "string" ? raw.channel_name : undefined,
            subscriber_count: typeof raw.subscriber_count === "number" ? raw.subscriber_count : undefined,
            language: typeof raw.language === "string" ? raw.language : undefined,
            available_languages: Array.isArray(raw.available_languages) ? raw.available_languages.filter((x: any) => typeof x === "string") : undefined,
            selected_language: typeof raw.selected_language === "string" ? raw.selected_language : undefined,
            is_auto_generated: typeof raw.is_auto_generated === "boolean" ? raw.is_auto_generated : undefined,
            like_count: typeof raw.like_count === "number" ? raw.like_count : undefined,
            comment_count: typeof raw.comment_count === "number" ? raw.comment_count : undefined,
            view_count: typeof raw.view_count === "number" ? raw.view_count : undefined,
            published_at: typeof raw.published_at === "string" ? raw.published_at : undefined,
            timestamp: typeof raw.timestamp === "number" ? raw.timestamp : undefined,
            status: typeof raw.status === "string" ? raw.status : undefined,
            message: typeof raw.message === "string" ? raw.message : undefined,
            geo_restrict: typeof raw.geo_restrict === "string" || raw.geo_restrict === null ? raw.geo_restrict : undefined,
            transcript: Array.isArray(raw.transcript) ? raw.transcript : undefined,
        } as ScrapedVideoItem;

    return result;
}
