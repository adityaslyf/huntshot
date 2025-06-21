import { Card, CardContent } from "./card"
import { Button } from "./button"
import {Trash2 } from "lucide-react"

interface FormSectionProps<T> {
  title?: string
  heading?: string
  items: T[]
  onAdd: () => void
  onRemove: (index: number) => void
  renderItem: (item: T, index: number) => React.ReactNode
  addButtonText: string
  className?: string
}

export function FormSection<T>({
  title,
  items,
  onAdd,
  onRemove,
  renderItem,
  addButtonText,
  className
}: FormSectionProps<T>) {
  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAdd}
            className="w-full sm:w-auto"
          >
            {addButtonText}
          </Button>
        </div>
        {items.map((item, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              {renderItem(item, index)}
              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => onRemove(index)}
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 