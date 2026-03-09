import React, { useState } from 'react'
import { supabase } from '../../../backend/supabaseClient'

export default function ClientForm() {
  const [nomcompelt, setNomCompelt] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [typeProjet, setTypeProjet] = useState('')
  const [surface, setSurface] = useState('')
  const [files, setFiles] = useState([])

  const handleFiles = (e) => 
    console.log(e.target.files)
    setFiles([...e.target.files])

  async function uploadFile(file) {
    const { data, error } = await supabase.storage
      .from('documents-projects')
      .upload(`files/${Date.now()}-${file.name}`, file)

    if (error) {
      console.error(error)
      return null
    }
    return data.path
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // 1️⃣ Save info formulaire
      const { data: newDemande, error: insertError } = await supabase
        .from('demandes_devis')
        .insert([{ nomcompelt, email, telephone, type_projet: typeProjet, surface }])
        .select()

      if (insertError) throw insertError

      const demandeId = newDemande[0].id

      // 2️⃣ Upload files and save paths
      for (let file of files) {
        const filePath = await uploadFile(file)
        await supabase.from('documents').insert([
          { demande_id: demandeId, file_name: file.name, file_path: filePath }
        ])
      }

      alert('Devis envoyé avec succès !')
      // reset form
      setNomCompelt(''); setEmail(''); setTelephone(''); setTypeProjet(''); setSurface(''); setFiles([])

    } catch (error) {
      console.error(error)
      alert('Erreur lors de l\'envoi du devis')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={nomcompelt} onChange={e => setNomCompelt(e.target.value)} placeholder="Nom Complet" required />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
      <input value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="Téléphone" required />
      <input value={typeProjet} onChange={e => setTypeProjet(e.target.value)} placeholder="Type de projet" required />
      <input value={surface} onChange={e => setSurface(e.target.value)} placeholder="Surface" type="number" required />
      <input type="file" multiple onChange={handleFiles} />
      <button type="submit">Envoyer Devis</button>
    </form>
  )
}

