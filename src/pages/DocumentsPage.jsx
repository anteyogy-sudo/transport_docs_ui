import { useEffect, useState } from 'react'
import { fetchDocuments } from '../api/client'
import Header from '../components/Header'
import DocumentCard from '../components/DocumentCard'
import { getAdminMessage } from '../api/client'

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [adminMessage, setAdminMessage] = useState('')

  useEffect(() => {
    const loadMessage = async () => {
      try {
        const msg = await getAdminMessage()
        setAdminMessage(msg)
      } catch (error) {
        console.error('Ошибка загрузки сообщения:', error)
      }
    }
    loadMessage()
  }, [])

  const handleSign = (docId) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId))
  }

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const response = await fetchDocuments()
        setDocuments(response?.data || [])
      } catch (error) {
        console.error('Ошибка загрузки документов:', error)
        setDocuments([])
      } finally {
        setLoading(false)
      }
    }
    loadDocuments()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {adminMessage && (
        <div className="bg-blue-50 border-l-4 border-blue-500 text-black-700 p-4 mb-6 rounded">
          <h3 className="text-1xl font-bold mb-2">Сообщение для сотрудников</h3>
          <p className="text-base font-normal">
            📢 {adminMessage}
          </p>
        </div>
      )}
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