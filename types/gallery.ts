export interface Photo {
  id: string
  url: string
  title: string
  description?: string
  date: Date
  memoryId?: string
  emotion?: string
  tags: string[]
}

