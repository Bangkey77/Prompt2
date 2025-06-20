
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Copy, Heart, Upload, Volume2, Camera, User, MapPin, Video, Palette, Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  // State untuk semua input
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [subject, setSubject] = useState('');
  const [character, setCharacter] = useState('');
  const [action, setAction] = useState('');
  const [location, setLocation] = useState('');
  const [cameraMovement, setCameraMovement] = useState('');
  const [language, setLanguage] = useState('Bahasa Indonesia');
  const [videoRatio, setVideoRatio] = useState('16:9');
  const [videoQuality, setVideoQuality] = useState('HD 1080p');
  const [dialogues, setDialogues] = useState(['', '', '', '', '']);
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  // Options untuk berbagai menu
  const locationOptions = [
    'Ruang Tamu Modern', 'Kantor Profesional', 'Taman Kota', 'Pantai Tropis', 
    'Gunung Hijau', 'Kafe Cozy', 'Restoran Mewah', 'Sekolah/Universitas',
    'Rumah Sakit', 'Mall/Shopping Center', 'Studio Rekaman', 'Outdoor Natural'
  ];

  const cameraMovementOptions = [
    'Static Shot', 'Zoom In', 'Zoom Out', 'Pan Left', 'Pan Right',
    'Tilt Up', 'Tilt Down', 'Dolly Forward', 'Dolly Backward',
    'Crane Shot', 'Tracking Shot', 'Handheld Movement'
  ];

  const videoRatioOptions = ['16:9', '9:16', '1:1', '4:3', '21:9'];
  const videoQualityOptions = ['HD 720p', 'HD 1080p', '4K Ultra HD', '8K'];

  // Function untuk generate prompt
  const generatePrompt = () => {
    if (!subject || !action) {
      toast({
        title: "Input Tidak Lengkap",
        description: "Mohon isi minimal Subjek dan Action untuk menghasilkan prompt.",
        variant: "destructive"
      });
      return;
    }

    const dialogueText = dialogues.filter(d => d.trim()).map((dialogue, index) => 
      `Dialog ${index + 1}: "${dialogue}"`
    ).join('\n');

    const prompt = `[VEO 3 PROMPT STRUCTURE]

SCENE DESCRIPTION:
Subjek: ${subject}
${character ? `Karakter: ${character}` : ''}
Action: ${action}
Lokasi: ${location || 'Tidak ditentukan'}

TECHNICAL SPECIFICATIONS:
- Gerakan Kamera: ${cameraMovement || 'Static'}
- Bahasa Percakapan: ${language}
- Rasio Video: ${videoRatio}
- Kualitas: ${videoQuality}
${photoFile ? `- Face Consistency: Menggunakan referensi foto untuk konsistensi wajah` : ''}
${audioFile ? `- Voice Consistency: Menggunakan referensi audio untuk konsistensi suara` : ''}

DIALOGUE SCRIPT (Bahasa Indonesia):
${dialogueText || 'Tidak ada dialog yang ditentukan'}

PROMPT FINAL:
Create a ${videoQuality} video in ${videoRatio} aspect ratio showing ${subject} ${action} at ${location}. ${character ? `The character should be ${character}.` : ''} Camera movement: ${cameraMovement}. ${dialogueText ? `Include the following Indonesian dialogues: ${dialogues.filter(d => d).join(', ')}` : ''} Ensure high-quality cinematic production with professional lighting and clear audio.`;

    setGeneratedPrompt(prompt);
    toast({
      title: "Prompt Berhasil Dibuat!",
      description: "Prompt Veo 3 telah dihasilkan dengan semua spesifikasi Anda."
    });
  };

  // Function untuk copy prompt
  const copyPrompt = () => {
    if (!generatedPrompt) {
      toast({
        title: "Tidak Ada Prompt",
        description: "Silakan generate prompt terlebih dahulu.",
        variant: "destructive"
      });
      return;
    }
    
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Berhasil Disalin!",
      description: "Prompt telah disalin ke clipboard."
    });
  };

  // Function untuk handle file upload
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setPhotoFile(file);
      toast({
        title: "Foto Berhasil Diupload",
        description: "Foto untuk konsistensi wajah telah ditambahkan."
      });
    }
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      toast({
        title: "Audio Berhasil Diupload",
        description: "Audio untuk konsistensi suara telah ditambahkan."
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-gradient-to-r from-purple-500 to-blue-500">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Prompt Generator Veo3 Konsisten Wajah & Suara
              </h1>
              <p className="text-lg text-gray-600 mt-2">Powered By Bangkey</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white">
                  <Heart className="w-4 h-4 mr-2" />
                  Donasi
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center">Dukung Pengembangan</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-4">
                  <img 
                    src="/lovable-uploads/31e9a25f-3a95-4989-a4cd-6e4bed1bf8d4.png" 
                    alt="QRIS Donasi" 
                    className="w-64 h-64 object-contain"
                  />
                  <p className="text-center text-sm text-gray-600">
                    Scan QR Code untuk berdonasi dan mendukung pengembangan aplikasi ini.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* File Upload Section */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Media untuk Konsistensi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="photo-upload" className="flex items-center gap-2 cursor-pointer">
                    <Camera className="w-4 h-4" />
                    Tambah Foto untuk Konsistensi Wajah
                  </Label>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="mt-2"
                  />
                  {photoFile && (
                    <Badge variant="outline" className="mt-2">
                      {photoFile.name}
                    </Badge>
                  )}
                </div>
                <div>
                  <Label htmlFor="audio-upload" className="flex items-center gap-2 cursor-pointer">
                    <Volume2 className="w-4 h-4" />
                    Tambah Suara untuk Konsistensi Audio
                  </Label>
                  <Input
                    id="audio-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    className="mt-2"
                  />
                  {audioFile && (
                    <Badge variant="outline" className="mt-2">
                      {audioFile.name}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Basic Settings */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Pengaturan Dasar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subjek *</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Contoh: Seorang pria berusia 30 tahun"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="character">Karakter</Label>
                  <Input
                    id="character"
                    value={character}
                    onChange={(e) => setCharacter(e.target.value)}
                    placeholder="Contoh: CEO perusahaan teknologi"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="action">Action *</Label>
                  <Input
                    id="action"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    placeholder="Contoh: sedang memberikan presentasi"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location & Camera Settings */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Lokasi & Kamera
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Pilihan Lokasi</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih lokasi..." />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Gerakan Kamera</Label>
                  <Select value={cameraMovement} onValueChange={setCameraMovement}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih gerakan kamera..." />
                    </SelectTrigger>
                    <SelectContent>
                      {cameraMovementOptions.map((movement) => (
                        <SelectItem key={movement} value={movement}>{movement}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Video Settings */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Pengaturan Video
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Bahasa Percakapan</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bahasa Indonesia">Bahasa Indonesia</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Javanese">Bahasa Jawa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Rasio Video</Label>
                    <Select value={videoRatio} onValueChange={setVideoRatio}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {videoRatioOptions.map((ratio) => (
                          <SelectItem key={ratio} value={ratio}>{ratio}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Kualitas Video</Label>
                    <Select value={videoQuality} onValueChange={setVideoQuality}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {videoQualityOptions.map((quality) => (
                          <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dialogue Section */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="w-5 h-5" />
                  Dialog Percakapan (Bahasa Indonesia)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dialogues.map((dialogue, index) => (
                  <div key={index}>
                    <Label>Dialog {index + 1}</Label>
                    <Input
                      value={dialogue}
                      onChange={(e) => {
                        const newDialogues = [...dialogues];
                        newDialogues[index] = e.target.value;
                        setDialogues(newDialogues);
                      }}
                      placeholder={`Masukkan dialog ke-${index + 1}...`}
                      className="mt-1"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button 
                onClick={generatePrompt}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              >
                Hasilkan Prompt
              </Button>
              <Button 
                onClick={copyPrompt}
                variant="outline"
                className="border-purple-200 hover:bg-purple-50"
              >
                <Copy className="w-4 h-4 mr-2" />
                Salin Prompt
              </Button>
              <Button 
                onClick={() => window.open('https://gemini.google.com', '_blank')}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
              >
                Buka Veo3
              </Button>
            </div>

            {/* Generated Prompt Display */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Hasil Prompt Veo 3</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generatedPrompt}
                  readOnly
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Prompt akan muncul di sini setelah Anda mengklik 'Hasilkan Prompt'..."
                />
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Instruksi Teknis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Cara Menggunakan:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-blue-700 mt-2">
                    <li>Upload foto untuk konsistensi wajah (opsional)</li>
                    <li>Upload audio untuk konsistensi suara (opsional)</li>
                    <li>Isi subjek dan action (wajib)</li>
                    <li>Pilih lokasi dan gerakan kamera</li>
                    <li>Atur pengaturan video</li>
                    <li>Tambahkan dialog percakapan</li>
                    <li>Klik "Hasilkan Prompt"</li>
                    <li>Salin prompt dan gunakan di Veo 3</li>
                  </ol>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800">Tips:</h4>
                  <ul className="list-disc list-inside space-y-1 text-green-700 mt-2">
                    <li>Gunakan deskripsi yang jelas dan spesifik</li>
                    <li>Upload foto berkualitas tinggi untuk hasil terbaik</li>
                    <li>Dialog maksimal 5 percakapan untuk video yang efektif</li>
                    <li>Pilih rasio video sesuai platform tujuan</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t shadow-lg mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 Prompt Generator Veo3 - Powered By Bangkey
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="mt-4 sm:mt-0">
                  <Heart className="w-4 h-4 mr-2" />
                  Dukung Dengan Donasi
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center">Terima Kasih!</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-4">
                  <img 
                    src="/lovable-uploads/31e9a25f-3a95-4989-a4cd-6e4bed1bf8d4.png" 
                    alt="QRIS Donasi" 
                    className="w-64 h-64 object-contain"
                  />
                  <p className="text-center text-sm text-gray-600">
                    Donasi Anda sangat membantu pengembangan aplikasi ini. Terima kasih!
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
