"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export default function SerenaLanding() {
  const [showSite, setShowSite] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    neighborhood: "",
    preferences: [] as string[],
    captcha: "",
  })
  const [mathQuestion, setMathQuestion] = useState({ question: "1 + 1", answer: 2 })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Generate random math question
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setMathQuestion({ question: `${num1} + ${num2}`, answer: num1 + num2 })

    // Auto-show site after 9 seconds
    const timer = setTimeout(() => {
      setShowSite(true)
    }, 9000)

    return () => clearTimeout(timer)
  }, [])

  const handleVideoEnd = () => {
    setShowSite(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePreferenceChange = (preference: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      preferences: checked ? [...prev.preferences, preference] : prev.preferences.filter((p) => p !== preference),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate captcha
    if (Number.parseInt(formData.captcha) !== mathQuestion.answer) {
      alert("Resposta do captcha incorreta!")
      return
    }

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.neighborhood ||
      formData.preferences.length === 0
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "83ed46be-27fe-4b59-950d-63cda05c00ca", // Substitua pela sua chave do Web3Forms
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          neighborhood: formData.neighborhood,
          preferences: formData.preferences.join(", "),
          subject: "Novo lead - Serena Landing Page",
        }),
      })

      if (response.ok) {
        alert("Cadastro realizado com sucesso! Entraremos em contato em breve.")
        setFormData({
          name: "",
          email: "",
          phone: "",
          neighborhood: "",
          preferences: [],
          captcha: "",
        })
      } else {
        throw new Error("Erro no envio")
      }
    } catch (error) {
      alert("Erro ao enviar formulário. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToForm = () => {
    document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen">
      {/* Video Intro */}
      {!showSite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <video className="w-full h-full object-cover" autoPlay muted playsInline onEnded={handleVideoEnd}>
            <source
              src={
                typeof window !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
                  ? "https://mvituzzo.com.br/serena/serenamob.mp4"
                  : "https://mvituzzo.com.br/serena/serena.mp4"
              }
              type="video/mp4"
            />
          </video>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-opacity duration-800 ${showSite ? "opacity-100" : "opacity-0"}`}>
        {/* Header Section */}
        <section className="bg-[#aa7a54] py-3">
          <div className="container mx-auto px-4">
            <div className="flex justify-end">{/* Placeholder for any header content */}</div>
          </div>
        </section>

        {/* Logo Section */}
        <section className="bg-[#121e14] py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-[299px] mx-auto mb-8 md:mb-16">
              <Image
                src="https://d335luupugsy2.cloudfront.net/cms/files/712823/1750937355/$hdmk2npv1j"
                alt="Serena Logo"
                width={299}
                height={200}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center bg-no-repeat py-24"
          style={{
            backgroundImage: `url('https://d335luupugsy2.cloudfront.net/cms/files/712823/1750949973/$vjyr6j5lm2')`,
          }}
        >
          <div className="container mx-auto px-4 text-center">
            {/* Main Project Image */}
            <div className="max-w-[446px] mx-auto mb-8">
              <Image
                src="https://d335luupugsy2.cloudfront.net/cms/files/712823/1751034719/$iczd6q1xzj"
                alt="Serena Project"
                width={446}
                height={300}
                className="w-full h-auto"
              />
            </div>

            {/* Location Text */}
            <div className="mb-24">
              <h2 className="text-[#121e14] text-xl md:text-2xl font-medium bg-white/90 inline-block px-4 py-2 rounded">
                VILA ADYANA | AO LADO DO TÊNIS CLUBE
              </h2>
            </div>

            {/* Features Image */}
            <div className="max-w-[473px] mx-auto mb-16">
              <Image
                src="https://d335luupugsy2.cloudfront.net/cms/files/712823/1751034719/$5nkqrdspq6g"
                alt="Serena Features"
                width={473}
                height={400}
                className="w-full h-auto"
              />
            </div>

            {/* Amenities Image */}
            <div className="max-w-[312px] mx-auto mb-8">
              <Image
                src="https://d335luupugsy2.cloudfront.net/cms/files/712823/1751048988/$5xtpv8u4c6e"
                alt="Serena Amenities"
                width={312}
                height={200}
                className="w-full h-auto"
              />
            </div>

            {/* Mobile Image - Only visible on mobile */}
            <div className="block md:hidden max-w-full mx-auto">
              <Image
                src="https://mvituzzo.com.br/serena/mob.png"
                alt="Mobile Layout"
                width={300}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#aa7a54] py-4">
          <div className="container mx-auto px-4 text-center">
            <Button
              onClick={scrollToForm}
              className="bg-[#121e14] hover:bg-[#121e14]/90 text-white px-8 py-3 rounded-full text-lg font-medium max-w-[375px] w-full"
            >
              SAIBA MAIS
            </Button>
          </div>
        </section>

        {/* Form Section */}
        <section id="form-section" className="bg-[#121e14] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-[400px] mx-auto">
              {/* Form Logo */}
              <div className="text-center mb-8">
                <Image
                  src="https://d335luupugsy2.cloudfront.net/cms/files/712823/1750942019/$dvedn03w8k6"
                  alt="Form Logo"
                  width={400}
                  height={100}
                  className="w-full h-auto max-w-[400px] mx-auto"
                />
              </div>

              {/* Form */}
              <Card className="bg-transparent border-none">
                <CardContent className="p-0">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <Label htmlFor="name" className="text-white text-sm font-normal">
                        Nome*
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Nome *"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="mt-1 bg-white text-gray-700 border-none rounded shadow-inner"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <Label htmlFor="email" className="text-white text-sm font-normal">
                        Email*
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="mt-1 bg-white text-gray-700 border-none rounded shadow-inner"
                      />
                    </div>

                    {/* Phone Field */}
                    <div>
                      <Label htmlFor="phone" className="text-white text-sm font-normal">
                        Telefone*
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Telefone *"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        className="mt-1 bg-white text-gray-700 border-none rounded shadow-inner"
                      />
                    </div>

                    {/* Neighborhood Field */}
                    <div>
                      <Label htmlFor="neighborhood" className="text-white text-sm font-normal">
                        Bairro onde mora:*
                      </Label>
                      <Input
                        id="neighborhood"
                        type="text"
                        placeholder="Bairro onde mora: *"
                        value={formData.neighborhood}
                        onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                        required
                        className="mt-1 bg-white text-gray-700 border-none rounded shadow-inner"
                      />
                    </div>

                    {/* Preferences Field */}
                    <div>
                      <Label className="text-white text-sm font-normal block mb-2">Metragem de preferência:*</Label>
                      <div className="space-y-2">
                        {["42m² | 1 Dorm", "67m² ou 71m² | 2 Dorms", "103m² ou 114m² | 3 Dorms"].map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={option}
                              checked={formData.preferences.includes(option)}
                              onCheckedChange={(checked) => handlePreferenceChange(option, checked as boolean)}
                              className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                            />
                            <Label htmlFor={option} className="text-white text-sm font-normal">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Captcha Field */}
                    <div>
                      <Label htmlFor="captcha" className="text-white text-sm font-normal">
                        {mathQuestion.question} = ?
                      </Label>
                      <Input
                        id="captcha"
                        type="text"
                        placeholder={`${mathQuestion.question} = ?`}
                        value={formData.captcha}
                        onChange={(e) => handleInputChange("captcha", e.target.value)}
                        required
                        className="mt-1 bg-white text-gray-700 border-none rounded shadow-inner"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#9a3f23] hover:bg-[#9a3f23]/90 text-white py-3 rounded-[35px] text-xl font-normal mt-4"
                    >
                      {isSubmitting ? "ENVIANDO..." : "CADASTRE-SE"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section
          className="bg-cover bg-center bg-no-repeat py-16"
          style={{
            backgroundImage: `url('https://d335luupugsy2.cloudfront.net/cms/files/712823/1706192993/$f5z2kbktzdw')`,
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <div className="mb-8">
              <p className="text-black text-base font-normal mb-4">INCORPORAÇÃO</p>
              <div className="max-w-[238px] mx-auto">
                <Image
                  src="https://d335luupugsy2.cloudfront.net/cms/files/712823/1741707586/$cp1cvniio3j"
                  alt="Incorporation Logo"
                  width={238}
                  height={100}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="space-y-4 text-black text-sm">
              <p>
                Imagens ilustrativas. Material preliminar de pesquisa de mercado sujeito a alteração sem aviso prévio.
              </p>

              <div>
                <p>
                  <strong>Autor do projeto:</strong>
                </p>
                <p>LUIS GUSTAVO SABAINI DE SOUZA</p>
                <p>N° de registro: 000A547964</p>
                <p>Inscrição Municipal: 297402</p>
                <p>CNPJ: 55.298.423/0001-21</p>
                <p>CEP 87014-180</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
