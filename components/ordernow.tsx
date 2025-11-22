"use client";

import React, { useState, useRef } from 'react';
import Stepper, { Step } from './ui/stepper';
import { Layers, Globe, Smartphone, BarChart3, Sparkles, Calendar } from 'lucide-react';

export default function OrderNow() {
  const [name, setName] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [notes, setNotes] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const projectTypes = [
    {
      id: 'simple-app',
      title: 'Aplikasi Sederhana',
      description: 'Aplikasi dengan desain dan fungsionalitas sederhana',
      icon: Layers
    },
    {
      id: 'website',
      title: 'Website',
      description: 'Landing page, aplikasi website, company profile, dll',
      icon: Globe
    },
    {
      id: 'mobile-app',
      title: 'Mobile App',
      description: 'Membuat aplikasi mobile (flutter, kotlin, dll.)',
      icon: Smartphone
    },
    {
      id: 'data-science',
      title: 'Data Science',
      description: 'Pembuatan model AI, data cleaning/analysis',
      icon: BarChart3
    },
    {
      id: 'other',
      title: 'Lainnya (custom)',
      description: 'Pilih ini jika kamu bingung atau jenis proyekmu tidak tersedia pada pilihan diatas',
      icon: Sparkles
    }
  ];

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (selectedFiles) {
      const validFiles = Array.from(selectedFiles).filter(file => {
        const isValidType = file.type.startsWith('image/') || file.type === 'application/pdf';
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
        return isValidType && isValidSize;
      });
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Validation function for step navigation
  const canNavigateToStep = (targetStep: number): boolean => {
    // Can always go back
    if (targetStep < 1) return true;
    
    // Step 1: Must select project type to go to step 2 or beyond
    if (targetStep >= 2 && !selectedProjectType) {
      return false;
    }
    
    // Step 2: Optional (upload reference), can always navigate if project type selected
    if (targetStep === 2) {
      return true;
    }
    
    // Step 3: Detail project - no required fields, can navigate if project type selected
    if (targetStep === 3) {
      return true;
    }
    
    // Step 4: Can navigate to contact info step (user can fill it there)
    if (targetStep === 4) {
      return true;
    }
    
    // Step 5: Review - can navigate only if all required fields are filled
    if (targetStep === 5) {
      return selectedProjectType !== null && name !== '' && email !== '' && phone !== '';
    }
    
    return true;
  };

  return (
    <section id="order" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">Get Started</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 text-balance">Order Now</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance mb-0">
            Follow the simple steps below to place your order
          </p>
        </div>

        <div className="flex justify-center">
          <Stepper
            initialStep={1}
            onStepChange={(step) => {
              console.log(step);
            }}
            onFinalStepCompleted={() => console.log("All steps completed!")}
            backButtonText="Previous"
            nextButtonText="Isi detail proyek"
            stepCircleContainerClassName="max-w-4xl w-full"
            contentClassName="!px-4 sm:!px-6"
            canNavigateToStep={canNavigateToStep}
          >
            <Step>
              <div className="w-full mx-auto pb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                  Pilih Jenis Proyek
                </h2>
                <p className="text-gray-400 text-sm mb-5 text-center">
                  Pilih jenis proyek yang ingin kamu buat <span className="text-red-400">*</span>
                </p>

                <div className="space-y-3">
                  {projectTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <React.Fragment key={type.id}>
                        <button
                          onClick={() => setSelectedProjectType(type.id)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${
                            selectedProjectType === type.id
                              ? 'border-primary bg-primary/10'
                              : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                          }`}
                        >
                          <div className={`shrink-0 mt-0.5 ${
                            selectedProjectType === type.id ? 'text-primary' : 'text-white'
                          }`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-white mb-1">{type.title}</div>
                            <div className="text-sm text-gray-400">{type.description}</div>
                          </div>
                        </button>
                        {type.id === 'website' && (
                          <p className="text-gray-400 text-sm text-center py-2">
                            kami juga bisa buatkan kamu joki proyek selain website
                          </p>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {selectedProjectType === null && (
                  <p className="text-red-400 text-sm mt-4 text-center">Pilih jenis proyek terlebih dahulu</p>
                )}
              </div>
            </Step>
            <Step>
              <div className="w-full mx-auto pb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                  Upload Referensi
                </h2>
                <p className="text-gray-400 text-sm mb-5 text-center">
                  Upload file referensi jika ada (opsional)
                </p>

                {/* File upload area */}
                <div className="mb-4">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <svg
                        className="w-16 h-16 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <div className="text-white">
                        <span className="underline">Klik untuk upload</span> atau tarik dan lepas files disini
                      </div>
                      <p className="text-sm text-gray-400">
                        Tipe File: image/*,.pdf • Max 5.0 MB
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </div>

                  {/* Uploaded files list */}
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                        >
                          <span className="text-sm text-gray-300 truncate flex-1">{file.name}</span>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-red-400 hover:text-red-300 ml-2"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Comment/Notes section */}
                <div className="mb-4">
                  <p className="text-white mb-2 text-sm">
                    Mau kasih komentar tentang file atau share link? Silakan tulis yaa
                  </p>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Catatan (opsional)"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                </div>

                <div className="mt-6 flex justify-center">
                  <button className="text-blue-400 hover:text-blue-300 underline text-sm px-4 py-2 rounded-lg border border-blue-400/30 hover:border-blue-400/50 transition-all">
                    Skip deh ah, langsung diskusi via chat ajah
                  </button>
                </div>
              </div>
            </Step>
            <Step>
              <div className="w-full mx-auto pb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                  Detail Proyek
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2 text-sm font-medium">
                      Nama Proyek
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="Contoh: Website Company Profile PT ABC"
                      className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2 text-sm font-medium">
                      Deskripsi Proyek
                    </label>
                    <textarea
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder="Ceritakan tentang proyek yang ingin kamu buat..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2 text-sm font-medium">
                        Budget (Opsional)
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-700 bg-gray-800 text-white outline-none focus:ring-2 focus:ring-primary appearance-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '12px'
                        }}
                      >
                        
                        {/* Opsi Receh buat Tugas Harian */}
                        <option value="< 100rb">Tugas Ringan (&lt; 100rb)</option>
                        <option value="100rb - 300rb">Tugas Kuliah / Tubes Kecil (100rb - 300rb)</option>
                        
                        {/* Opsi Tubes Besar / Web Sederhana */}
                        <option value="300rb - 800rb">Website Sederhana / Landing Page (300rb - 800rb)</option>
                        
                        {/* Opsi Skripsi / Proyek UMKM */}
                        <option value="800rb - 2jt">Aplikasi Skripsi / Web UMKM (800rb - 2jt)</option>
                        <option value="> 2jt">Full Custom / Fitur Banyak (&gt; 2jt)</option>
                        
                        <option value="Nego">Belum tau (Nego di WA aja)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white mb-2 text-sm font-medium">
                        Deadline (Opsional)
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          ref={dateInputRef}
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="absolute opacity-0 pointer-events-none"
                        />
                        <div
                          onClick={() => dateInputRef.current?.showPicker()}
                          className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-700 bg-gray-800 text-white outline-none focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent cursor-pointer flex items-center"
                        >
                          <span className={timeline ? 'text-white' : 'text-gray-500'}>
                            {timeline 
                              ? new Date(timeline).toLocaleDateString('id-ID', { 
                                  day: 'numeric', 
                                  month: 'long', 
                                  year: 'numeric' 
                                })
                              : 'Pilih deadline'
                            }
                          </span>
                        </div>
                        <Calendar 
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white cursor-pointer" 
                          onClick={() => dateInputRef.current?.showPicker()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
            <Step>
              <div className="w-full mx-auto pb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                  Informasi Kontak
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2 text-sm font-medium">
                      Nama Lengkap <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan nama lengkap kamu"
                      className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2 text-sm font-medium">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contoh@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2 text-sm font-medium">
                      Nomor WhatsApp <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="081234567890"
                      className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </Step>
            <Step>
              <div className="w-full mx-auto pb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                  Review & Konfirmasi
                </h2>
                
                <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Detail Proyek</h3>
                    <div className="text-gray-300 text-sm space-y-1">
                      <p><span className="text-gray-400">Nama Proyek:</span> {projectName || '-'}</p>
                      <p><span className="text-gray-400">Deskripsi:</span> {projectDescription || '-'}</p>
                      <p><span className="text-gray-400">Jenis Proyek:</span> {selectedProjectType ? projectTypes.find(t => t.id === selectedProjectType)?.title : '-'}</p>
                      {budget && <p><span className="text-gray-400">Budget:</span> {budget}</p>}
                      {timeline && <p><span className="text-gray-400">Deadline:</span> {new Date(timeline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>}
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <h3 className="text-white font-semibold mb-2">Informasi Kontak</h3>
                    <div className="text-gray-300 text-sm space-y-1">
                      <p><span className="text-gray-400">Nama:</span> {name || '-'}</p>
                      <p><span className="text-gray-400">Email:</span> {email || '-'}</p>
                      <p><span className="text-gray-400">WhatsApp:</span> {phone || '-'}</p>
                    </div>
                  </div>

                  {files.length > 0 && (
                    <div className="border-t border-gray-700 pt-4">
                      <h3 className="text-white font-semibold mb-2">File Referensi</h3>
                      <div className="text-gray-300 text-sm">
                        <p>{files.length} file(s) diupload</p>
                      </div>
                    </div>
                  )}

                  {notes && (
                    <div className="border-t border-gray-700 pt-4">
                      <h3 className="text-white font-semibold mb-2">Catatan</h3>
                      <p className="text-gray-300 text-sm">{notes}</p>
                    </div>
                  )}
                </div>

                <p className="text-gray-400 text-sm mt-6 text-center">
                  Pastikan semua informasi sudah benar sebelum mengirim pesanan
                </p>
              </div>
            </Step>
          </Stepper>
        </div>
      </div>
    </section>
  );
}
