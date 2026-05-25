import {useEffect, useState} from 'react';
import axiosInstance from '../utils/axiosInstance';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    categoryTitle: '',
    categoryDescription: '',
  });
  const [createForm, setCreateForm] = useState({
    categoryTitle: '',
    categoryDescription: '',
  });
  const [creating, setCreating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const r = await axiosInstance.get('/api/categories/');
      setCategories(r.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (catId) => {
    if (!window.confirm('Delete this category?')) return;
    setDeletingId(catId);
    try {
      await axiosInstance.delete(`/api/categories/${catId}`);
      fetchCategories();
    } catch {
      alert('Failed to delete category.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditSave = async (catId) => {
    try {
      await axiosInstance.put(`/api/categories/${catId}`, editForm);
      setEditingId(null);
      fetchCategories();
    } catch {
      alert('Failed to update category.');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setCreating(true);
    try {
      await axiosInstance.post('/api/categories/', createForm);
      setCreateForm({categoryTitle: '', categoryDescription: ''});
      setShowCreate(false);
      fetchCategories();
    } catch {
      setError('Failed to create category.');
    } finally {
      setCreating(false);
    }
  };

  const inputClass =
    'w-full h-[38px] bg-[#F7F5F2] border border-[#E8E6E0] rounded-lg px-3 text-[13px] text-[#2C2C2A] placeholder-gray-400 outline-none focus:border-[#B4500A] focus:bg-white transition';

  return (
    <div
      className="flex flex-col gap-6"
      style={{fontFamily: "'DM Sans', sans-serif"}}>
      <div className="flex items-center justify-between">
        <div>
          <h1
            style={{fontFamily: "'Lora', serif"}}
            className="text-[26px] font-medium text-[#2C2C2A]">
            Categories
          </h1>
          <p className="text-[13px] text-gray-400 mt-1">
            {categories.length} categories
          </p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 bg-[#2C2C2A] hover:bg-[#444441] text-[#E8E6E0] text-[13px] font-medium px-4 py-2.5 rounded-lg transition">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Category
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="bg-white border border-[#E8E6E0] rounded-2xl p-5">
          <h2
            style={{fontFamily: "'Lora', serif"}}
            className="text-[16px] font-medium text-[#2C2C2A] mb-4">
            New Category
          </h2>
          {error && (
            <div className="mb-4 text-[12.5px] text-red-600 bg-red-50 border border-red-100 rounded-lg py-2 px-3">
              {error}
            </div>
          )}
          <form onSubmit={handleCreate} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Category title (min 4 chars)"
              required
              minLength={4}
              value={createForm.categoryTitle}
              onChange={(e) =>
                setCreateForm({...createForm, categoryTitle: e.target.value})
              }
              className={inputClass}
              style={{fontFamily: "'DM Sans', sans-serif"}}
            />
            <input
              type="text"
              placeholder="Description (min 10 chars)"
              required
              minLength={10}
              value={createForm.categoryDescription}
              onChange={(e) =>
                setCreateForm({
                  ...createForm,
                  categoryDescription: e.target.value,
                })
              }
              className={inputClass}
              style={{fontFamily: "'DM Sans', sans-serif"}}
            />
            <div className="flex gap-2 mt-1">
              <button
                type="submit"
                disabled={creating}
                className="bg-[#2C2C2A] hover:bg-[#444441] text-[#E8E6E0] text-[13px] font-medium px-5 py-2 rounded-lg transition disabled:opacity-50">
                {creating ? 'Creating...' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="text-[13px] text-gray-400 hover:text-[#2C2C2A] px-4 py-2 rounded-lg border border-[#E8E6E0] hover:bg-[#F7F5F2] transition">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-[#E8E6E0] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-5 h-5 border-2 border-[#B4500A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : categories.length === 0 ? (
          <p className="text-[13px] text-gray-400 px-6 py-10 text-center">
            No categories yet.
          </p>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#E8E6E0] bg-[#F7F5F2]">
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Title
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 hidden md:table-cell">
                  Description
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7F5F2]">
              {categories.map((cat) => (
                <tr
                  key={cat.categoryId}
                  className="hover:bg-[#F7F5F2] transition">
                  <td className="px-5 py-3.5">
                    {editingId === cat.categoryId ? (
                      <input
                        value={editForm.categoryTitle}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            categoryTitle: e.target.value,
                          })
                        }
                        className={inputClass + ' max-w-[200px]'}
                        style={{fontFamily: "'DM Sans', sans-serif"}}
                      />
                    ) : (
                      <span className="font-medium text-[#2C2C2A]">
                        {cat.categoryTitle}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 hidden md:table-cell">
                    {editingId === cat.categoryId ? (
                      <input
                        value={editForm.categoryDescription}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            categoryDescription: e.target.value,
                          })
                        }
                        className={inputClass}
                        style={{fontFamily: "'DM Sans', sans-serif"}}
                      />
                    ) : (
                      <span className="line-clamp-1">
                        {cat.categoryDescription}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      {editingId === cat.categoryId ? (
                        <>
                          <button
                            onClick={() => handleEditSave(cat.categoryId)}
                            className="text-[12px] text-[#B4500A] hover:underline">
                            Save
                          </button>
                          <span className="text-gray-200">|</span>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-[12px] text-gray-400 hover:text-[#2C2C2A] transition">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingId(cat.categoryId);
                              setEditForm({
                                categoryTitle: cat.categoryTitle,
                                categoryDescription: cat.categoryDescription,
                              });
                            }}
                            className="text-[12px] text-[#B4500A] hover:underline">
                            Edit
                          </button>
                          <span className="text-gray-200">|</span>
                          <button
                            onClick={() => handleDelete(cat.categoryId)}
                            disabled={deletingId === cat.categoryId}
                            className="text-[12px] text-gray-400 hover:text-red-500 transition disabled:opacity-40">
                            {deletingId === cat.categoryId ? '...' : 'Delete'}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
