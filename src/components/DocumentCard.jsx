import { signDocument } from '../api/client'
import { useState } from 'react'

export default function DocumentCard({ document, onSign }) {
  const [isSigning, setIsSigning] = useState(false)

  const handleSign = async () => {
    setIsSigning(true)
    try {
      await signDocument(document.id)
      onSign?.(document.id)
    } catch (error) {
      console.error('Ошибка подписания:', error)
    } finally {
      setIsSigning(false)
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{document.title}</h3>
          <p className="text-sm text-gray-500">ID: {document.id}</p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              document.status === 'signed'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {document.status === 'signed' ? 'Подписан' : 'Ожидает'}
          </span>
          {document.status !== 'signed' && (
            <button
              onClick={handleSign}
              disabled={isSigning}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {isSigning ? 'Подписывается...' : 'Подписать'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}