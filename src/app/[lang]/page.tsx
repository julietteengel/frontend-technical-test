import { getTranslations, type Locale } from '@/locales'

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const t = getTranslations(lang as Locale)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-lbc-orange mb-4">{t.app.title}</h1>
        <p className="text-gray-600">{t.app.comingSoon}</p>
      </div>
    </div>
  )
}
