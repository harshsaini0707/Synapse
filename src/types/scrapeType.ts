export interface Transcript {
    start : string,
    end: string,
    text : string,
    // If the actor ever adds extra fields, keep it extensible:
  [key: string]: any;
}




// Full scraped video item from Apify actor
export interface ScrapedVideoItem {

  title: string;
  description: string;
  thumbnail: string;             
  duration_seconds: number;       
  durationRaw?: string;           //compute & attach 

  channel_id?: string;
  channel_name?: string;
  subscriber_count?: number;

  language?: string;                 
  available_languages?: string[];    
  selected_language?: string;        
  is_auto_generated?: boolean;       


  like_count?: number;
  comment_count?: number;
  view_count?: number;

  // Publication / timing
  published_at?: string;             
  timestamp?: number;               
  
  status?: string;                   
  message?: string;                  

  geo_restrict?: string | null;

  // Transcript array
  transcript?: Transcript[];

  [key: string]: any;
}


// export function toDurationRaw(seconds?: number): string | undefined {
//   if (seconds == null || isNaN(seconds)) return undefined;
//   const h = Math.floor(seconds / 3600);
//   const m = Math.floor((seconds % 3600) / 60);
//   const s = Math.floor(seconds % 60);
//   if (h > 0) {
//     return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
//   }
//   return `${m}:${s.toString().padStart(2, "0")}`;
// }