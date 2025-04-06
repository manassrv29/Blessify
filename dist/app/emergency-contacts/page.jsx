"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Plus, Trash2, Phone, Mail, User, Save } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export default function EmergencyContactsPage() {
    const [contacts, setContacts] = useState([
        {
            id: "1",
            name: "Jane Smith",
            relationship: "Friend",
            phone: "(555) 123-4567",
            email: "jane@example.com",
            notifyOnDistress: true,
        },
    ]);
    const [newContact, setNewContact] = useState({
        name: "",
        relationship: "",
        phone: "",
        email: "",
        notifyOnDistress: false,
    });
    const [isAddingContact, setIsAddingContact] = useState(false);
    const handleAddContact = () => {
        if (!newContact.name || !newContact.phone)
            return;
        const contact = {
            id: Date.now().toString(),
            name: newContact.name || "",
            relationship: newContact.relationship || "",
            phone: newContact.phone || "",
            email: newContact.email || "",
            notifyOnDistress: newContact.notifyOnDistress || false,
        };
        setContacts([...contacts, contact]);
        setNewContact({
            name: "",
            relationship: "",
            phone: "",
            email: "",
            notifyOnDistress: false,
        });
        setIsAddingContact(false);
    };
    const handleDeleteContact = (id) => {
        setContacts(contacts.filter((contact) => contact.id !== id));
    };
    const handleToggleNotify = (id) => {
        setContacts(contacts.map((contact) => contact.id === id ? Object.assign(Object.assign({}, contact), { notifyOnDistress: !contact.notifyOnDistress }) : contact));
    };
    return (<div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <AlertTriangle className="h-8 w-8 text-primary"/>
          <h1 className="text-3xl font-bold">Emergency Contacts</h1>
        </div>

        <Alert className="mb-8">
          <AlertTriangle className="h-4 w-4"/>
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Emergency contacts can be notified automatically if our system detects signs of severe distress in your
            journal entries. Please ensure your contacts are aware and have consented to being contacted in such
            situations.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Your Contacts</h2>
            {!isAddingContact && (<Button onClick={() => setIsAddingContact(true)}>
                <Plus className="mr-2 h-4 w-4"/>
                Add Contact
              </Button>)}
          </div>

          {contacts.length === 0 && !isAddingContact && (<Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">You haven't added any emergency contacts yet</p>
                <Button onClick={() => setIsAddingContact(true)}>
                  <Plus className="mr-2 h-4 w-4"/>
                  Add Your First Contact
                </Button>
              </CardContent>
            </Card>)}

          {isAddingContact && (<Card>
              <CardHeader>
                <CardTitle>Add New Contact</CardTitle>
                <CardDescription>Add someone who can be contacted in case of emergency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
                      <Input id="name" placeholder="Contact name" className="pl-10" value={newContact.name} onChange={(e) => setNewContact(Object.assign(Object.assign({}, newContact), { name: e.target.value }))}/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Input id="relationship" placeholder="e.g., Friend, Family, Therapist" value={newContact.relationship} onChange={(e) => setNewContact(Object.assign(Object.assign({}, newContact), { relationship: e.target.value }))}/>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
                      <Input id="phone" placeholder="(555) 123-4567" className="pl-10" value={newContact.phone} onChange={(e) => setNewContact(Object.assign(Object.assign({}, newContact), { phone: e.target.value }))}/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
                      <Input id="email" placeholder="email@example.com" className="pl-10" value={newContact.email} onChange={(e) => setNewContact(Object.assign(Object.assign({}, newContact), { email: e.target.value }))}/>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notify" checked={newContact.notifyOnDistress} onCheckedChange={(checked) => setNewContact(Object.assign(Object.assign({}, newContact), { notifyOnDistress: checked }))}/>
                  <Label htmlFor="notify">Notify this contact if severe distress is detected</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsAddingContact(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddContact} disabled={!newContact.name || !newContact.phone}>
                  <Save className="mr-2 h-4 w-4"/>
                  Save Contact
                </Button>
              </CardFooter>
            </Card>)}

          {contacts.map((contact) => (<Card key={contact.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{contact.name}</CardTitle>
                    <CardDescription>{contact.relationship}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact.id)}>
                    <Trash2 className="h-4 w-4"/>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground"/>
                    <span>{contact.phone}</span>
                  </div>
                  {contact.email && (<div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground"/>
                      <span>{contact.email}</span>
                    </div>)}
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id={`notify-${contact.id}`} checked={contact.notifyOnDistress} onCheckedChange={() => handleToggleNotify(contact.id)}/>
                  <Label htmlFor={`notify-${contact.id}`}>
                    {contact.notifyOnDistress
                ? "Will be notified if severe distress is detected"
                : "Will not be automatically notified"}
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Edit Contact
                </Button>
              </CardFooter>
            </Card>))}
        </div>
      </div>
    </div>);
}
