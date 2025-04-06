export interface JournalEntry {
  id: string
  text: string
  date: Date
  mood: string
  distressLevel: number
  topics?: string[]
}

