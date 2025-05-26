"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Users, CheckCircle, AlertCircle, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function UploadPage() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [contacts, setContacts] = useState<any[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate file processing
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadComplete(true)
          // Simulate parsed contacts
          setContacts([
            { name: "John Doe", email: "john@example.com", whatsapp: "+1234567890", status: "valid" },
            { name: "Jane Smith", email: "jane@example.com", whatsapp: "+1234567891", status: "valid" },
            { name: "Bob Johnson", email: "invalid-email", whatsapp: "+1234567892", status: "invalid" },
            { name: "Alice Brown", email: "alice@example.com", whatsapp: "", status: "partial" },
            { name: "Charlie Wilson", email: "charlie@example.com", whatsapp: "+1234567894", status: "valid" },
          ])
          return 100
        }
        return prev + 10
      })
    }, 200)
  }, [])

  const validContacts = contacts.filter((c) => c.status === "valid").length
  const invalidContacts = contacts.filter((c) => c.status === "invalid").length
  const partialContacts = contacts.filter((c) => c.status === "partial").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              BulkConnect
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard/contacts" className="text-gray-600 hover:text-purple-600 transition-colors">
              Contacts
            </Link>
            <Link href="/dashboard/campaigns" className="text-gray-600 hover:text-purple-600 transition-colors">
              Campaigns
            </Link>
            <Link href="/dashboard/analytics" className="text-gray-600 hover:text-purple-600 transition-colors">
              Analytics
            </Link>
          </nav>
          <Button variant="outline">Profile</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Upload Contacts</h1>
          <p className="text-gray-600">Import your contact list from CSV or Excel files</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>File Upload</CardTitle>
                <CardDescription>
                  Upload a CSV or Excel file containing your contacts. Required columns: Name, Email, WhatsApp Number
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div className="space-y-2">
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-lg font-medium text-gray-700">Choose a file</span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <p className="text-sm text-gray-500">CSV, XLSX up to 10MB</p>
                  </div>
                </div>

                {selectedFile && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                )}

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing file...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}

                {uploadComplete && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">File processed successfully!</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{validContacts}</div>
                        <div className="text-sm text-green-700">Valid Contacts</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">{partialContacts}</div>
                        <div className="text-sm text-yellow-700">Partial Data</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{invalidContacts}</div>
                        <div className="text-sm text-red-700">Invalid Contacts</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Preview */}
            {uploadComplete && (
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Contact Preview</CardTitle>
                  <CardDescription>Review your imported contacts before saving</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {contacts.map((contact, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-gray-600">{contact.email}</p>
                            {contact.whatsapp && <p className="text-sm text-gray-600">{contact.whatsapp}</p>}
                          </div>
                        </div>
                        <Badge
                          className={
                            contact.status === "valid"
                              ? "bg-green-100 text-green-800"
                              : contact.status === "partial"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {contact.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex space-x-3">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Save Contacts
                    </Button>
                    <Button variant="outline">Download Errors</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Instructions */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>File Format Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Required Columns:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Name (required)</li>
                    <li>• Email (required)</li>
                    <li>• WhatsApp Number (optional)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Optional Columns:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Company</li>
                    <li>• Location</li>
                    <li>• Tags</li>
                  </ul>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Tip:</p>
                      <p>WhatsApp numbers should include country code (e.g., +1234567890)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Sample Template</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Download our sample template to ensure proper formatting</p>
                <Button variant="outline" className="w-full">
                  Download Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
