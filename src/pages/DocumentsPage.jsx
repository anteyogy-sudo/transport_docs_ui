import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { fetchDocuments } from '../api/client'
import Header from '../components/Header'
import DocumentCard from '../components/DocumentCard'

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  
  const handleSign = (docId) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId ? { ...doc, status: 'signed' } : doc
      )
    )
  }

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const data = await fetchDocuments()
        setDocuments(data)
      } catch (error) {
        console.error('Ошибка загрузки документов:', error)
      } finally {
        setLoading(false)
      }
    }
    loadDocuments()
  }, [token])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Загрузка...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Список документов</h1>
        {documents.length === 0 ? (
          <p className="text-gray-500">Нет доступных документов</p>
        ) : (
          <div className="grid gap-4">
            {documents.map((doc) => (
              <DocumentCard key={doc.id} document={doc} onSign={handleSign} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}