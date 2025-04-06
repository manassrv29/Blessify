export interface Memory {
  id: string
  title: string
  description: string
  date: Date
  imageUrls: string[]
  tags: string[]
  emotion?: string
}

export interface MemoryFormData {
  title: string
  description: string
  date: string
  tags: string
  images: FileList | null
}

