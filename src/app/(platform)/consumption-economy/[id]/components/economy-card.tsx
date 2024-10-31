import { TrendingUp } from 'lucide-react'

import { EconomyMetadata } from '@/@types/consumption'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card'

interface EconomyCardProps {
  metadata: EconomyMetadata
}

export function EconomyCard({ metadata }: EconomyCardProps) {
  return (
    <Card className="h-[280px] flex-1">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg uppercase">
          {metadata.years} year(s)
          <TrendingUp className="h-6 w-6 text-emerald-500" />
        </CardTitle>
        <CardDescription className="text-xs font-normal text-zinc-400">
          Economy in {metadata.years} year(s)
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <div className="flex flex-col gap-6">
          <p>
            Original:{' '}
            <span className="text-2xl text-zinc-400 line-through">
              {metadata.totalOriginal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
          <p>
            With Discount:{' '}
            <span className="text-3xl">
              {metadata.totalWithDiscount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
        </div>

        <p>
          Economy:{' '}
          <span className="text-4xl text-emerald-500">
            {metadata.totalSavings.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
