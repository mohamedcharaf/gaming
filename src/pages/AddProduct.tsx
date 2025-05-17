import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

/** Typage du formulaire */
interface ProductForm {
  name:        string;
  description: string;
  price:       string;
  image_url:   string;
}

export default function AddProduct() {
  const [form, setForm] = useState<ProductForm>({
    name: '',
    description: '',
    price: '',
    image_url: '',
  });

  const [errorMsg, setErrorMsg]   = useState<string | null>(null);
  const [success, setSuccess]     = useState(false);
  const [isSaving, setIsSaving]   = useState(false);

  /** Gestion des champs */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setSuccess(false);
    setErrorMsg(null);
  };

  /** Soumission */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccess(false);

    // Validation rapide
    if (!form.name || !form.description || !form.price || !form.image_url) {
      setErrorMsg('Tous les champs sont obligatoires.');
      return;
    }

    const priceNumber = Number(form.price);
    if (Number.isNaN(priceNumber) || priceNumber <= 0) {
      setErrorMsg('Le prix doit être un nombre positif.');
      return;
    }

    try {
      setIsSaving(true);

      const { error } = await supabase.from('products').insert([
        {
          name:        form.name,
          description: form.description,
          price:       priceNumber,
          image_url:   form.image_url,
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setForm({ name: '', description: '', price: '', image_url: '' });
    } catch (err: any) {
      setErrorMsg(err.message ?? 'Erreur inconnue.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Ajouter un produit</h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* Messages flash */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {errorMsg}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
              Produit ajouté avec succès !
            </div>
          )}

          {/* Formulaire */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2"
          >
            {/* Nom */}
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1" htmlFor="name">
                Nom
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder="Gaming Keyboard X100"
                required
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder="Clavier mécanique RGB ultra-rapide…"
                required
              />
            </div>

            {/* Prix */}
            <div>
              <label className="block text-sm mb-1" htmlFor="price">
                Prix (€)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder="149.99"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm mb-1" htmlFor="image_url">
                Image URL
              </label>
              <input
                id="image_url"
                name="image_url"
                type="url"
                value={form.image_url}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder="https://…/keyboard.jpg"
                required
              />
            </div>

            {/* Bouton Submit */}
            <div className="sm:col-span-2 text-right">
              <button
                type="submit"
                disabled={isSaving}
                className={`px-6 py-2 rounded-lg font-semibold transition
                  ${isSaving
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                {isSaving ? 'Sauvegarde…' : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
