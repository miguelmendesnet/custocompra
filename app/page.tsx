"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Clock, AlertTriangle, Calculator, Euro } from "lucide-react"

export default function LifeCostCalculator() {
  const [monthlyWage, setMonthlyWage] = useState<string>("")
  const [itemCost, setItemCost] = useState<string>("")
  const [results, setResults] = useState<{
    hours: number
    days: number
    weeks: number
    months: number
    years: number
  } | null>(null)
  const [examplesWage, setExamplesWage] = useState<number>(1200)

  const calculateLifeCost = () => {
    const wage = Number.parseFloat(monthlyWage)
    const cost = Number.parseFloat(itemCost)

    if (wage <= 0 || cost <= 0) return

    const hourlyWage = wage / 160
    const hours = cost / hourlyWage
    const days = hours / 8 // 8-hour work day
    const weeks = days / 5 // 5-day work week
    const months = weeks / 4.33 // Average weeks per month
    const years = months / 12

    setResults({ hours, days, weeks, months, years })
    setExamplesWage(wage)
  }

  const formatTimeWithMinutes = (totalHours: number) => {
    const hours = Math.floor(totalHours)
    const minutes = Math.round((totalHours - hours) * 60)

    if (hours === 0 && minutes === 0) return "0 minutos"
    if (hours === 0) return `${minutes} minuto${minutes !== 1 ? "s" : ""}`
    if (minutes === 0) return `${hours} hora${hours !== 1 ? "s" : ""}`

    return `${hours} hora${hours !== 1 ? "s" : ""} e ${minutes} minuto${minutes !== 1 ? "s" : ""}`
  }

  const formatTime = (value: number, unit: string) => {
    if (value < 1) return null
    return `${value.toFixed(1)} ${unit}${value !== 1 ? "s" : ""}`
  }

  const getImpactMessage = () => {
    if (!results) return ""

    if (results.years >= 1) {
      return `Esta compra custa-lhe ${results.years.toFixed(1)} ano${results.years >= 2 ? "s" : ""} da sua vida profissional.`
    } else if (results.months >= 1) {
      return `Esta compra custa-lhe ${results.months.toFixed(1)} mês${results.months >= 2 ? "es" : ""} de trabalho.`
    } else if (results.weeks >= 1) {
      return `Esta compra custa-lhe ${results.weeks.toFixed(1)} semana${results.weeks >= 2 ? "s" : ""} de trabalho.`
    } else if (results.days >= 1) {
      return `Esta compra custa-lhe ${results.days.toFixed(1)} dia${results.days >= 2 ? "s" : ""} de trabalho.`
    } else {
      return `Esta compra custa-lhe ${formatTimeWithMinutes(results.hours)} de trabalho.`
    }
  }

  const getExampleResult = (cost: number, wage: number) => {
    if (wage <= 0 || cost <= 0) return ""
    const hourlyWage = wage / 160
    const hours = cost / hourlyWage
    const days = hours / 8
    const weeks = days / 5
    const months = weeks / 4.33
    const years = months / 12
    if (years >= 1) return `${years.toFixed(1)} ano${years >= 2 ? "s" : ""}`
    if (months >= 1) return `${months.toFixed(1)} mês${months >= 2 ? "es" : ""}`
    if (weeks >= 1) return `${weeks.toFixed(1)} semana${weeks >= 2 ? "s" : ""}`
    if (days >= 1) return `${days.toFixed(1)} dia${days >= 2 ? "s" : ""}`
    return formatTimeWithMinutes(hours)
  }

  const baseExamples = [
    { item: "Café", cost: 1 },
    { item: "Carro", cost: 20000 },
    { item: "Almoço Fora", cost: 25 },
    { item: "Casa", cost: 200000 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 pt-4"></div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
            Quanto Custa <span className="text-indigo-600">Realmente</span>?
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Cada compra custa mais do que dinheiro, custa a sua vida. Calcule quantas horas, dias ou anos de trabalho
            qualquer item realmente requer.
          </p>
        </div>

        {/* Calculator Section */}
        <Card className="max-w-2xl mx-auto mb-12 bg-white border-neutral-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-2xl text-neutral-900">
              <Calculator className="h-6 w-6 text-indigo-600" />
              Calculadora
            </CardTitle>
            <CardDescription className="text-neutral-600">
              Introduza o seu salário mensal e o custo de algo que quer comprar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthly-wage" className="flex items-center gap-2 text-neutral-700">
                  <Euro className="h-4 w-4" />O Seu Salário Mensal
                </Label>
                <Input
                  id="monthly-wage"
                  type="number"
                  placeholder="1200.00"
                  value={monthlyWage}
                  onChange={(e) => setMonthlyWage(e.target.value)}
                  className="text-lg bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-cost" className="flex items-center gap-2 text-neutral-700">
                  <Clock className="h-4 w-4" />
                  O Custo da Sua Compra
                </Label>
                <Input
                  id="item-cost"
                  type="number"
                  placeholder="100.00"
                  value={itemCost}
                  onChange={(e) => setItemCost(e.target.value)}
                  className="text-lg bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400"
                />
              </div>
            </div>

            <Button
              onClick={calculateLifeCost}
              className="w-full text-lg py-6 bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={!monthlyWage || !itemCost}
            >
              Calcular
            </Button>

            {results && (
              <div className="mt-8 p-6 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">{formatTimeWithMinutes(results.hours)}</div>
                  <p className="text-lg text-neutral-600">{getImpactMessage()}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {results.days >= 1 && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-900">{results.days.toFixed(1)}</div>
                      <div className="text-sm text-neutral-500">Dias</div>
                    </div>
                  )}
                  {results.weeks >= 1 && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-900">{results.weeks.toFixed(1)}</div>
                      <div className="text-sm text-neutral-500">Semanas</div>
                    </div>
                  )}
                  {results.months >= 1 && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-900">{results.months.toFixed(1)}</div>
                      <div className="text-sm text-neutral-500">Meses</div>
                    </div>
                  )}
                  {results.years >= 1 && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">{results.years.toFixed(1)}</div>
                      <div className="text-sm text-neutral-500">Anos</div>
                    </div>
                  )}
                </div>

                {results.years >= 1 && (
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-2 text-amber-600 font-semibold mb-2">
                      <AlertTriangle className="h-5 w-5" />
                      Verificação da Realidade
                    </div>
                    <p className="text-sm text-neutral-700">
                      Esta compra representa {results.years.toFixed(1)} ano{results.years >= 2 ? "s" : ""} do seu salário mensal.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Examples Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center mb-8 text-neutral-900">Exemplos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {baseExamples.map((example, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow bg-white border-neutral-200 hover:border-neutral-300"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg text-neutral-900">{example.item}</h3>
                    <span className="text-indigo-600 font-bold">€{example.cost.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-neutral-500 mb-3">Com salário de {examplesWage}€</div>
                  <div className="text-2xl font-bold text-neutral-900">{getExampleResult(example.cost, examplesWage)}</div>
                  <div className="text-sm text-neutral-500 mt-1">da sua vida a trabalhar</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Removed quote section per request */}
      </div>
    </div>
  )
}
