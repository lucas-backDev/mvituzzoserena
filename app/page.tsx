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
          Nome: formData.name,
          Email: formData.email,
          Telefone: formData.phone,
          Bairro: formData.neighborhood,
          "Preferência de metragem": formData.preferences.join(", "),
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
          <div className="container mx-auto px-6 md:px-4">
            {/* Seções do Carlos Alberto e Partner - lado a lado sem fundo branco */}
            <div className="max-w-6xl mx-auto mb-16">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Seção esquerda - Carlos Alberto */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <img
                    src="/carlos-foto.png"
                    alt="Carlos Alberto"
                    className="w-48 h-48 rounded-full shadow-lg object-cover"
                  />
                  <img src="/carlos-alberto.png" alt="Carlos Alberto" className="h-8 w-auto max-w-xs" />
                  <img src="/creci.png" alt="CRECI 176.642F" className="h-6 w-auto max-w-xs" />
                </div>

                {/* Seção direita - Partner e Logo */}
                <div className="flex flex-col items-center text-center space-y-6 px-4">
                  <img src="/partner.png" alt="Partner" className="h-7 w-auto max-w-xs" />
                  <img
                    src="/mvituzzo-logo-footer.png"
                    alt="M Vituzzo Empreendimentos"
                    className="h-32 w-auto max-w-full px-2"
                  />
                </div>
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

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5512996508155?text=Olá! Tenho interesse em um empreendimento M Vituzzo. Gostaria de mais informações."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Falar no WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
        </svg>
      </a>
    </div>
  )
}
