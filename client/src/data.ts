import { useState } from "react";

export type Entry = {
  entryId?: number;
  title: string;
  notes: string;
  photoUrl: string;
};

type Data = {
  entries: Entry[];
  nextEntryId: number;
};
// const [error, setError] = useState<unknown>();

const dataKey = 'code-journal-data';
// function readData(): Data {
  //   let data: Data;
  //   const localData = localStorage.getItem(dataKey);
  //   if (localData) {
    //     data = JSON.parse(localData);
    //   } else {
      //     data = {
        //       entries: [],
        //       nextEntryId: 1,
        //     };
        //   }
        //   return data;
        // }


export async function readEntries(): Promise<Entry[]> {

    const response = await fetch('/api/entries');
    if (!response) {
      throw new Error('failed to fetch entries');
    }
    return await response.json();
}

export async function readEntry(entryId: number): Promise<Entry | undefined> {
    const response = await fetch(`/api/entries/${entryId}`);
    if(!response){
      throw new Error(`failed to fetch entry ${entryId}`);
    }
    const entry = await response.json()
    return entry
}

export async function addEntry(entry: Entry): Promise<Entry> {

    const response = await fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });

    if (!response) {
      throw new Error('failed to fetch entries');
    }
    const addedEntry = await response.json();
    return addedEntry
}

export async function updateEntry(entry: Entry): Promise<Entry> {
  const response = await fetch(`api/entries/${entry.entryId}`,{
    method: 'PUT',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(entry)
  });
  if(!response) {
    throw new Error('failed to update entry')
  }
  const updatedEntry = await response.json();
  return updateEntry
}

export async function removeEntry(entryId: number): Promise<void> {
  const response = await fetch(`/api/entries/${entryId}`,{
    method: 'DELETE'
  });
  if(!response){
    throw new Error('failed to delete entry');
  }
  const deletedEntry = await response.json()
  return deletedEntry;

}
