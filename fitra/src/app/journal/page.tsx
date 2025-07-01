"use client";
import React, { useState, useRef } from "react";
import { Plus, Trash2, Edit2, Save, X, BookOpen, Star, CalendarDays, Palette, Pin, MoreVertical, CheckCircle2, Copy, Share2 } from "lucide-react";
import Sidebar from "../../components/Sidebar";

type Note = {
  id: number;
  title: string;
  content: string;
  color: string;
  favorite: boolean;
  pinned: boolean;
  date: string;
  attachments?: Attachment[];
  history?: NoteHistory[];
};

type Attachment = {
  id: string;
  name: string;
  url: string;
  type: string;
};

type NoteHistory = {
  title: string;
  content: string;
  date: string;
};

const COLORS = [
  { class: "bg-yellow-100", label: "Yellow" },
  { class: "bg-blue-100", label: "Blue" },
  { class: "bg-pink-100", label: "Pink" },
  { class: "bg-green-100", label: "Green" },
  { class: "bg-purple-100", label: "Purple" },
  { class: "bg-zinc-100", label: "Gray" },
];

export default function JournalPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newNote, setNewNote] = useState({ title: "", content: "", color: COLORS[0].class, attachments: [] as Attachment[] });
  const [search, setSearch] = useState("");
  const [undoStack, setUndoStack] = useState<Note[][]>([]);
  const [redoStack, setRedoStack] = useState<Note[][]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAddCard, setShowAddCard] = useState(false);

  // --- Note History/Undo helpers ---
  const pushUndo = (newNotes: Note[]) => {
    setUndoStack(stack => [...stack, notes]);
    setRedoStack([]);
    setNotes(newNotes);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    setRedoStack(stack => [...stack, notes]);
    setNotes(undoStack[undoStack.length - 1]);
    setUndoStack(stack => stack.slice(0, -1));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    setUndoStack(stack => [...stack, notes]);
    setNotes(redoStack[redoStack.length - 1]);
    setRedoStack(stack => stack.slice(0, -1));
  };

  // --- Add Note ---
  const handleAddNote = () => {
    if (!newNote.title && !newNote.content && (!newNote.attachments || newNote.attachments.length === 0)) return;
    const note: Note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      color: newNote.color,
      favorite: false,
      pinned: false,
      date: new Date().toLocaleDateString(),
      attachments: newNote.attachments,
      history: [],
    };
    pushUndo([note, ...notes]);
    setNewNote({ title: "", content: "", color: COLORS[0].class, attachments: [] });
  };
  const handlePin = (id: number) => {
    pushUndo(notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };
  const handleCopy = (content: string) => navigator.clipboard.writeText(content);
  const handleShare = (title: string, content: string) => {
    if (navigator.share) {
      navigator.share({ title, text: content });
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; id: number | null } | null>(null);
  const handleContextMenu = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, id });
  };
  const closeContextMenu = () => setContextMenu(null);

  const handleDelete = (id: number) => {
    pushUndo(notes.filter((n) => n.id !== id));
  };
  const handleEdit = (id: number) => setEditingId(id);
  const handleSave = (id: number, title: string, content: string) => {
    const updatedNotes = notes.map((n) => {
      if (n.id === id) {
        const history = n.history ? [...n.history, { title: n.title, content: n.content, date: n.date }] : [{ title: n.title, content: n.content, date: n.date }];
        return { ...n, title, content, history };
      }
      return n;
    });
    pushUndo(updatedNotes);
    setEditingId(null);
  };
  const handleFavorite = (id: number) => {
    pushUndo(notes.map((n) => n.id === id ? { ...n, favorite: !n.favorite } : n));
  };

  // --- Attachments ---
  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const attachments: Attachment[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      attachments.push({
        id: `${file.name}-${Date.now()}-${i}`,
        name: file.name,
        url,
        type: file.type,
      });
    }
    setNewNote(n => ({ ...n, attachments: [...(n.attachments || []), ...attachments] }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveAttachment = (idx: number) => {
    setNewNote(n => ({ ...n, attachments: n.attachments?.filter((_, i) => i !== idx) || [] }));
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-yellow-50 to-zinc-100">
      <Sidebar />
      <div className="flex-1 max-w-5xl mx-auto p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-zinc-900 flex items-center gap-2"><BookOpen className="w-8 h-8 text-yellow-400 animate-bounce" /> Journal</h1>
          {/* Search beside sidebar */}
          <form className="flex gap-2 items-center w-full md:w-auto" onSubmit={e => { e.preventDefault(); }}>
            <input
              className="flex-1 md:w-72 px-4 py-3 rounded-lg border border-yellow-200 bg-white/80 text-zinc-900 font-semibold focus:outline-yellow-400"
              placeholder="Search notes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 px-3 py-2 rounded-lg font-semibold shadow flex items-center gap-1"
              type="submit"
              title="Search"
            >
              🔍 Search
            </button>
          </form>
        </div>
        {/* Add Note Button + Undo/Redo */}
        <div className="mb-8 flex gap-2 items-center">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 px-4 py-2 rounded-lg font-semibold shadow-md flex items-center gap-2"
            onClick={() => setShowAddCard(true)}
          >
            <Plus className="w-5 h-5" /> Add Note
          </button>
          <button
            className="bg-zinc-200 hover:bg-zinc-300 text-zinc-700 px-3 py-2 rounded-lg font-semibold shadow flex items-center gap-1"
            onClick={handleUndo}
            disabled={undoStack.length === 0}
            title="Undo"
          >
            ⎌ Undo
          </button>
          <button
            className="bg-zinc-200 hover:bg-zinc-300 text-zinc-700 px-3 py-2 rounded-lg font-semibold shadow flex items-center gap-1"
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            title="Redo"
          >
            ↻ Redo
          </button>
        </div>
        {/* Add Note Card Modal */}
        {showAddCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative animate-fade-in">
              <button
                className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-700"
                onClick={() => setShowAddCard(false)}
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold mb-4 text-zinc-900 flex items-center gap-2"><BookOpen className="w-6 h-6 text-yellow-400" /> New Note</h2>
              <input
                className="w-full px-4 py-3 rounded-lg border border-yellow-200 bg-white/80 text-zinc-900 font-semibold focus:outline-yellow-400 mb-3"
                placeholder="Title"
                value={newNote.title}
                onChange={e => setNewNote({ ...newNote, title: e.target.value })}
              />
              <textarea
                className="w-full px-4 py-3 rounded-lg border border-yellow-200 bg-white/80 text-zinc-900 font-semibold focus:outline-yellow-400 mb-3 min-h-[80px]"
                placeholder="Write your note..."
                value={newNote.content}
                onChange={e => setNewNote({ ...newNote, content: e.target.value })}
              />
              {/* Attachments */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleAttachmentChange}
                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.csv,.xlsx,.ppt,.pptx"
                    title="Attach files or media"
                  />
                  <button
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg font-semibold shadow flex items-center gap-1"
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                    title="Attach files or media"
                  >
                    📎 Attach Media
                  </button>
                  <div className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-yellow-400" />
                    <select
                      className="px-2 py-2 rounded-lg border border-yellow-200 bg-white/80 text-zinc-900 font-semibold"
                      value={newNote.color}
                      onChange={e => setNewNote({ ...newNote, color: e.target.value })}
                      aria-label="Select note color"
                    >
                      {COLORS.map((c, i) => (
                        <option key={i} value={c.class}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Show attachments for new note */}
                {newNote.attachments && newNote.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {newNote.attachments.map((att, idx) => (
                      <div key={att.id} className="flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded shadow text-xs">
                        {att.type.startsWith('image') ? (
                          <img src={att.url} alt={att.name} className="w-8 h-8 object-cover rounded" />
                        ) : (
                          <span className="w-8 h-8 bg-zinc-200 rounded flex items-center justify-center">📎</span>
                        )}
                        <span>{att.name}</span>
                        <button className="ml-1 text-red-400 hover:text-red-600" onClick={() => handleRemoveAttachment(idx)} title="Remove attachment">✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="bg-zinc-300 hover:bg-zinc-400 text-zinc-700 px-4 py-2 rounded-lg font-semibold"
                  onClick={() => setShowAddCard(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 px-4 py-2 rounded-lg font-semibold shadow-md flex items-center gap-2"
                  onClick={() => { handleAddNote(); setShowAddCard(false); }}
                  type="button"
                >
                  <Plus className="w-5 h-5" /> Add Note
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notes.length === 0 && (
            <div className="col-span-full text-center text-zinc-400 italic py-12 text-lg">No notes yet. Start journaling your thoughts!</div>
          )}
          {/* Pinned notes first, filtered by search */}
          {([...notes.filter(n => n.pinned), ...notes.filter(n => !n.pinned)]
            .filter(n =>
              n.title.toLowerCase().includes(search.toLowerCase()) ||
              n.content.toLowerCase().includes(search.toLowerCase()) ||
              (n.attachments && n.attachments.some(a => a.name.toLowerCase().includes(search.toLowerCase())))
            )
          ).map((note) => (
            <div
              key={note.id}
              className={`relative rounded-2xl p-5 shadow-lg border border-yellow-100 ${note.color} transition-all group` + (note.favorite ? " ring-2 ring-yellow-400" : "")}
              onContextMenu={e => handleContextMenu(e, note.id)}
            >
              {note.pinned && (
                <div className="absolute -top-3 left-4 flex items-center gap-1">
                  <Pin className="w-5 h-5 text-yellow-500 rotate-12" />
                  <span className="text-xs text-yellow-600 font-bold">Pinned</span>
                </div>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-500">{note.date}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleFavorite(note.id)}
                    title={note.favorite ? "Unmark as favorite" : "Mark as favorite"}
                    aria-label={note.favorite ? "Unmark as favorite" : "Mark as favorite"}
                  >
                    <Star className={`w-5 h-5 ${note.favorite ? 'text-yellow-400 fill-yellow-400 animate-pulse' : 'text-zinc-300'}`} />
                  </button>
                  <button
                    onClick={e => handleContextMenu(e as any, note.id)}
                    title="More options"
                    aria-label="More options"
                  >
                    <MoreVertical className="w-5 h-5 text-zinc-400 hover:text-zinc-700" />
                  </button>
                </div>
              </div>
          {/* Context Menu */}
          {contextMenu && (
            <div
              className="fixed z-50 bg-white border border-zinc-200 rounded-lg shadow-lg py-2 px-2 min-w-[160px]"
              style={{ top: contextMenu.y, left: contextMenu.x }}
              onMouseLeave={closeContextMenu}
            >
              <button
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-yellow-100 rounded text-zinc-800"
                onClick={() => { handlePin(contextMenu.id!); closeContextMenu(); }}
              >
                <Pin className="w-4 h-4 text-yellow-500" /> {notes.find(n => n.id === contextMenu.id)?.pinned ? "Unpin" : "Pin"} note
              </button>
              <button
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-yellow-100 rounded text-zinc-800"
                onClick={() => { handleFavorite(contextMenu.id!); closeContextMenu(); }}
              >
                <Star className="w-4 h-4 text-yellow-400" /> {notes.find(n => n.id === contextMenu.id)?.favorite ? "Unfavorite" : "Favorite"}
              </button>
              <button
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-yellow-100 rounded text-zinc-800"
                onClick={() => { handleEdit(contextMenu.id!); closeContextMenu(); }}
              >
                <Edit2 className="w-4 h-4 text-blue-500" /> Edit
              </button>
              <button
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-yellow-100 rounded text-zinc-800"
                onClick={() => { handleDelete(contextMenu.id!); closeContextMenu(); }}
              >
                <Trash2 className="w-4 h-4 text-red-400" /> Delete
              </button>
              <button
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-yellow-100 rounded text-zinc-800"
                onClick={() => { handleCopy(notes.find(n => n.id === contextMenu.id)?.content || ""); closeContextMenu(); }}
              >
                <Copy className="w-4 h-4 text-zinc-500" /> Copy
              </button>
              <button
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-yellow-100 rounded text-zinc-800"
                onClick={() => { handleShare(notes.find(n => n.id === contextMenu.id)?.title || "Note", notes.find(n => n.id === contextMenu.id)?.content || ""); closeContextMenu(); }}
              >
                <Share2 className="w-4 h-4 text-zinc-500" /> Share
              </button>
            </div>
          )}
              {editingId === note.id ? (
                <>
                  <input
                    className="w-full px-2 py-1 rounded mb-2 border border-yellow-200"
                    value={note.title}
                    onChange={e => setNotes(notes.map(n => n.id === note.id ? { ...n, title: e.target.value } : n))}
                    placeholder="Title"
                    title="Edit note title"
                  />
                  <textarea
                    className="w-full px-2 py-1 rounded mb-2 border border-yellow-200"
                    value={note.content}
                    onChange={e => setNotes(notes.map(n => n.id === note.id ? { ...n, content: e.target.value } : n))}
                    placeholder="Edit note content"
                    title="Edit note content"
                  />
                  {/* Attachments for editing note (not editable for now) */}
                  {note.attachments && note.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {note.attachments.map(att => (
                        <div key={att.id} className="flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded shadow text-xs">
                          {att.type.startsWith('image') ? (
                            <img src={att.url} alt={att.name} className="w-8 h-8 object-cover rounded" />
                          ) : (
                            <span className="w-8 h-8 bg-zinc-200 rounded flex items-center justify-center">📎</span>
                          )}
                          <span>{att.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Note history */}
                  {note.history && note.history.length > 0 && (
                    <details className="mb-2">
                      <summary className="cursor-pointer text-xs text-zinc-500">View history</summary>
                      <ul className="text-xs bg-zinc-50 rounded p-2 mt-1">
                        {note.history.map((h, i) => (
                          <li key={i} className="mb-1">
                            <span className="font-bold">{h.title}</span> <span className="text-zinc-400">({h.date})</span>
                            <div className="text-zinc-600">{h.content}</div>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                  <div className="flex gap-2">
                    <button
                      className="bg-green-400 hover:bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleSave(note.id, note.title, note.content)}
                      title="Save note"
                      aria-label="Save note"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      className="bg-zinc-300 hover:bg-zinc-400 text-zinc-700 px-2 py-1 rounded"
                      onClick={() => setEditingId(null)}
                      title="Cancel editing"
                      aria-label="Cancel editing"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-zinc-900 mb-1 flex items-center gap-2">
                    {note.title}
                    {note.favorite && <Star className="w-4 h-4 text-yellow-400 ml-1 animate-bounce" />}
                    {note.pinned && <Pin className="w-4 h-4 text-yellow-500 ml-1 animate-bounce" />}
                  </h2>
                  <p className="text-zinc-700 mb-2 whitespace-pre-line">{note.content}</p>
                  {/* Attachments display */}
                  {note.attachments && note.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {note.attachments.map(att => (
                        <a key={att.id} href={att.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded shadow text-xs hover:bg-zinc-200">
                          {att.type.startsWith('image') ? (
                            <img src={att.url} alt={att.name} className="w-8 h-8 object-cover rounded" />
                          ) : (
                            <span className="w-8 h-8 bg-zinc-200 rounded flex items-center justify-center">📎</span>
                          )}
                          <span>{att.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                  {/* Unique feature: Mark as done */}
                  <div className="flex gap-2 mb-2">
                    <button
                      className="flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 text-xs font-semibold"
                      onClick={() => alert('Congrats! You marked this note as done!')}
                      title="Mark as done"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Done
                    </button>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all absolute top-3 right-8 md:right-8 lg:right-10 xl:right-12">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 px-2 py-1 rounded"
                      onClick={() => handleEdit(note.id)}
                      title="Edit note"
                      aria-label="Edit note"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(note.id)}
                      title="Delete note"
                      aria-label="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {/* Note history (view only) */}
                  {note.history && note.history.length > 0 && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-xs text-zinc-500">View history</summary>
                      <ul className="text-xs bg-zinc-50 rounded p-2 mt-1">
                        {note.history.map((h, i) => (
                          <li key={i} className="mb-1">
                            <span className="font-bold">{h.title}</span> <span className="text-zinc-400">({h.date})</span>
                            <div className="text-zinc-600">{h.content}</div>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
