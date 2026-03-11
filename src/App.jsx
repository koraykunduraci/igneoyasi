import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="w-full min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-emerald-400">Türkiye Haritası Projesi</h1>
      <p className="text-neutral-400 max-w-lg text-center">
        Proje başarıyla oluşturuldu! Lütfen kullanacağın fotoğraf ve videoları bu klasörün içine (örneğin <code className="bg-neutral-800 px-2 py-1 rounded">public</code> klasörüne) yükle.
      </p>
    </div>
  )
}

export default App
