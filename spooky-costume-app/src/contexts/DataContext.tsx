import React, { createContext, useContext, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useSubscribeDev } from '@subscribe.dev/react';
import type { Person, CostumeOutput } from '../types';
const jackImage = '/images/jack.jpeg';
const jillImage = '/images/jill.jpeg';
const jackCostumeImage = '/images/jack-costume.jpeg';
const jillCostumeImage = '/images/jill-costume.jpeg';

interface PersonsContextType {
  persons: Person[];
  syncStatus: string;
  addPerson: (name: string, photoBase64: string) => Person;
  updatePerson: (id: string, updates: Partial<Omit<Person, 'id' | 'createdAt'>>) => void;
  deletePerson: (id: string) => void;
  incrementUsage: (id: string) => void;
  getPersonById: (id: string) => Person | undefined;
}

interface OutputsContextType {
  outputs: CostumeOutput[];
  outputsForSelection: CostumeOutput[];
  syncStatus: string;
  addOutput: (
    imageUrl: string,
    costumeDescription: string,
    outputType: 'costume' | 'group_selfie',
    personId?: string,
    personName?: string,
    credits?: number
  ) => CostumeOutput;
  deleteOutput: (id: string) => void;
  getOutputById: (id: string) => CostumeOutput | undefined;
  getOutputsByPerson: (personId: string) => CostumeOutput[];
  getOutputsByType: (type: 'costume' | 'group_selfie') => CostumeOutput[];
}

const PersonsContext = createContext<PersonsContextType | undefined>(undefined);
const OutputsContext = createContext<OutputsContextType | undefined>(undefined);

// Built-in mascot persons
const BUILT_IN_PERSONS: Person[] = [
  {
    id: 'builtin_jack',
    name: 'Jack',
    photoBase64: jackImage,
    createdAt: 0,
    usageCount: 0,
  },
  {
    id: 'builtin_jill',
    name: 'Jill',
    photoBase64: jillImage,
    createdAt: 0,
    usageCount: 0,
  },
];

// Built-in costume outputs for selection (not shown in gallery/history)
const BUILT_IN_OUTPUTS: CostumeOutput[] = [
  {
    id: 'builtin_output_jack',
    imageUrl: jackCostumeImage,
    costumeDescription: 'Jack Mascot Costume',
    outputType: 'costume',
    personId: 'builtin_jack',
    personName: 'Jack',
    createdAt: 0,
    credits: 0,
  },
  {
    id: 'builtin_output_jill',
    imageUrl: jillCostumeImage,
    costumeDescription: 'Jill Mascot Costume',
    outputType: 'costume',
    personId: 'builtin_jill',
    personName: 'Jill',
    createdAt: 0,
    credits: 0,
  },
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { useStorage } = useSubscribeDev();
  const [persons, setPersons, personsSyncStatus] = useStorage<Person[]>('persons', []);
  const [outputs, setOutputs, outputsSyncStatus] = useStorage<CostumeOutput[]>('costume_outputs', []);

  // Combine built-in persons with user-created persons
  const allPersons = useMemo(() => {
    return [...BUILT_IN_PERSONS, ...(persons || [])];
  }, [persons]);

  // Migration: Add outputType to existing outputs that don't have it
  useEffect(() => {
    if (!outputs || outputs.length === 0) return;

    let needsMigration = false;
    const migratedOutputs = outputs.map((output: any) => {
      // Check if output is missing outputType field
      if (!output.outputType) {
        needsMigration = true;

        // Infer type from credits (5 = costume, 7 = group selfie)
        // or from description starting with "Group selfie:"
        let inferredType: 'costume' | 'group_selfie' = 'costume';

        if (output.credits === 7 || output.costumeDescription?.startsWith('Group selfie:')) {
          inferredType = 'group_selfie';
        }

        return {
          ...output,
          outputType: inferredType
        };
      }
      return output;
    });

    if (needsMigration) {
      setOutputs(migratedOutputs);
    }
  }, [outputs, setOutputs]);

  // Persons functions
  const addPerson = (name: string, photoBase64: string): Person => {
    const newPerson: Person = {
      id: `person_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      photoBase64,
      createdAt: Date.now(),
      usageCount: 0,
    };

    setPersons([...(persons || []), newPerson]);
    return newPerson;
  };

  const updatePerson = (id: string, updates: Partial<Omit<Person, 'id' | 'createdAt'>>) => {
    if (!persons) return;
    setPersons(
      persons.map((person) =>
        person.id === id ? { ...person, ...updates } : person
      )
    );
  };

  const deletePerson = (id: string) => {
    // Prevent deleting built-in persons
    if (id.startsWith('builtin_')) return;
    if (!persons) return;
    setPersons(persons.filter((person) => person.id !== id));
  };

  const incrementUsage = (id: string) => {
    // Don't track usage for built-in persons
    if (id.startsWith('builtin_')) return;
    if (!persons) return;
    setPersons(
      persons.map((person) =>
        person.id === id ? { ...person, usageCount: person.usageCount + 1 } : person
      )
    );
  };

  const getPersonById = (id: string): Person | undefined => {
    return allPersons?.find((person) => person.id === id);
  };

  // Outputs functions
  const addOutput = (
    imageUrl: string,
    costumeDescription: string,
    outputType: 'costume' | 'group_selfie',
    personId?: string,
    personName?: string,
    credits: number = 5
  ): CostumeOutput => {
    const newOutput: CostumeOutput = {
      id: `output_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      imageUrl,
      costumeDescription,
      outputType,
      personId,
      personName,
      createdAt: Date.now(),
      credits,
    };

    setOutputs([newOutput, ...(outputs || [])]);
    return newOutput;
  };

  const deleteOutput = (id: string) => {
    if (!outputs) return;
    setOutputs(outputs.filter((output) => output.id !== id));
  };

  const getOutputById = (id: string): CostumeOutput | undefined => {
    return outputs?.find((output) => output.id === id);
  };

  const getOutputsByPerson = (personId: string): CostumeOutput[] => {
    return outputs?.filter((output) => output.personId === personId) || [];
  };

  const getOutputsByType = (type: 'costume' | 'group_selfie'): CostumeOutput[] => {
    return outputs?.filter((output) => output.outputType === type) || [];
  };

  const sortedOutputs = outputs
    ? [...outputs].sort((a, b) => b.createdAt - a.createdAt)
    : [];

  // Combine built-in outputs with user outputs for selection purposes
  const outputsForSelection = outputs
    ? [...BUILT_IN_OUTPUTS, ...outputs].sort((a, b) => b.createdAt - a.createdAt)
    : BUILT_IN_OUTPUTS;

  const personsValue: PersonsContextType = {
    persons: allPersons || [],
    syncStatus: personsSyncStatus,
    addPerson,
    updatePerson,
    deletePerson,
    incrementUsage,
    getPersonById,
  };

  const outputsValue: OutputsContextType = {
    outputs: sortedOutputs,
    outputsForSelection: outputsForSelection,
    syncStatus: outputsSyncStatus,
    addOutput,
    deleteOutput,
    getOutputById,
    getOutputsByPerson,
    getOutputsByType,
  };

  return (
    <PersonsContext.Provider value={personsValue}>
      <OutputsContext.Provider value={outputsValue}>
        {children}
      </OutputsContext.Provider>
    </PersonsContext.Provider>
  );
};

export const usePersons = () => {
  const context = useContext(PersonsContext);
  if (context === undefined) {
    throw new Error('usePersons must be used within a DataProvider');
  }
  return context;
};

export const useOutputHistory = () => {
  const context = useContext(OutputsContext);
  if (context === undefined) {
    throw new Error('useOutputHistory must be used within a DataProvider');
  }
  return context;
};
