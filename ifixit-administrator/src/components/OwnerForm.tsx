"use client";

import { useState } from 'react';
import { Button, Input } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa"; // Icons from react-icons
import { AnimatePresence, motion } from 'framer-motion';

export function OwnerForm() {
  const [ownerSearch, setOwnerSearch] = useState('');
  const [ownerResult, setOwnerResult] = useState<any>(null);
  const [isOwnerFormVisible, setIsOwnerFormVisible] = useState(false);
  const [newOwner, setNewOwner] = useState({ name: '', email: '' });

  const handleOwnerSearch = () => {
    // Simulated owner search by ID (simple logic)
    const result = ownerSearch === '12345678' ? { name: 'John Doe', dni: '12345678' } : null;
    setOwnerResult(result);
  };

  const handleAddOwner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to add the new owner
    console.log('New Owner:', newOwner);
    setNewOwner({ name: '', email: '' });
    setIsOwnerFormVisible(false); // Hide the form after adding the owner
  };

  return (
    <div className="w-96 mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold w-full text-center">Search Owner by ID</h2>
      
      {/* Search field */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search owner by ID"
          value={ownerSearch}
          onChange={(e) => setOwnerSearch(e.target.value)}
          className="pr-10" 
        />
        <button
          onClick={handleOwnerSearch}
          className="absolute top-1/2 right-3 transform -translate-y-1/2"
        >
          <FaSearch className="text-gray-500" /> 
        </button>
      </div>
      {ownerResult ? (
        <div className="p-4 border rounded">
          <p>Owner found: {ownerResult.name} (ID: {ownerResult.dni})</p>
        </div>
      ) : (
        ownerSearch && <p>No owner found with that ID.</p>
      )}

      {/* Button to show/hide the form to add a new owner */}
      <Button 
        variant="outlined"
        fullWidth 
        onClick={() => setIsOwnerFormVisible(!isOwnerFormVisible)}
      >
        {isOwnerFormVisible ? 'Cancel' : 'Add New Owner'}
      </Button>

      {/* Animated form to add a new owner */}
      <AnimatePresence>
        {isOwnerFormVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 overflow-hidden"
          >
            <form onSubmit={handleAddOwner} className="space-y-4 mt-4">
              <Input 
                label="Name" 
                value={newOwner.name} 
                onChange={(e) => setNewOwner({ ...newOwner, name: e.target.value })}
                required
              />
              <Input 
                label="Email" 
                type="email" 
                value={newOwner.email} 
                onChange={(e) => setNewOwner({ ...newOwner, email: e.target.value })}
                required
              />
              <Input 
                label="Phone" 
                type="tel" 
                value={newOwner.email} 
                onChange={(e) => setNewOwner({ ...newOwner, email: e.target.value })}
                required
              />
              <Button type="submit" fullWidth>Add Owner</Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default OwnerForm;
