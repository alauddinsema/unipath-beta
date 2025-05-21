export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_history: {
        Row: {
          content: string
          created_at: string
          id: string
          response: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          response?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          response?: string | null
          user_id?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          document_type: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_type: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          degree_type: string | null
          field_of_study: string | null
          first_name: string | null
          full_name: string | null
          gpa: number | null
          id: string
          ielts_score: number | null
          last_name: string | null
          sat_score: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          degree_type?: string | null
          field_of_study?: string | null
          first_name?: string | null
          full_name?: string | null
          gpa?: number | null
          id: string
          ielts_score?: number | null
          last_name?: string | null
          sat_score?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          degree_type?: string | null
          field_of_study?: string | null
          first_name?: string | null
          full_name?: string | null
          gpa?: number | null
          id?: string
          ielts_score?: number | null
          last_name?: string | null
          sat_score?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          is_active: boolean
          is_paid: boolean
          plan_type: string
          start_date: string
          transaction_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean
          is_paid?: boolean
          plan_type: string
          start_date?: string
          transaction_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean
          is_paid?: boolean
          plan_type?: string
          start_date?: string
          transaction_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      universities: {
        Row: {
          acceptance_rate: number | null
          alpha_two_code: string | null
          campus_size: string | null
          city: string | null
          country: string | null
          created_at: string | null
          degree_type: string | null
          description: string | null
          domains: string[] | null
          established_year: number | null
          founded_year: number | null
          id: string
          image_url: string | null
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          min_duolingo_score: number | null
          min_gpa: number | null
          min_ielts_score: number | null
          min_sat_score: number | null
          name: string
          region: string | null
          scholarships_available: boolean | null
          short_description: string | null
          state_province: string | null
          student_faculty_ratio: string | null
          student_population: number | null
          web_pages: string[] | null
          website: string | null
        }
        Insert: {
          acceptance_rate?: number | null
          alpha_two_code?: string | null
          campus_size?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          degree_type?: string | null
          description?: string | null
          domains?: string[] | null
          established_year?: number | null
          founded_year?: number | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          min_duolingo_score?: number | null
          min_gpa?: number | null
          min_ielts_score?: number | null
          min_sat_score?: number | null
          name: string
          region?: string | null
          scholarships_available?: boolean | null
          short_description?: string | null
          state_province?: string | null
          student_faculty_ratio?: string | null
          student_population?: number | null
          web_pages?: string[] | null
          website?: string | null
        }
        Update: {
          acceptance_rate?: number | null
          alpha_two_code?: string | null
          campus_size?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          degree_type?: string | null
          description?: string | null
          domains?: string[] | null
          established_year?: number | null
          founded_year?: number | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          min_duolingo_score?: number | null
          min_gpa?: number | null
          min_ielts_score?: number | null
          min_sat_score?: number | null
          name?: string
          region?: string | null
          scholarships_available?: boolean | null
          short_description?: string | null
          state_province?: string | null
          student_faculty_ratio?: string | null
          student_population?: number | null
          web_pages?: string[] | null
          website?: string | null
        }
        Relationships: []
      }
      Universities: {
        Row: {
          AD: string | null
          "http://www.uda.ad/": string | null
          "University of Andorra": string | null
        }
        Insert: {
          AD?: string | null
          "http://www.uda.ad/"?: string | null
          "University of Andorra"?: string | null
        }
        Update: {
          AD?: string | null
          "http://www.uda.ad/"?: string | null
          "University of Andorra"?: string | null
        }
        Relationships: []
      }
      user_files: {
        Row: {
          created_at: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
