export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      areas: {
        Row: {
          cafes: Json
          center_lat: number
          center_lng: number
          id: string
          name: string
          pandal_count: number
          region: string
          restaurants: Json
          things_to_do: string[]
        }
        Insert: {
          cafes?: Json
          center_lat: number
          center_lng: number
          id: string
          name: string
          pandal_count?: number
          region: string
          restaurants?: Json
          things_to_do?: string[]
        }
        Update: {
          cafes?: Json
          center_lat?: number
          center_lng?: number
          id?: string
          name?: string
          pandal_count?: number
          region?: string
          restaurants?: Json
          things_to_do?: string[]
        }
        Relationships: []
      }
      check_ins: {
        Row: {
          created_at: string
          id: string
          pandal_id: string
          points_awarded: number
          user_id: string
          user_lat: number | null
          user_lng: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          pandal_id: string
          points_awarded?: number
          user_id: string
          user_lat?: number | null
          user_lng?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          pandal_id?: string
          points_awarded?: number
          user_id?: string
          user_lat?: number | null
          user_lng?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "check_ins_pandal_id_fkey"
            columns: ["pandal_id"]
            isOneToOne: false
            referencedRelation: "pandals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "check_ins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "check_ins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      itineraries: {
        Row: {
          created_at: string
          description: string | null
          id: string
          mode: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          mode: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          mode?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "itineraries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "itineraries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      itinerary_stops: {
        Row: {
          id: string
          itinerary_id: string
          pandal_id: string
          position: number
          scheduled_time: string | null
        }
        Insert: {
          id?: string
          itinerary_id: string
          pandal_id: string
          position: number
          scheduled_time?: string | null
        }
        Update: {
          id?: string
          itinerary_id?: string
          pandal_id?: string
          position?: number
          scheduled_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_stops_itinerary_id_fkey"
            columns: ["itinerary_id"]
            isOneToOne: false
            referencedRelation: "itineraries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itinerary_stops_pandal_id_fkey"
            columns: ["pandal_id"]
            isOneToOne: false
            referencedRelation: "pandals"
            referencedColumns: ["id"]
          },
        ]
      }
      pandals: {
        Row: {
          access_points: string[] | null
          area_id: string | null
          crowd_level: string
          description: string | null
          geocoded: boolean
          id: string
          lat: number
          lng: number
          name: string
          nearest_metro_line: string | null
          nearest_metro_station: string | null
          rating: number | null
          region: string
          tags: string[] | null
          theme: string | null
          visiting_close: string | null
          visiting_open: string | null
        }
        Insert: {
          access_points?: string[] | null
          area_id?: string | null
          crowd_level: string
          description?: string | null
          geocoded?: boolean
          id: string
          lat: number
          lng: number
          name: string
          nearest_metro_line?: string | null
          nearest_metro_station?: string | null
          rating?: number | null
          region: string
          tags?: string[] | null
          theme?: string | null
          visiting_close?: string | null
          visiting_open?: string | null
        }
        Update: {
          access_points?: string[] | null
          area_id?: string | null
          crowd_level?: string
          description?: string | null
          geocoded?: boolean
          id?: string
          lat?: number
          lng?: number
          name?: string
          nearest_metro_line?: string | null
          nearest_metro_station?: string | null
          rating?: number | null
          region?: string
          tags?: string[] | null
          theme?: string | null
          visiting_close?: string | null
          visiting_open?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pandals_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
        ]
      }
      points_ledger: {
        Row: {
          amount: number
          created_at: string
          id: string
          reason: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          reason: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          reason?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "points_ledger_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "points_ledger_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_initials: string | null
          created_at: string
          display_name: string | null
          id: string
          points: number
          referral_code: string
          referred_by: string | null
          username: string | null
        }
        Insert: {
          avatar_initials?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          points?: number
          referral_code: string
          referred_by?: string | null
          username?: string | null
        }
        Update: {
          avatar_initials?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          points?: number
          referral_code?: string
          referred_by?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ratings: {
        Row: {
          created_at: string
          crowd_stars: number
          decoration_stars: number
          food_vibe_stars: number
          id: string
          location_stars: number
          pandal_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          crowd_stars: number
          decoration_stars: number
          food_vibe_stars: number
          id?: string
          location_stars: number
          pandal_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          crowd_stars?: number
          decoration_stars?: number
          food_vibe_stars?: number
          id?: string
          location_stars?: number
          pandal_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_pandal_id_fkey"
            columns: ["pandal_id"]
            isOneToOne: false
            referencedRelation: "pandals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referred_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          referred_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          referred_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "referrals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      leaderboard: {
        Row: {
          avatar_initials: string | null
          name: string | null
          pandals_visited: number | null
          points: number | null
          rank: number | null
          user_id: string | null
          username: string | null
        }
        Relationships: []
      }
      pandal_rating_summary: {
        Row: {
          crowd_avg: number | null
          decoration_avg: number | null
          food_vibe_avg: number | null
          location_avg: number | null
          overall_avg: number | null
          pandal_id: string | null
          rating_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_pandal_id_fkey"
            columns: ["pandal_id"]
            isOneToOne: false
            referencedRelation: "pandals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      award_points: {
        Args: { p_amount: number; p_reason: string; p_user: string }
        Returns: undefined
      }
      claim_referral: {
        Args: { p_code: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database["public"]

export type Tables<
  DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"]),
> = (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
  Row: infer R
}
  ? R
  : never

export type TablesInsert<DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends { Insert: infer I } ? I : never
